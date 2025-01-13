import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
}

export default function CommentModal({ isOpen, onClose, onSubmit }: CommentModalProps) {
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment.trim());
      setComment('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Adicionar Comentário</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Digite seu comentário..."
            className="w-full p-3 border rounded-lg min-h-[120px] focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}