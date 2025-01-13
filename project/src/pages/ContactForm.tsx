import React from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactFormSection from '../components/contact/ContactFormSection';
import ThankYouMessage from '../components/contact/ThankYouMessage';
import { useContactForm } from '../hooks/useContactForm';

export default function ContactForm() {
  const { formState, handleSubmit, isSubmitted, isSubmitting, submitError } = useContactForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      {!isSubmitted ? (
        <>
          <ContactHero />
          <ContactFormSection 
            formState={formState} 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        </>
      ) : (
        <ThankYouMessage />
      )}
    </div>
  );
}