import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
}

export default function TestimonialCard({ name, role, image, content }: TestimonialCardProps) {
  return (
    
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-[#f90342]/20"
        />
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <p className="text-gray-600">{role}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-[#F2BE01] fill-current" />
        ))}
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  );
}