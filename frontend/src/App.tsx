import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
import AIAgentStudio from './components/AIAgentStudio';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import ServiceDetail from './components/ServiceDetail';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Chatbot from './components/Chatbot';

function HomePage() {
  return (
    <div className="min-h-screen bg-vedix-black pb-20 lg:pb-0">
      <Header />
      <Hero />
      <About />
      <Services />
      <Products />
      <AIAgentStudio />
      <Process />
      {/* <Portfolio /> */}
      <Features />
      {/* <Pricing /> */}
      <Testimonials />
      <Contact />
      <Footer />
      {/* <BottomNavigation /> */}
      {/* <Chatbot /> */}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/admin/login" element={<Login />} /> */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              {/* <Dashboard /> */}
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
