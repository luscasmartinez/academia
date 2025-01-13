import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AdminHeader from '../components/admin/AdminHeader';
import SubmissionsList from '../components/admin/SubmissionsList';
import PortfolioManagement from '../components/admin/portfolio/PortfolioManagement';
import TestimonialManagement from '../components/admin/testimonials/TestimonialManagement';
import UserManagement from '../components/admin/users/UserManagement';
import AuditLogViewer from '../components/admin/AuditLogViewer';
import { Inbox, Image, MessageCircle, Users, History } from 'lucide-react';

type AdminTab = 'submissions' | 'portfolio' | 'testimonials' | 'users' | 'audit';

export default function Admin() {
  const [currentTab, setCurrentTab] = useState<AdminTab>('submissions');
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  if (authLoading || !isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setCurrentTab('submissions')}
              className={`
                ${currentTab === 'submissions'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium flex items-center gap-2
              `}
            >
              <Inbox className="w-5 h-5" />
              Submissões
            </button>
            <button
              onClick={() => setCurrentTab('portfolio')}
              className={`
                ${currentTab === 'portfolio'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium flex items-center gap-2
              `}
            >
              <Image className="w-5 h-5" />
              Portfólio
            </button>
            <button
              onClick={() => setCurrentTab('testimonials')}
              className={`
                ${currentTab === 'testimonials'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium flex items-center gap-2
              `}
            >
              <MessageCircle className="w-5 h-5" />
              Depoimentos
            </button>
            <button
              onClick={() => setCurrentTab('users')}
              className={`
                ${currentTab === 'users'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium flex items-center gap-2
              `}
            >
              <Users className="w-5 h-5" />
              Usuários
            </button>
            <button
              onClick={() => setCurrentTab('audit')}
              className={`
                ${currentTab === 'audit'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium flex items-center gap-2
              `}
            >
              <History className="w-5 h-5" />
              Logs
            </button>
          </nav>
        </div>

        {currentTab === 'submissions' ? (
          <SubmissionsList />
        ) : currentTab === 'portfolio' ? (
          <PortfolioManagement />
        ) : currentTab === 'testimonials' ? (
          <TestimonialManagement />
        ) : currentTab === 'users' ? (
          <UserManagement />
        ) : (
          <AuditLogViewer />
        )}
      </main>
    </div>
  );
}