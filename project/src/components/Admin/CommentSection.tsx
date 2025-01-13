import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Comment } from '../../types/submission';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (comment: string) => void;
}

export default function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="mt-6 border-t border-gray-100 pt-4">
      <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        Comentários
      </h4>
      
      <div className="space-y-4 mb-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">{comment.text}</div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(comment.createdAt).toLocaleString('pt-BR')}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Adicionar comentário..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm
            focus:ring-2 focus:ring-primary focus:border-primary"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium
            hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
}