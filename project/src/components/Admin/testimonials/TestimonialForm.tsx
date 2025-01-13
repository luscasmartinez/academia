import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { uploadFile } from '../../../services/storageService';

interface TestimonialFormProps {
  onSubmit: (data: { name: string; role: string; image: string; content: string; }) => Promise<void>;
  onCancel: () => void;
}

export default function TestimonialForm({ onSubmit, onCancel }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    content: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadFile(file, 'testimonials');
      setFormData(prev => ({ ...prev, image: url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cargo
        </label>
        <input
          type="text"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Foto
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full"
          required={!formData.image}
        />
        {isUploading && (
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            Enviando imagem...
          </div>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="mt-2 w-20 h-20 rounded-full object-cover"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Depoimento
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          rows={4}
          required
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark 
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Salvando...
            </>
          ) : (
            'Salvar'
          )}
        </button>
      </div>
    </form>
  );
}