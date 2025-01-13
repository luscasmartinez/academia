import React from 'react';
import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import Portfolio from '../components/Portfolio/Portfolio';
import Testimonials from '../components/Testimonials/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Testimonials />
      <Portfolio />
      <Services />
      <Footer />
    </div>
  );
}