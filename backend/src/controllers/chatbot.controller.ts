import { Request, Response } from 'express';
import Pricing from '../models/Pricing.model.js';
import Service from '../models/Service.model.js';
import Content from '../models/Content.model.js';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

// Function to fetch website data and build dynamic system prompt
const buildSystemPrompt = async (): Promise<string> => {
  try {
    // Fetch all website data in parallel
    const [pricingPlans, services, contentSections] = await Promise.all([
      Pricing.find().sort({ order: 1 }).lean(),
      Service.find().sort({ order: 1 }).lean(),
      Content.find().lean()
    ]);

    // Build company information from content sections
    let companyInfo = '';
    const aboutSection = contentSections.find((c: any) => c.section === 'about');
    const heroSection = contentSections.find((c: any) => c.section === 'hero');
    const contactSection = contentSections.find((c: any) => c.section === 'contact');

    if (heroSection) {
      companyInfo += `\nCompany Overview:\n`;
      if (heroSection.title) companyInfo += `- ${heroSection.title}\n`;
      if (heroSection.subtitle) companyInfo += `- ${heroSection.subtitle}\n`;
      // Truncate long descriptions for faster processing
      if (heroSection.description) {
        const desc = heroSection.description?.length > 200 
          ? heroSection.description.substring(0, 200) + '...' 
          : heroSection.description;
        companyInfo += `- ${desc}\n`;
      }
    }

    if (aboutSection) {
      companyInfo += `\nAbout Us:\n`;
      if (aboutSection.title) companyInfo += `- ${aboutSection.title}\n`;
      // Truncate about description for faster processing
      if (aboutSection.description) {
        const desc = aboutSection.description?.length > 200 
          ? aboutSection.description.substring(0, 200) + '...' 
          : aboutSection.description;
        companyInfo += `- ${desc}\n`;
      }
    }

    // Build services information (limit to first 6 services for faster responses)
    let servicesInfo = '';
    if (services && services.length > 0) {
      servicesInfo = '\n\nOur Services:\n';
      services.slice(0, 6).forEach((service: any, index: number) => {
        servicesInfo += `${index + 1}. ${service.title}\n`;
        // Truncate long descriptions to first 150 chars
        const description = service.description?.length > 150 
          ? service.description.substring(0, 150) + '...' 
          : service.description;
        servicesInfo += `   ${description}\n\n`;
      });
      if (services.length > 6) {
        servicesInfo += `...and ${services.length - 6} more services available.\n`;
      }
    }

    // Build pricing information (show top 4 plans for faster responses)
    let pricingInfo = '';
    if (pricingPlans && pricingPlans.length > 0) {
      pricingInfo = '\n\nPricing Plans:\n';
      pricingPlans.slice(0, 4).forEach((plan: any, index: number) => {
        pricingInfo += `${index + 1}. ${plan.name}${plan.popular ? ' (POPULAR)' : ''}\n`;
        if (plan.tagline) pricingInfo += `   ${plan.tagline}\n`;
        pricingInfo += `   Price: ${plan.price}${plan.period ? `/${plan.period}` : ''}\n`;
        // Show only first 4 features to reduce prompt size
        if (plan.features && plan.features.length > 0) {
          pricingInfo += `   Key Features: ${plan.features.slice(0, 4).join(', ')}`;
          if (plan.features.length > 4) pricingInfo += ` (+${plan.features.length - 4} more)`;
          pricingInfo += '\n';
        }
        pricingInfo += '\n';
      });
    }

    // Build contact information
    let contactInfo = '';
    if (contactSection) {
      contactInfo = '\n\nContact Information:\n';
      if (contactSection.title) contactInfo += `- ${contactSection.title}\n`;
      if (contactSection.description) contactInfo += `- ${contactSection.description}\n`;
      if (contactSection.content) {
        const contentStr = typeof contactSection.content === 'string'
          ? contactSection.content
          : JSON.stringify(contactSection.content);
        contactInfo += `- ${contentStr}\n`;
      }
    }

    // Build optimized system prompt (concise for faster AI responses)
    const systemPrompt = `You are an AI assistant for NextGen SaaS, a premium SaaS provider.

Role: Help visitors with services, pricing, features, and company info. Be friendly, professional, and concise.

WEBSITE DATA:
${companyInfo}${servicesInfo}${pricingInfo}${contactInfo}

Guidelines:
1. Use ONLY the data above - don't make up information
2. Keep responses brief and to the point (2-3 sentences when possible)
3. For pricing/services questions, cite specific details from above
4. If info isn't available, suggest contacting support
5. Be conversational but efficient

Keep answers helpful and accurate.`;

    return systemPrompt;
  } catch (error: any) {
    console.error('Error building system prompt:', error);
    // Return a fallback prompt if data fetching fails
    return `You are a helpful AI assistant for NextGen SaaS, a premium SaaS service provider company. 

Your role is to help visitors by:
- Answering questions about services, pricing, and features
- Providing information about the company
- Helping with technical questions
- Guiding users to appropriate resources
- Being friendly, professional, and concise

Keep responses helpful, accurate, and relevant to SaaS services. If asked about something outside your knowledge, politely redirect to contacting the support team.`;
  }
};

