import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ThankYouMessage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Obrigado por compartilhar suas ideias!
        </h2>
        <p className="text-gray-600 mb-8">
          Nossa equipe entrará em contato em breve para começar a transformar seu projeto em realidade.
        </p>
        <Link
          to="/#portfolio"
          className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Ver nosso portfólio
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}