import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroTitle from './HeroTitle';
import Logo from './Logo';

export default function HeroContent() {
  return (
    <div 
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
      style={{ backgroundColor: '#F1003E' }} // Cor de fundo personalizada
    >
      <Logo />
      <HeroTitle />
      <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto animate-fade-up">
        Transformamos suas ideias em resultados extraordinários
      </p>
      <Link 
        to="/contact"
        className="bg-white text-[#f90342] hover:text-[#d7023a] px-8 py-4 rounded-full 
          text-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all 
          inline-flex items-center gap-2 shadow-lg hover:shadow-xl animate-fade-up"
      >
        Quero aumentar minhas vendas
        <ArrowRight className="w-5 h-5" />
      </Link>

      {/* Elemento gráfico para indicar conteúdo abaixo */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </div>
  );
}