// OpenRouter API configuration
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const getOpenRouterConfig = () => {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  const modelName = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-exp:free';
  
  if (!apiKey || apiKey === '' || apiKey === 'your-openrouter-api-key-here') {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }

  return { apiKey, modelName };
};

export const chatWithBot = async (req: Request, res: Response) => {
  const requestStartTime = Date.now();
  console.log('📨 Chatbot request received:', { 
    message: req.body?.message?.substring(0, 50),
    hasHistory: !!req.body?.history?.length,
    timestamp: new Date().toISOString()
  });
  
  try {
    const { message, history = [] }: ChatRequest = req.body;

    // Validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message is required and must be a non-empty string'
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Message is too long. Please keep it under 2000 characters.'
      });
    }

    // Check OpenRouter API key - provide fallback in development
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();
    const isApiKeyConfigured = apiKey && apiKey !== '' && apiKey !== 'your-openrouter-api-key-here';
    const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    
    if (!isApiKeyConfigured) {
      console.warn('⚠️ OPENROUTER_API_KEY is not configured. Using fallback responses.');
      
      // In development (or when NODE_ENV is not set), provide helpful fallback responses with website data
      if (isDevelopment) {
        const lowerMessage = message.toLowerCase().trim();
        let fallbackResponse = '';
        
        try {
          // Try to fetch website data for better fallback responses
          const [pricingPlans, services, contentSections] = await Promise.all([
            Pricing.find().sort({ order: 1 }).lean().catch(() => []),
            Service.find().sort({ order: 1 }).lean().catch(() => []),
            Content.find().lean().catch(() => [])
          ]);

          if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            const heroSection = contentSections.find((c: any) => c.section === 'hero');
            const companyName = heroSection?.title || 'NextGen SaaS';
            const tagline = heroSection?.subtitle || '';
            
            fallbackResponse = `Hello! 👋 I'm your AI assistant for ${companyName}. ${tagline ? tagline + ' ' : ''}To enable full AI capabilities, please configure your OpenRouter API key in the backend/.env file. For now, I can help with basic questions!\n\n` +
              'I can assist you with:\n' +
              '• Information about our services\n' +
              '• Pricing details\n' +
              '• Company information\n' +
              '• Technical support\n\n' +
              'Feel free to ask me anything!';
          } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer')) {
            if (services && services.length > 0) {
              fallbackResponse = 'Our Services:\n\n';
              services.forEach((service: any, index: number) => {
                fallbackResponse += `${index + 1}. ${service.title}\n   ${service.description}\n\n`;
              });
              fallbackResponse += 'Would you like more details about any specific service?';
            } else {
              fallbackResponse = 'We offer comprehensive SaaS services. Please check our Services page for detailed information, or configure the OpenRouter API key for full AI assistance.';
            }
          } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
            if (pricingPlans && pricingPlans.length > 0) {
              fallbackResponse = 'Our Pricing Plans:\n\n';
              pricingPlans.forEach((plan: any, index: number) => {
                fallbackResponse += `${index + 1}. ${plan.name}${plan.popular ? ' (POPULAR)' : ''}\n`;
                fallbackResponse += `   Price: ${plan.price}${plan.period ? `/${plan.period}` : ''}\n`;
                if (plan.tagline) fallbackResponse += `   ${plan.tagline}\n`;
                if (plan.features && plan.features.length > 0) {
                  fallbackResponse += `   Features: ${plan.features.slice(0, 3).join(', ')}${plan.features.length > 3 ? '...' : ''}\n`;
                }
                fallbackResponse += '\n';
              });
              fallbackResponse += 'For more details, please check our Pricing page or contact us!';
            } else {
              fallbackResponse = 'We offer flexible pricing plans to fit businesses of all sizes. Please check our Pricing page for detailed information, or configure the OpenRouter API key for full AI assistance.';
            }
          } else if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help')) {
            const contactSection = contentSections.find((c: any) => c.section === 'contact');
            fallbackResponse = 'I\'m here to help! You can reach us through:\n\n';
            if (contactSection) {
              if (contactSection.description) fallbackResponse += `${contactSection.description}\n\n`;
              if (contactSection.content) {
                const contentStr = typeof contactSection.content === 'string' 
                  ? contactSection.content 
                  : JSON.stringify(contactSection.content);
                fallbackResponse += `${contentStr}\n\n`;
              }
            }
            fallbackResponse += '• Contact Form - Fill out the form on our website\n' +
              '• Email - Send us an email directly\n' +
              '• Phone - Call our support team\n\n' +
              'Our team is ready to assist you with any questions or concerns!';
          } else {
            fallbackResponse = 'Thank you for your message! 😊\n\n' +
              'To enable full AI chatbot capabilities, please configure the OpenRouter API key. ' +
              'For now, I can help you with:\n' +
              '• Service information\n' +
              '• Pricing details\n' +
              '• Company information\n' +
              '• Contact support\n\n' +
              'Feel free to ask about our services, pricing, or how to get in touch with us!';
          }
        } catch (error: any) {
          console.error('Error fetching website data for fallback:', error);
          fallbackResponse = 'Thank you for your message! 😊\n\n' +
            'To enable full AI chatbot capabilities, please configure the OpenRouter API key. ' +
            'For now, I can help you with:\n' +
            '• Service information\n' +
            '• Pricing details\n' +
            '• Company information\n' +
            '• Contact support\n\n' +
            'Feel free to ask about our services, pricing, or how to get in touch with us!';
        }
        
        // Immediately return response - no delays
        const fallbackTime = Date.now() - requestStartTime;
        console.log(`✅ Returning fallback response immediately (${fallbackTime}ms)`);
        return res.status(200).json({
          success: true,
          data: {
            message: fallbackResponse,
            timestamp: new Date().toISOString(),
            note: 'Using fallback mode. Configure OPENROUTER_API_KEY for full AI capabilities.'
          }
        });
      }
      
      // In production, return error immediately
      return res.status(500).json({
        success: false,
        message: 'Chatbot service is not configured. Please contact administrator.'
      });
    }

    // Get OpenRouter configuration (only if API key is configured)
    // This should not fail since we already checked above, but handle it safely
    const openRouterConfig = getOpenRouterConfig();

    // Build dynamic system prompt with website data
    const dynamicSystemPrompt = await buildSystemPrompt();

    // Build conversation history for OpenRouter
    // OpenRouter expects standard chat format: user/assistant messages
    const messages: Array<{ role: string; content: string }> = [];
    
    // Add system message first with website data
    messages.push({
      role: 'system',
      content: dynamicSystemPrompt
    });

    // Add conversation history (last 6 messages to keep context smaller and responses faster)
    const recentHistory = history.slice(-6);
    for (const msg of recentHistory) {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      });
    }

    // Add the current user message
    messages.push({
      role: 'user',
      content: message.trim()
    });

    // Call OpenRouter API with timeout (80 seconds - allows for slower AI models)
    const controller = new AbortController();
    const timeoutDuration = parseInt(process.env.AI_REQUEST_TIMEOUT || '80000'); // 80 seconds default, configurable via env
    const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);
    
    let response;
    try {
      console.log('🔄 Calling OpenRouter API...');
      response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openRouterConfig.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:5173',
          'X-Title': 'NextGen SaaS Chatbot'
        },
        body: JSON.stringify({
          model: openRouterConfig.modelName,
          messages: messages,
          temperature: 0.7,
          max_tokens: 600, // Reduced for faster responses (still sufficient for quality answers)
          top_p: 0.9, // Add top_p for more focused responses
          stream: false // Ensure non-streaming for faster response
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      console.log('✅ OpenRouter API response received');
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        const elapsedTime = Date.now() - requestStartTime;
        console.error(`⏱️ OpenRouter API timeout after ${elapsedTime}ms`);
        // Return a helpful timeout response instead of throwing
        return res.status(200).json({
          success: true,
          data: {
            message: 'I apologize, but the AI service is taking longer than usual to respond. This might be due to high demand. Please try again in a moment, or feel free to ask a simpler question.\n\n' +
              'In the meantime, I can help you with:\n' +
              '• Information about our services\n' +
              '• Pricing details\n' +
              '• Contact information\n' +
              '• Technical support',
            timestamp: new Date().toISOString(),
            note: 'Response timeout - please retry'
          }
        });
      }
      console.error('❌ OpenRouter API fetch error:', fetchError.message);
      throw fetchError;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      if (response.status === 401) {
        return res.status(500).json({
          success: false,
          message: 'Chatbot service authentication failed. Please contact administrator.'
        });
      }
      
      if (response.status === 429) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests. Please wait a moment and try again.'
        });
      }

      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as {
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
    };
    const responseText = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    const processingTime = Date.now() - requestStartTime;
    console.log(`✅ Chatbot response generated in ${processingTime}ms`);

    res.status(200).json({
      success: true,
      data: {
        message: responseText.trim(),
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('Error in chatbot:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      status: error.status,
      response: error.response?.data
    });
    
    // Handle specific errors
    if (error.message?.includes('API key') || error.message?.includes('401') || error.message?.includes('Unauthorized') || error.message?.includes('API_KEY_INVALID')) {
      return res.status(500).json({
        success: false,
        message: 'Chatbot service authentication failed. Please contact administrator.'
      });
    }

    if (error.message?.includes('429') || error.message?.includes('rate limit') || error.message?.includes('RESOURCE_EXHAUSTED')) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait a moment and try again.'
      });
    }

    if (error.message?.includes('network') || error.message?.includes('fetch') || error.message?.includes('ECONNREFUSED')) {
      return res.status(500).json({
        success: false,
        message: 'Unable to connect to chatbot service. Please try again later.'
      });
    }

    // Handle timeout errors specifically
    if (error.message?.includes('timeout') || error.message?.includes('took too long')) {
      return res.status(200).json({
        success: true,
        data: {
          message: 'I apologize, but the AI service is taking longer than usual to respond. This might be due to high demand. Please try again in a moment, or feel free to ask a simpler question.\n\n' +
            'In the meantime, I can help you with:\n' +
            '• Information about our services\n' +
            '• Pricing details\n' +
            '• Contact information\n' +
            '• Technical support',
          timestamp: new Date().toISOString(),
          note: 'Response timeout - please retry'
        }
      });
    }

    // Return more detailed error in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Failed to get response from chatbot: ${error.message || 'Unknown error'}`
      : 'Failed to get response from chatbot. Please try again later.';

    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};
