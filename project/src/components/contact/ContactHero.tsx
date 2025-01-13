import React from 'react';
import { Sparkles } from 'lucide-react';

export default function ContactHero() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-600" />
          Estamos prontos para transformar suas ideias em resultados!
        </h1>
        <p className="text-xl text-gray-600">
          Preencha o formulário abaixo para começar a personalizar sua estratégia.
        </p>
      </div>
    </div>
  );
}