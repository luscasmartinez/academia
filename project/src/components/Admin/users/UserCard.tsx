import React from 'react';
import { Trash2, Mail } from 'lucide-react';

interface AdminUser {
  uid: string;
  email: string | null;
  createdAt: Date;
}

interface UserCardProps {
  user: AdminUser;
  onDelete: (uid: string) => void;
  isCurrentUser: boolean;
}

export default function UserCard({ user, onDelete, isCurrentUser }: UserCardProps) {
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja remover este usuário?')) {
      onDelete(user.uid);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{user.email}</h3>
            {isCurrentUser && (
              <span className="text-sm text-primary">Você está logado com este usuário</span>
            )}
            <p className="text-sm text-gray-500">
              Criado em: {user.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        {!isCurrentUser && (
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
            title="Remover usuário"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}