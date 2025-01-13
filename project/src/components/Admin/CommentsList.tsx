import React from 'react';
import { Comment } from '../../types/submission';
import { formatDate } from '../../utils/date';

interface CommentsListProps {
  comments: Comment[];
}

export default function CommentsList({ comments }: CommentsListProps) {
  if (comments.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      <h4 className="font-medium text-gray-900">Comentários ({comments.length})</h4>
      <div className="space-y-2">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-700 text-sm">{comment.text}</p>
            <span className="text-xs text-gray-500 mt-1">
              {formatDate(comment.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}