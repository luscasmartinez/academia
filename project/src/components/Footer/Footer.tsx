import React from 'react';
import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="bg-[#f90342] text-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">FlipCriativa</h3>
            <p className="text-white/90">Transformando ideias em resultados extraordinários.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <p className="text-white/90">contato@flipcriativa.com.br</p>
            <p className="text-white/90">+55 (11) 99999-9999</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex justify-center">
              <SocialLinks />
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/90">&copy; 2024 FlipCriativa. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}