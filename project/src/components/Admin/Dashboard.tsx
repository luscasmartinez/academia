import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, useAuth } from '../../services/auth';
import { LogOut, Users, LayoutGrid, Menu, X } from 'lucide-react';
import PlanManagement from './PlanManagement';
import TeamManagement from './TeamManagement';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'plans' | 'team'>('plans');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = useAuth((user) => {
      if (!user) {
        navigate('/admin');
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/admin');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold">Painel Admin</h1>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-red-500" />
                ) : (
                  <Menu className="h-6 w-6 text-red-500" />
                )}
              </button>
            </div>
            
            {/* Desktop logout button */}
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/70 backdrop-blur-lg border-b border-white/10">
          <div className="px-4 py-3 space-y-2">
            <button
              onClick={() => {
                setActiveTab('plans');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'plans'
                  ? 'bg-red-500/20 text-red-500'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="h-5 w-5 mr-2" />
              Planos
            </button>
            <button
              onClick={() => {
                setActiveTab('team');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'team'
                  ? 'bg-red-500/20 text-red-500'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="h-5 w-5 mr-2" />
              Equipe
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sair
            </button>
          </div>
        </div>
      )}

      {/* Desktop Tabs */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex space-x-4 border-b border-white/10">
          <button
            onClick={() => setActiveTab('plans')}
            className={`flex items-center px-4 py-2 font-medium transition-colors ${
              activeTab === 'plans'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="h-5 w-5 mr-2" />
            Planos
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center px-4 py-2 font-medium transition-colors ${
              activeTab === 'team'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="h-5 w-5 mr-2" />
            Equipe
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'plans' ? (
          <PlanManagement />
        ) : (
          <TeamManagement />
        )}
      </main>
    </div>
  );
};

export default Dashboard;