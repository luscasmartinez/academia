import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Plans from './components/Plans';
import Registration from './components/Registration';
import Contact from './components/Contact';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        
        {/* Public Routes */}
        <Route path="/" element={
          <div className="min-h-screen">
            <Navbar />
            <Hero />
          </div>
        } />
        <Route path="/sobre" element={
          <div className="min-h-screen">
            <Navbar />
            <About />
          </div>
        } />
        <Route path="/servicos" element={
          <div className="min-h-screen">
            <Navbar />
            <Services />
          </div>
        } />
        <Route path="/planos" element={
          <div className="min-h-screen">
            <Navbar />
            <Plans />
          </div>
        } />
        <Route path="/matricula" element={
          <div className="min-h-screen">
            <Navbar />
            <Registration />
          </div>
        } />
        <Route path="/contato" element={
          <div className="min-h-screen">
            <Navbar />
            <Contact />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;