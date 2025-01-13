import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div className="group p-8 rounded-2xl bg-[#F7F7F7] hover:bg-[#141E2C] transition-all">
      <Icon className="w-12 h-12 text-[#F1003E] mb-6 group-hover:scale-110 transition-transform" />
      <h3 className="text-2xl font-semibold mb-4 text-[#F1003E]">{title}</h3>
      <p className="text-[#F1003E]">{description}</p>
    </div>
  );
}