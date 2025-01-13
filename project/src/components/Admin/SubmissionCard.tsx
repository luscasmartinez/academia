import React, { useState } from 'react';
import { FormData } from '../../types/submission';
import { Calendar, Mail, Phone, CheckCircle, Clock, Trash2, MessageSquare } from 'lucide-react';
import CommentsList from './CommentsList';
import CommentModal from './CommentModal';

interface SubmissionCardProps {
  submission: FormData;
  onStatusChange: (id: string, status: 'pending' | 'completed') => void;
  onDelete: (id: string) => void;
  onAddComment: (id: string, comment: string) => void;
}

export default function SubmissionCard({ 
  submission, 
  onStatusChange, 
  onDelete,
  onAddComment
}: SubmissionCardProps) {
  const [showCommentModal, setShowCommentModal] = useState(false);
  
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800'
  };

  const handleAddComment = (comment: string) => {
    onAddComment(submission.id!, comment);
  };

  const commentsCount = submission.comments?.length || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{submission.businessName}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCommentModal(true)}
              className="p-1.5 text-gray-400 hover:text-primary rounded-full hover:bg-primary/5 
                transition-colors relative"
              title="Adicionar comentário"
            >
              <MessageSquare className="w-4 h-4" />
              {commentsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 
                  rounded-full flex items-center justify-center">
                  {commentsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onStatusChange(
                submission.id!, 
                submission.status === 'completed' ? 'pending' : 'completed'
              )}
              className={`px-3 py-1 rounded-full flex items-center gap-2 transition-colors ${
                submission.status === 'completed' ? statusColors.completed : statusColors.pending
              }`}
            >
              {submission.status === 'completed' ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Concluído
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4" />
                  Pendente
                </>
              )}
            </button>
            <button
              onClick={() => onDelete(submission.id!)}
              className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 
                transition-colors"
              title="Excluir submissão"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3 text-gray-600">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{submission.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{submission.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(submission.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Serviços Solicitados:</h4>
          <div className="flex flex-wrap gap-2">
            {submission.services.map((service) => (
              <span
                key={service}
                className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Descrição do Negócio:</h4>
          <p className="text-gray-600 text-sm">{submission.businessDescription}</p>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Ideias e Objetivos:</h4>
          <p className="text-gray-600 text-sm">{submission.ideas}</p>
        </div>

        {submission.comments && submission.comments.length > 0 && (
          <CommentsList comments={submission.comments} />
        )}
        
        <CommentModal
          isOpen={showCommentModal}
          onClose={() => setShowCommentModal(false)}
          onSubmit={handleAddComment}
        />
      </div>
    </div>
  );
}