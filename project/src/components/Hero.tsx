import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div id="home" className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative h-full flex items-center justify-center text-white">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transforme seu corpo,<br />transforme sua vida
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Comece sua jornada fitness hoje mesmo
          </p>
          <button
            onClick={() => navigate('/planos')}
            className="inline-flex items-center bg-red-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-red-400 transition-colors"
          >
            Começar agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;