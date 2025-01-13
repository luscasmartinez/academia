import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function AuthButton() {
  return (
    <Link
      to="/login"
      className="fixed bottom-4 right-4 bg-black/10 backdrop-blur-sm text-gray-700 px-3 py-1.5 
        rounded-full hover:bg-black/20 transition-all flex items-center gap-2 text-sm"
    >
      <LogIn className="w-4 h-4" />
      Admin
    </Link>
  );
}