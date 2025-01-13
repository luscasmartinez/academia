import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface UserFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  onCancel: () => void;
}

export default function UserForm({ onSubmit, onCancel }: UserFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await onSubmit(email, password);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar usuário');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Senha
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          required
          minLength={6}
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark 
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Criando...
            </>
          ) : (
            'Criar usuário'
          )}
        </button>
      </div>
    </form>
  );
}