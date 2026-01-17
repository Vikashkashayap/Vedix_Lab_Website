import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useModal } from "../hooks/useModal";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { showAlert, ModalComponent } = useModal();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    projectType: "",
    budgetRange: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formRef.current) return;

      await emailjs.sendForm(
        "service_d11l9hm",        // ✅ Service ID
        "template_heymeww",       // ✅ Template ID
        formRef.current,
        "togvWwcNfyP7yGd60"       // ✅ Public Key
      );

      await showAlert(
        "✅ Thank you! Your request has been received. We'll contact you within 24 hours."
      );

      setFormData({
        name: "",
        phone: "",
        projectType: "",
        budgetRange: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      await showAlert("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalComponent />

      <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-x-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-vedix-red/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-vedix-red/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full apple-glass text-xs sm:text-sm font-medium text-vedix-red mb-4 sm:mb-5 md:mb-6">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-vedix-red rounded-full mr-2 sm:mr-3 animate-apple-pulse" />
              Get Started
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2] mb-4 sm:mb-5 md:mb-6">
              Ready to Harness <span className="text-vedix-red">AI Power?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl leading-[1.7] text-vedix-gray/70 max-w-2xl mx-auto px-4 sm:px-0">
              Let's discuss how VedixLab can transform your business with custom AI agents, intelligent automation, and AI-powered solutions. Get your personalized AI strategy in 24 hours.
            </p>
          </div>

          {/* Form Container */}
          <div className="max-w-3xl mx-auto">
            <div className="apple-glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-vedix-red/10 via-vedix-red/5 to-transparent opacity-50" />
              
              {/* Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-4 sm:space-y-5 md:space-y-6">
                {/* Name and Phone Row */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-vedix-red">
                      Name <span className="text-vedix-red/60">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-2.5 sm:py-3 md:py-3.5 bg-vedix-card/60 backdrop-blur-sm border border-vedix-red/30 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder:text-vedix-gray/40 focus:outline-none focus:border-vedix-red focus:ring-2 focus:ring-vedix-red/30 transition-all duration-200 hover:border-vedix-red/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-vedix-red">
                      Phone Number <span className="text-vedix-red/60">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 1234567890"
                      required
                      className="w-full px-4 py-2.5 sm:py-3 md:py-3.5 bg-vedix-card/60 backdrop-blur-sm border border-vedix-red/30 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder:text-vedix-gray/40 focus:outline-none focus:border-vedix-red focus:ring-2 focus:ring-vedix-red/30 transition-all duration-200 hover:border-vedix-red/50"
                    />
                  </div>
                </div>

                {/* Project Type and Budget Row */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="projectType" className="block text-xs sm:text-sm font-semibold text-vedix-red">
                      Project Type <span className="text-vedix-red/60">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 sm:py-3 md:py-3.5 bg-vedix-card/60 backdrop-blur-sm border border-vedix-red/30 rounded-lg sm:rounded-xl text-sm sm:text-base text-white focus:outline-none focus:border-vedix-red focus:ring-2 focus:ring-vedix-red/30 transition-all duration-200 hover:border-vedix-red/50 cursor-pointer"
                    >
                      <option value="" className="bg-vedix-card text-vedix-gray/40">Select AI project type</option>
                      <option value="Custom AI Agent" className="bg-vedix-card">Custom AI Agent</option>
                      <option value="AI Automation" className="bg-vedix-card">AI Automation</option>
                      <option value="AI Website" className="bg-vedix-card">AI Website</option>
                      <option value="AI Product" className="bg-vedix-card">AI Product</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="budgetRange" className="block text-xs sm:text-sm font-semibold text-vedix-red">
                      Budget Range <span className="text-vedix-red/60">*</span>
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 sm:py-3 md:py-3.5 bg-vedix-card/60 backdrop-blur-sm border border-vedix-red/30 rounded-lg sm:rounded-xl text-sm sm:text-base text-white focus:outline-none focus:border-vedix-red focus:ring-2 focus:ring-vedix-red/30 transition-all duration-200 hover:border-vedix-red/50 cursor-pointer"
                    >
                      <option value="" className="bg-vedix-card text-vedix-gray/40">Select budget</option>
                      <option value="5k-10k" className="bg-vedix-card">₹5k–₹10k</option>
                      <option value="10k-25k" className="bg-vedix-card">₹10k–₹25k</option>
                      <option value="25k+" className="bg-vedix-card">₹25k+</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-vedix-red">
                    Message <span className="text-vedix-red/60">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your AI needs, current challenges, and desired outcomes..."
                    rows={5}
                    required
                    className="w-full px-4 py-2.5 sm:py-3 md:py-3.5 bg-vedix-card/60 backdrop-blur-sm border border-vedix-red/30 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder:text-vedix-gray/40 focus:outline-none focus:border-vedix-red focus:ring-2 focus:ring-vedix-red/30 transition-all duration-200 resize-none hover:border-vedix-red/50"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 sm:pt-3 md:pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-red w-full h-10 sm:h-11 md:h-12 px-6 text-xs sm:text-sm md:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none shadow-apple-red-glow hover:shadow-apple-red-glow-hover transition-all duration-200 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Start AI Transformation
                          <svg
                            className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* Additional Info */}
            <div className="text-center mt-6 sm:mt-8 md:mt-10">
              <p className="text-xs sm:text-sm text-vedix-gray/60">
                By submitting this form, you agree to our privacy policy. We'll respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
