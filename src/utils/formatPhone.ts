const formatPhone = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '').slice(0, 11);
  return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export default formatPhone;
