import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  component?: 'input' | 'textarea';
}

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  component = 'input'
}: FormFieldProps) {
  const baseClasses = "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all";
  const errorClasses = error ? "border-red-500" : "border-gray-300";
  
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {component === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClasses} min-h-[120px]`}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClasses}`}
          required={required}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}