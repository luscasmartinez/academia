import { useState } from 'react';
import { validateEmail, validatePhone, formatPhone } from '../utils/validation';
import { submitForm } from '../services/formService';

export interface FormState {
  values: {
    businessName: string;
    email: string;
    phone: string;
    businessDescription: string;
    ideas: string;
    services: string[];
  };
  errors: {
    businessName?: string;
    email?: string;
    phone?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleServiceChange: (services: string[]) => void;
}

export function useContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [values, setValues] = useState({
    businessName: '',
    email: '',
    phone: '',
    businessDescription: '',
    ideas: '',
    services: [] as string[],
  });

  const [errors, setErrors] = useState<FormState['errors']>({});

  const validateForm = () => {
    const newErrors: FormState['errors'] = {};

    if (!values.businessName) {
      newErrors.businessName = 'Nome do negócio é obrigatório';
    }

    if (!values.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!validateEmail(values.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!values.phone) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!validatePhone(values.phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const formattedValue = name === 'phone' ? formatPhone(value) : value;
    
    setValues(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleServiceChange = (services: string[]) => {
    setValues(prev => ({ ...prev, services }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError(null);
      
      try {
        await submitForm(values);
        setIsSubmitted(true);
      } catch (error) {
        setSubmitError('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    formState: {
      values,
      errors,
      handleChange,
      handleServiceChange,
    },
    handleSubmit,
    isSubmitted,
    isSubmitting,
    submitError,
  };
}