import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import PricingManagement from './PricingManagement';
import ServicesManagement from './ServicesManagement';
import ContentManagement from './ContentManagement';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'pricing' | 'services' | 'content'>('pricing');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        await api.verifyToken();
      } catch (error) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-space-black flex items-center justify-center">
        <div className="text-neon-blue text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-black">
      {/* Header */}
      <header className="glass border-b border-neon-blue/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold neon-text">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="px-6 py-2 border-2 border-neon-blue text-neon-blue rounded-lg font-semibold hover:bg-neon-blue/10 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex space-x-4 mb-8 border-b border-neon-blue/20">
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'pricing'
                ? 'text-neon-blue border-b-2 border-neon-blue'
                : 'text-gray-400 hover:text-neon-blue'
            }`}
          >
            Pricing Plans
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'services'
                ? 'text-neon-blue border-b-2 border-neon-blue'
                : 'text-gray-400 hover:text-neon-blue'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'content'
                ? 'text-neon-blue border-b-2 border-neon-blue'
                : 'text-gray-400 hover:text-neon-blue'
            }`}
          >
            Content Sections
          </button>
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-6 md:p-8">
          {activeTab === 'pricing' && <PricingManagement />}
          {activeTab === 'services' && <ServicesManagement />}
          {activeTab === 'content' && <ContentManagement />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
