const Footer = () => {
  return (
    <footer className="border-t border-neon-blue/20 py-12 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-heading font-bold neon-text mb-4">
              NextGen SaaS
            </h3>
            <p className="text-gray-400">
              Building the future of business automation with AI-powered solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-neon-blue mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#services" className="hover:text-neon-blue transition-colors">SaaS Development</a></li>
              <li><a href="#services" className="hover:text-neon-blue transition-colors">Web & App Development</a></li>
              <li><a href="#services" className="hover:text-neon-blue transition-colors">AI Integration</a></li>
              <li><a href="#services" className="hover:text-neon-blue transition-colors">SEO & Marketing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neon-blue mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-neon-blue transition-colors">About Us</a></li>
              <li><a href="#pricing" className="hover:text-neon-blue transition-colors">Pricing</a></li>
              <li><a href="#contact" className="hover:text-neon-blue transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neon-blue mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-neon-blue transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neon-blue/20 pt-8 text-center text-gray-400">
          <p>&copy; 2024 NextGen SaaS. All rights reserved. Built with AI-powered precision.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

