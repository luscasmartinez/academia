import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { auth, useAuth } from '../../services/auth';
import { LogOut, Users, Calendar } from 'lucide-react';
import type { Registration } from '../../services/registration';

const Dashboard = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<(Registration & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = useAuth((user) => {
      if (!user) {
        navigate('/admin');
      }
    });

    const q = query(
      collection(db, 'registrations'),
      orderBy('registrationDate', 'desc')
    );

    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const registrationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as (Registration & { id: string })[];
      
      setRegistrations(registrationsData);
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-yellow-500" />
              <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-yellow-500" />
              Inscrições Recentes
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
              <p className="mt-4 text-gray-400">Carregando inscrições...</p>
            </div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              Nenhuma inscrição encontrada.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    <th className="pb-3 px-4">Data</th>
                    <th className="pb-3 px-4">Nome</th>
                    <th className="pb-3 px-4">Email</th>
                    <th className="pb-3 px-4">Telefone</th>
                    <th className="pb-3 px-4">Plano</th>
                    <th className="pb-3 px-4">Aula Agendada</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((registration) => (
                    <tr 
                      key={registration.id}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="py-4 px-4">
                        {formatDate(registration.registrationDate)}
                      </td>
                      <td className="py-4 px-4">{registration.name}</td>
                      <td className="py-4 px-4">{registration.email}</td>
                      <td className="py-4 px-4">{registration.phone}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${registration.plan === 'Aula Experimental' 
                            ? 'bg-yellow-500/10 text-yellow-500' 
                            : 'bg-blue-500/10 text-blue-500'}`}>
                          {registration.plan}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {registration.preferredDate && registration.preferredTime ? (
                          <span className="text-gray-300">
                            {new Date(registration.preferredDate).toLocaleDateString('pt-BR')} às {registration.preferredTime}
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;