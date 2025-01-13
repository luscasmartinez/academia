import React, { useState, useEffect } from 'react';
import { FormData } from '../../types/submission';
import { Loader2 } from 'lucide-react';
import SubmissionCard from './SubmissionCard';
import { getSubmissions, updateSubmissionStatus, deleteSubmission, addComment } from '../../services/formService';

export default function SubmissionsList() {
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const data = await getSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: 'pending' | 'completed') => {
    try {
      await updateSubmissionStatus(id, status);
      setSubmissions(prev => 
        prev.map(submission => 
          submission.id === id ? { ...submission, status } : submission
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta submissão?')) {
      return;
    }

    try {
      await deleteSubmission(id);
      setSubmissions(prev => prev.filter(submission => submission.id !== id));
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  const handleAddComment = async (id: string, comment: string) => {
    try {
      const newComment = await addComment(id, comment);
      setSubmissions(prev => 
        prev.map(submission => 
          submission.id === id 
            ? { 
                ...submission, 
                comments: [...(submission.comments || []), newComment] 
              } 
            : submission
        )
      );
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum formulário enviado ainda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-0">
      {submissions.map((submission) => (
        <SubmissionCard
          key={submission.id}
          submission={submission}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onAddComment={handleAddComment}
        />
      ))}
    </div>
  );
}