import { useState, useRef, useEffect } from 'react';
import { api } from '../utils/api';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant for NextGen SaaS. How can I help you today? 😊',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { clickSound, successSound, errorSound } = useAudioFeedback();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim() || isLoading) return;

    clickSound();

    const messageContent = inputMessage.trim();
    const userMessage: Message = {
      role: 'user',
      content: messageContent,
      timestamp: new Date().toISOString()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Get chat history (including the new user message)
      const historyWithNewMessage = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Call the API
      const response = await api.chatWithBot(messageContent, historyWithNewMessage);

      if (response.success && response.data) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.data.message,
          timestamp: response.data.timestamp
        };
        setMessages(prev => [...prev, assistantMessage]);
        successSound();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Chatbot error:', error);

      // Provide user-friendly error messages based on error type
      let errorContent = 'Sorry, I encountered an error. Please try again later or contact our support team.';

      if (error.message?.includes('timeout')) {
        errorContent = 'The AI is taking longer than usual to respond. This can happen during high demand. Please try:\n\n' +
          '1. Asking a shorter question\n' +
          '2. Refreshing and trying again\n' +
          '3. Waiting a moment before retrying\n\n' +
          'I apologize for the inconvenience! 🙏';
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorContent = 'Unable to connect to the AI service. Please check your internet connection and try again.';
      } else if (error.message?.includes('Invalid response')) {
        errorContent = 'Received an unexpected response from the AI service. Please try again.';
      }

      const errorMessage: Message = {
        role: 'assistant',
        content: errorContent,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
      errorSound();
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button - Fixed Position */}
      <button
        onClick={toggleChat}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 md:w-16 md:h-16
          bg-vedix-red text-vedix-white
          rounded-full shadow-vedix-red
          flex items-center justify-center
          hover:scale-110 active:scale-95
          transition-all duration-300
          ${isOpen ? 'hidden' : 'block'}
        `}
        aria-label="Open chat"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md h-[600px] md:h-[650px] flex flex-col glass rounded-2xl border border-vedix-red/30 shadow-vedix-red overflow-hidden animate-in slide-in-from-bottom-5 duration-300 touch-pan-y">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-vedix-red/20 to-vedix-red-light/20 px-4 py-3 border-b border-vedix-red/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-vedix-red/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-vedix-red"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm md:text-base">AI Assistant</h3>
                <p className="text-vedix-red text-xs">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-gray-400 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-vedix-card/30">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex animate-fadeIn ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`
                    max-w-[80%] md:max-w-[75%] rounded-2xl px-4 py-2.5 transition-all duration-300 hover:scale-105
                    ${
                      message.role === 'user'
                        ? 'bg-vedix-red text-vedix-white shadow-vedix-red/50'
                        : 'bg-vedix-card/80 text-white border border-vedix-red/20 hover:border-vedix-red/40'
                    }
                  `}
                >
                  <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed">
                    {message.content}
                  </p>
                  <div className="text-xs opacity-60 mt-1">
                    {new Date(message.timestamp || Date.now()).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-vedix-card/80 text-white border border-vedix-red/20 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-vedix-red rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-vedix-red rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-vedix-red rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-xs text-gray-400">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-vedix-red/30 bg-vedix-card/50">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-vedix-card/50 border border-vedix-red/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-vedix-red focus:ring-2 focus:ring-vedix-red/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                maxLength={2000}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-2.5 bg-vedix-red text-vedix-white rounded-lg font-semibold hover:shadow-vedix-red transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none hover:scale-105 active:scale-95"
                aria-label="Send message"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              AI responses may take 15-30 seconds
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;

