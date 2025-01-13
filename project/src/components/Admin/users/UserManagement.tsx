import React, { useState, useEffect } from 'react';
import { Plus, Loader2, Users } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { getAdminUsers, createAdminUser, deleteAdminUser } from '../../../services/userService';
import UserCard from './UserCard';
import UserForm from './UserForm';

interface AdminUser {
  uid: string;
  email: string | null;
  createdAt: Date;
}

export default function UserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const adminUsers = await getAdminUsers();
      setUsers(adminUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (email: string, password: string) => {
    if (!currentUser) return;
    
    try {
      await createAdminUser(email, password, currentUser);
      await loadUsers();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const handleDeleteUser = async (uid: string) => {
    if (!currentUser) return;
    
    try {
      await deleteAdminUser(uid, currentUser);
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(error instanceof Error ? error.message : 'Erro ao excluir usuário');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Gerenciar Usuários
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Gerencie os usuários que têm acesso à área administrativa
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark 
            transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo Usuário
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <UserForm
            onSubmit={handleCreateUser}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.uid}
            user={user}
            onDelete={handleDeleteUser}
            isCurrentUser={currentUser?.uid === user.uid}
          />
        ))}
      </div>
    </div>
  );
}