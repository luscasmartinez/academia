import React from 'react';
import { 
  LineChart, 
  Target, 
  Dumbbell, 
  ClipboardList, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <LineChart className="w-12 h-12" />,
      title: "Análise da Composição Corporal",
      description: "Avaliação completa do seu corpo utilizando tecnologia de ponta para medir percentual de gordura, massa muscular e outros indicadores importantes.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Estratégia Personalizada",
      description: "Desenvolvimento de uma estratégia única baseada nos seus resultados e objetivos, considerando sua rotina e preferências.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Dumbbell className="w-12 h-12" />,
      title: "Treinamento Individual",
      description: "Planos de treino organizados de forma individual e administrados por profissionais de educação física qualificados.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Acompanhamento dos Resultados",
      description: "Monitoramento constante do seu progresso com avaliações periódicas e ajustes no programa quando necessário.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const steps = [
    "Avaliação inicial detalhada",
    "Definição de objetivos",
    "Criação do plano personalizado",
    "Início dos treinos",
    "Acompanhamento semanal",
    "Reavaliação mensal"
  ];

  return (
    <section id="servicos" className="py-20 bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10 bg-cover bg-fixed" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">Nossos Serviços</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Oferecemos uma abordagem completa e personalizada para sua jornada fitness,
            combinando tecnologia avançada com expertise profissional.
          </p>
        </div>

        {/* Serviços Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
                style={{ background: `linear-gradient(to right, var(--tw-gradient-${service.color}))` }}
              />
              <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl h-full 
                            transition-transform duration-500 group-hover:-translate-y-2">
                <div className={`bg-gradient-to-r ${service.color} p-4 rounded-xl inline-block mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline do Processo */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Processo de Treinamento</h3>
          <div className="relative">
            {/* Linha central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-500/30" />
            
            {steps.map((step, index) => (
              <div key={index} className={`flex items-center mb-8 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl inline-block
                                transform transition-all duration-300 hover:scale-105 hover:bg-white/20">
                    <span className="text-yellow-500 font-bold text-lg">Etapa {index + 1}</span>
                    <p className="text-xl font-semibold">{step}</p>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-black" />
                  </div>
                </div>
                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button
            onClick={() => window.location.href = '/planos'}
            className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-yellow-600 
                     text-black px-8 py-4 rounded-full font-bold text-lg
                     hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300
                     transform hover:scale-105 hover:shadow-lg"
          >
            Comece Sua Jornada
            <ArrowRight className="ml-2 w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;