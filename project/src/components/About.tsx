import React, { useState, useEffect } from 'react';
import { Target, Heart, Users, Loader2 } from 'lucide-react';
import { getTeamSnapshot, TeamMember } from '../services/team';

const About = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getTeamSnapshot((newTeam) => {
      setTeam(newTeam);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 mx-auto animate-spin text-red-500" />
            <p className="mt-4 text-gray-600">Carregando equipe...</p>
          </div>
        ) : team.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum membro da equipe cadastrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-all duration-300">
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
        )}
      </div>
    </section>
  );
};

export default About;