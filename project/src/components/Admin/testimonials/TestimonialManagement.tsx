import React, { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Testimonial } from '../../../types/testimonial';
import { getTestimonials, addTestimonial, deleteTestimonial } from '../../../services/testimonialService';
import TestimonialCard from './TestimonialCard';
import TestimonialForm from './TestimonialForm';

export default function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: Omit<Testimonial, 'id' | 'createdAt'>) => {
    try {
      await addTestimonial(data);
      await loadTestimonials();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding testimonial:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonial(id);
      await loadTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
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
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Depoimentos</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark 
            transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo Depoimento
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <TestimonialForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}