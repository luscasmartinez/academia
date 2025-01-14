import React from 'react';
import { Target, Heart, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-red-500" />,
      title: 'Missão',
      description: 'Inspirar e capacitar pessoas a alcançarem seus objetivos fitness através de treinamento de qualidade e suporte personalizado.',
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'Visão',
      description: 'Ser reconhecida como a academia líder em transformação de vidas, oferecendo a melhor experiência fitness da região.',
    },
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: 'Valores',
      description: 'Comprometimento, excelência, inovação e respeito às individualidades de cada aluno.',
    },
  ];

  const team = [
    {
      name: 'João Silva',
      role: 'Personal Trainer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Maria Santos',
      role: 'Nutricionista',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Pedro Costa',
      role: 'Instrutor de Yoga',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <section id="sobre" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">Sobre Nós</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((value) => (
            <div key={value.title} className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>

        <h3 className="text-3xl font-bold text-center mb-12">Nossa Equipe</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;