import React from 'react';
import { Video, Palette, TrendingUp } from 'lucide-react';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: Video,
    title: 'Criação de Vídeos',
    description: 'Conte histórias que vendem! Transformamos sua mensagem em conteúdo envolvente e memorável.',
  },
  {
    icon: Palette,
    title: 'Design Criativo',
    description: 'Transforme ideias em visuais impactantes que capturam a essência da sua marca.',
  },
  {
    icon: TrendingUp,
    title: 'Tráfego Pago',
    description: 'Chegue ao público certo, no momento certo, com estratégias personalizadas de mídia paga.',
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-[#F1003E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Nossos Serviços
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
