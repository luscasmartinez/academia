import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Gift } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Plan, getPlansSnapshot } from '../services/plans';

const Plans = () => {
  const location = useLocation();
  const registrationSuccess = location.state?.registrationSuccess;
  const successMessage = location.state?.message;
  
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getPlansSnapshot((newPlans) => {
      setPlans(newPlans);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleMatricula = () => {
    window.location.href = "https://venda.nextfit.com.br/b28c4843-eee5-482b-af00-7da26a2826a3/contratos";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white py-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative group"
            >
              {/* Animated background glow effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl opacity-0 blur-xl transition-all duration-500 group-hover:opacity-20"
              />
              
              <div 
                className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white/20
                  ${plan.special ? 'border-2 border-red-500' : ''}`}
              >
                {plan.special && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-black px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 animate-bounce">
                    <Gift className="h-4 w-4" />
                    Recomendado
                  </div>
                )}
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">
                    {plan.name}
                  </h3>
                  <p className={`text-3xl font-bold ${plan.special ? 'text-red-500' : ''}`}>
                    {plan.price}
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li 
                        key={index} 
                        className="flex items-center group-hover:translate-x-2 transition-all duration-300"
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0 text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={handleMatricula}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-500 flex items-center justify-center group
                      ${plan.special 
                        ? 'bg-red-500 text-black hover:bg-red-400' 
                        : 'bg-white/10 hover:bg-red-500 hover:text-black'}`}
                  >
                    <span>Matricule-se Agora</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;