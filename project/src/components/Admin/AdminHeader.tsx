import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function AdminHeader() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2 px-4 py-2 rounded-lg
            hover:bg-gray-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </header>
  );
}