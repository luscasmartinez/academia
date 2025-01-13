import React from 'react';
import { Sparkles } from 'lucide-react';

export default function HeroTitle() {
  return (
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-in">
      <span className="inline-block transform hover:scale-105 transition-transform">
        <Sparkles className="inline-block mr-4 h-12 w-12" />
        Não somos uma agência!
      </span>
    </h1>
  );
}