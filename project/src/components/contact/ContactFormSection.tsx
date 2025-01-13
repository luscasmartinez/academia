import React from 'react';
import FormField from './FormField';
import ServiceSelection from './ServiceSelection';
import { FormState } from '../../hooks/useContactForm';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ContactFormSectionProps {
  formState: FormState;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  submitError?: string | null;
}

export default function ContactFormSection({ 
  formState, 
  onSubmit,
  isSubmitting = false,
  submitError 
}: ContactFormSectionProps) {
  const { values, errors, handleChange, handleServiceChange } = formState;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Conte-nos sobre o seu negócio e suas ideias
        </h2>
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {submitError}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <FormField
            label="Nome do Negócio"
            name="businessName"
            placeholder="Ex: FlipCriativa"
            value={values.businessName}
            onChange={handleChange}
            error={errors.businessName}
            required
          />
          <FormField
            label="E-mail"
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <FormField
            label="Telefone"
            name="phone"
            placeholder="(11) 99999-9999"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
          <FormField
            label="Descrição do Negócio"
            name="businessDescription"
            placeholder="Conte-nos um pouco sobre sua empresa..."
            value={values.businessDescription}
            onChange={handleChange}
            component="textarea"
            required
          />
          <FormField
            label="Ideias e Objetivos"
            name="ideas"
            placeholder="Compartilhe suas ideias e objetivos específicos..."
            value={values.ideas}
            onChange={handleChange}
            component="textarea"
            required
          />
          <ServiceSelection
            selectedServices={values.services}
            onChange={handleServiceChange}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar minhas ideias
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}