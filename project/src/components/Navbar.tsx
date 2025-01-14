import React, { useState } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: 'Início', href: '/' },
    { title: 'Sobre Nós', href: '/sobre' },
    { title: 'Serviços', href: '/servicos' },
    { title: 'Planos', href: '/planos' },
    { title: 'Fale Conosco', href: '/contato' },
  ];

  return (
    <nav className="fixed w-full bg-black/90 text-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://i.imgur.com/5zBDQ1y.png" 
                alt="Corpus Gym Logo" 
                className="h-12 w-auto"
              />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className={`hover:bg-red-500 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.href ? 'bg-red-500' : ''
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="hidden md:flex items-center px-3 py-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
              title="Área Administrativa"
            >
              <Lock className="h-4 w-4" />
            </Link>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-red-500 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-red-500 ${
                  location.pathname === item.href ? 'bg-red-500' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Link
              to="/admin"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Área Administrativa
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;