import React from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';

export default function Hero() {
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#F1003E' }} // Define o fundo como #F1003E
    >
      <HeroBackground />
      <HeroContent />
    </div>
  );
}
