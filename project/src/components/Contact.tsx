import React from 'react';
import { Phone, Clock, MapPin, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10 bg-cover bg-fixed bg-center" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Fale Conosco</h2>
          <p className="text-xl text-gray-300">Estamos aqui para ajudar você em sua jornada fitness</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <div className="space-y-8">
            {/* Card WhatsApp/Telefone */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Chame no WhatsApp ou Ligue</h3>
                  <a 
                    href="https://wa.me/5555999202924" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xl text-white-500 hover:text-white-400 transition-colors flex items-center"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    (55) 99920-2924
                  </a>
                </div>
              </div>
            </div>

            {/* Card Horário */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Horário de Atendimento</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span>Segunda a Sexta:</span>
                      <span className="text-white-500">06:00 às 22:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sábado:</span>
                      <span className="text-white-500">10:00 às 16:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Domingo:</span>
                      <span className="text-white-500">Fechado</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card Localização */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Nossa Localização</h3>
                  <p className="text-gray-300">
                    Venha nos visitar e conheça nossa estrutura
                  </p>
                  <a 
                    href="https://www.google.com/maps?q=-29.781936094213236,-55.78692499861296" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-red-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-white-400 transition-colors"
                  >
                    Como Chegar
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 h-full min-h-[500px] transform hover:-translate-y-1 transition-all duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.5761673183584!2d-55.78911368484983!3d-29.781940981968825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQ2JzU1LjAiUyA1NcKwNDcnMTIuOSJX!5e0!3m2!1spt-BR!2sbr!4v1625761234567!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1rem' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;