import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { Home } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6"
          >
            <Home className="w-4 h-4" />
            Voltar para página inicial
          </Link>

          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {isLogin ? 'Login Administrativo' : ''}
          </h2>
          
          {isLogin ? <LoginForm /> : <RegisterForm />}
          
          
        </div>
      </div>
    </div>
  );
}