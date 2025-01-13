export const validateEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Basic Brazilian phone number validation
  return /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(phone);
};

export const formatPhone = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Format the phone number
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{2})/, '($1)')
      .replace(/(\d{4,5})/, ' $1-')
      .replace(/(-\d{4})\d+?$/, '$1');
  }
  
  return value;
};