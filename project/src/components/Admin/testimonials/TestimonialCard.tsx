import React from 'react';
import { Trash2 } from 'lucide-react';
import { Testimonial } from '../../../types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
  onDelete: (id: string) => void;
}

export default function TestimonialCard({ testimonial, onDelete }: TestimonialCardProps) {
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este depoimento?')) {
      onDelete(testimonial.id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{testimonial.name}</h3>
            <p className="text-gray-600">{testimonial.role}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
          title="Excluir depoimento"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <p className="text-gray-700">{testimonial.content}</p>
    </div>
  );
}