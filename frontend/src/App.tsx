import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import ProtectedRoute from './components/admin/ProtectedRoute';

function HomePage() {
  return (
    <div className="min-h-screen bg-vedix-black pb-20 lg:pb-0">
      <Header />
      <Hero />
      <About />
      <Products />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppWidget />
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
