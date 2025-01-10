const formatCpf = (cpf: string) => {
  const cleaned = cpf.replace(/\D/g, '').slice(0, 11);
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export default formatCpf;
