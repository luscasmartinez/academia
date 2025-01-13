import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ana Silva',
    role: 'CEO, TechStart',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    content: 'A FlipCriativa transformou completamente nossa presença digital. Os resultados superaram todas as expectativas!',
  },
  {
    name: 'Carlos Santos',
    role: 'Diretor de Marketing, InnovaCorp',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    content: 'Profissionalismo e criatividade em cada projeto. Nossa empresa cresceu 300% após a parceria.',
  },
  
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          O que nossos clientes dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
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
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}