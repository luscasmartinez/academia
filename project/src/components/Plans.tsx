import React from 'react';
import { CheckCircle, ArrowRight, Gift } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Plans = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const registrationSuccess = location.state?.registrationSuccess;
  const successMessage = location.state?.message;

  const plans = [
    {
      name: 'Musculação | Start ',
      price: 'R$ 79,90/mês',
      features: [
        'Taxa de adesão R$49,90',
        'Duração  1 mês',
        'Pagamento À vista',
        'Acesso limitado (2x/semana)',
        'Ideal para iniciantes'
      ],
      link: 'https://venda.nextfit.com.br/b28c4843-eee5-482b-af00-7da26a2826a3/pagamento'
    },
    {
      name: 'Musculação | Mensal',
      price: 'R$ 159,00/mês',
      features: [
        'Acesso LIVRE à academia',
        'Taxa de adesão R$49,90',
        'Duração  1 mês',
        'Pagamento À vista',
      ],
      link: 'https://venda.nextfit.com.br/b28c4843-eee5-482b-af00-7da26a2826a3/pagamento'
    },
    {
      name: 'Musculação | Semestral',
      price: 'R$ 139,00/mês',
      features: [
        'Acesso LIVRE à academia',
        'Duração 6 meses',
        'SEM taxa de adesão',
        'Taxa de cancelamento de 10%',
        'Não ocupa limite do cartão',
      ],
      link: 'https://venda.nextfit.com.br/b28c4843-eee5-482b-af00-7da26a2826a3/pagamento'
    },
    {
      name: 'Musculação | Semestral',
      price: 'R$ 129,00/mês',
      features: [
        'Acesso LIVRE à academia',
        'Duração 6 meses',
        'Taxa de adesão R$49,90',
        'Taxa de cancelamento de 10%',
        'Usa o limite do cartão',
      ],
      link: 'https://venda.nextfit.com.br/b28c4843-eee5-482b-af00-7da26a2826a3/pagamento'
    },
    {
      name: 'Musculação | Anual',
      price: 'R$ 119,00/mês',
      features: [
        'Acesso LIVRE à academia',
        'Duração 12 meses',
        'Taxa de adesão R$49,90',
        'Taxa de cancelamento de 10%',
        'Não ocupa o limite do cartão',
      ],
      link: 'https://venda.nextfit.com.br/b28c4843-eee5-482b-af00-7da26a2826a3/pagamento'
    },
    {
      name: 'Musculação | Anual',
      price: 'R$ 109,00/mês',
      features: [
        'Acesso LIVRE à academia',
        'Duração 12 meses',
        'Taxa de adesão R$49,90',
        'Taxa de cancelamento de 10%',
        'Usa o limite do cartão',
      ],
      highlight: true,
      icon: <Gift className="h-8 w-8 text-red-500" />,
      special: true,
      link: 'https://venda.nextfit.com.br/b28c4843-eee5-482b-af00-7da26a2826a3/pagamento'
    },
  ];

  const handleMatricula = (link: string) => {
    // Verifica se é um link externo (começa com http)
    if (link.startsWith('http')) {
      // Redireciona para URL externa
      window.location.href = link;
    } else {
      // Navega para rota interna
      navigate(link);
    }
  };


  return (
    <section className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white py-32">
       <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10 bg-cover bg-fixed bg-center" />
      <div className="max-w-7xl mx-auto px-4 relative">
        {registrationSuccess && (
          <div className="max-w-2xl mx-auto mb-8 bg-green-500/10 border border-green-500 text-green-500 px-6 py-4 rounded-xl text-center">
            {successMessage}
          </div>
        )}

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Nossos Planos</h1>
          <p className="text-xl text-gray-300">Escolha o plano perfeito para sua jornada fitness</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 ${plan.special ? 'border-2 border-red-500' : ''
                }`}
            >
              {plan.special && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-black px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Recomendado
                </div>
              )}

              <div className="space-y-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className={`text-3xl font-bold ${plan.special ? 'text-red-500' : 'text-red-500'}`}>
                  {plan.price}
                </p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleMatricula(plan.link)}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group
    ${plan.special
                      ? 'bg-red-500 text-black hover:bg-red-400'
                      : 'bg-white/10 hover:bg-red-500 hover:text-black'}`}
                >
                  <span>{plan.special ? 'Faça sua inscrição agora' : 'Matricule-se Agora'}</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;