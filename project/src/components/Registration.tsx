import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dumbbell, ArrowRight, Loader2, Calendar } from 'lucide-react';
import { saveRegistration } from '../services/registration';

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.selectedPlan || '';
  const isExperimentalClass = selectedPlan === 'Aula Experimental';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: selectedPlan,
    preferredDate: '',
    preferredTime: '',
  });

  // Configurar datas mínima e máxima permitidas
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30); // Permite agendamento até 30 dias no futuro

  // Formatar data para YYYY-MM-DD
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Validar se a data selecionada é um domingo
  const isValidDate = (date: string) => {
    const selectedDate = new Date(date);
    return selectedDate.getDay() !== 0; // 0 = Domingo
  };

  // Horários disponíveis baseados no dia da semana
  const getAvailableTimes = (date: string) => {
    if (!date) return [];
    
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();
    
    if (dayOfWeek === 6) { // Sábado
      return ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
    }
    
    // Segunda a Sexta
    return ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
            '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    
    if (!isValidDate(newDate)) {
      setSubmitError('Desculpe, não abrimos aos domingos. Por favor, selecione outro dia.');
      return;
    }
    
    setSubmitError(null);
    setFormData({
      ...formData,
      preferredDate: newDate,
      preferredTime: '' // Reset time when date changes
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isExperimentalClass && (!formData.preferredDate || !formData.preferredTime)) {
      setSubmitError('Por favor, selecione a data e horário para sua aula experimental.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await saveRegistration(formData);
      
      if (result.success) {
        navigate('/planos', { 
          state: { 
            registrationSuccess: true,
            message: 'Inscrição realizada com sucesso! Entraremos em contato em breve.' 
          }
        });
      } else {
        setSubmitError('Erro ao salvar inscrição. Por favor, tente novamente.');
      }
    } catch (error) {
      setSubmitError('Ocorreu um erro inesperado. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10 bg-cover bg-fixed bg-center" />
      
      <div className="max-w-2xl mx-auto px-4 relative">
        <div className="text-center mb-12">
          <Dumbbell className="h-12 w-12 text-red-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-4xl font-bold mb-4">Finalize Sua Matrícula</h2>
          <p className="text-gray-300">Preencha seus dados para começar sua jornada fitness</p>
        </div>

        {submitError && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl mb-6">
  {submitError}
</div>

        )}

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nome Completo</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              <p className="text-sm text-gray-300">Plano selecionado:</p>
              <p className="text-lg font-semibold text-red-500">{formData.plan}</p>
            </div>

            {isExperimentalClass && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-500">
                  <Calendar className="w-5 h-5" />
                  <h3 className="font-semibold">Agende sua Aula Experimental</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Data Preferida</label>
                  <input
                    type="date"
                    required
                    min={formatDate(today)}
                    max={formatDate(maxDate)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition-all [color-scheme:dark]"
                    value={formData.preferredDate}
                    onChange={handleDateChange}
                  />
                  <p className="text-sm text-gray-400 mt-1">Selecione uma data nos próximos 30 dias (exceto domingos)</p>
                </div>

                {formData.preferredDate && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Horário Preferido</label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500 transition-all"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    >
                      <option value="">Selecione um horário</option>
                      {getAvailableTimes(formData.preferredDate).map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-500 text-black py-4 px-6 rounded-xl font-semibold hover:bg-red-400 transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  Finalizar Matrícula
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registration;