const validateCpf = (cpf: string): boolean => {
  // Limpa os caracteres não numéricos
  const cleanedCpf = cpf.replace(/[^\d]/g, '');

  // Verifica se o CPF possui 11 dígitos e não possui todos os dígitos iguais
  if (cleanedCpf.length !== 11 || /^(\d)\1+$/.test(cleanedCpf)) return false;

  // Calculo dos dígitos verificadores
  const calculateDigit = (base: number): number => {
    const sum = cleanedCpf
      .slice(0, base)
      .split('')
      .reduce((acc, num, i) => acc + parseInt(num) * (base + 1 - i), 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(9);
  const secondDigit = calculateDigit(10);

  // Validação dos dígitos verificadores
  return (
    firstDigit === parseInt(cleanedCpf[9]) &&
    secondDigit === parseInt(cleanedCpf[10])
  );
};

export default validateCpf;
