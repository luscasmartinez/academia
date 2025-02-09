import React from 'react';
import { Target, Heart, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      name: 'Francisco (Xikinho)',
      role: 'Responsável Técnico Instrutor das 18h às 22h | Sócio Proprietário',
      image: 'https://i.imgur.com/UKLuGkW.jpg',
    },
    {
      name: 'Karine Bazana',
      role: 'Instrutora das 13h às 18h',
      image: 'https://i.imgur.com/LFvzj9X.jpg',
    },
    {
      name: 'Eric Renato ',
      role: 'Instrutor das 16h às 22h',
      image: 'https://i.imgur.com/pMmO50z.jpg',
    },
    {
      name: 'Âni Gidel',
      role: 'Recepcionista',
      image: 'https://i.imgur.com/E9eYmkl.jpg',
    },
    {
      name: 'Mariana Moraes',
      role: 'Instrutora das 6h às 12h',
      image: 'https://i.imgur.com/0jsBjRz.jpg',
    },
    {
      name: 'Matheus Ferreira',
      role: 'Instrutor das 6h às 10h',
      image: 'https://i.imgur.com/aQB4YCL.jpg'

    }

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
            <div
              key={member.name}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-128 object-cover"
              />
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-20">
          <Link
            to="/planos"
            className="inline-flex items-center bg-gradient-to-r from-red-500 to-red-600 
                 text-black px-8 py-4 rounded-full font-bold text-lg
                 hover:from-red-400 hover:to-red-500 transition-all duration-300
                 transform hover:scale-105 hover:shadow-lg"
          >
            Conheça nossos planos
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;