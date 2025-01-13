import React from 'react';
import { Check } from 'lucide-react';

interface Service {
  id: string;
  label: string;
}

interface ServiceSelectionProps {
  selectedServices: string[];
  onChange: (services: string[]) => void;
}

const services: Service[] = [
  { id: 'video', label: 'Criação de Vídeo' },
  { id: 'design', label: 'Design Criativo' },
  { id: 'traffic', label: 'Tráfego Pago' }
];

export default function ServiceSelection({ selectedServices, onChange }: ServiceSelectionProps) {
  const toggleService = (serviceId: string) => {
    const newSelection = selectedServices.includes(serviceId)
      ? selectedServices.filter(id => id !== serviceId)
      : [...selectedServices, serviceId];
    onChange(newSelection);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Serviços Desejados <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => toggleService(service.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedServices.includes(service.id)
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{service.label}</span>
              {selectedServices.includes(service.id) && (
                <Check className="w-5 h-5 text-purple-500" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}