const validateCep = async (cep: string): Promise<boolean> => {
  try {
    // Faz uma requisição para a API do ViaCEP para obter os dados do CEP
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    // Retorna true se o CEP for encontrado, false caso contrário
    return Boolean(!data.erro);
  } catch (error) {
    return false;
  }
};

export default validateCep;
