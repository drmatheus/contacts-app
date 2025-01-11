import { useForm } from 'react-hook-form';
import Button from '../common/button';
import Input from '../common/input';
import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { contactSchema, ContactSchema } from '../../schemas';
import Select from '../common/select';
import brazilStates from '../../utils/brazilStates';
import formatCep from '../../utils/formatCep';
import formatCpf from '../../utils/formatCPF';
import formatPhone from '../../utils/formatPhone';
import createContact from '../../services/contacts/createContact';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ContactSchema>({
    mode: 'onBlur',
    resolver: zodResolver(contactSchema),
  });
  const navigate = useNavigate();

  const handleCepChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cep = formatCep(event.target.value);
    setValue('address.zipcode', cep);

    if (cep.length === 9) {
      try {
        // Faz uma requisição para a API do ViaCEP para obter os dados do CEP
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          throw new Error('CEP não encontrado');
        }

        // Preenche os outros campos do formulário
        setValue('address.street', data.logradouro || '');
        setValue('address.neighborhood', data.bairro || '');
        setValue('address.city', data.localidade || '');
        setValue('address.state', data.uf || '');
      } catch (error) {
        if (error instanceof Error) {
          console.error('Erro ao buscar CEP:', error.message);
        }
      }
    }
  };

  const onSubmit = useCallback(async (data: ContactSchema) => {
    try {
      const token = localStorage.getItem('contacthub@authToken');
      const newContact = await createContact(token!, data);
      toast.success('Contato enviado com sucesso!');
      reset();
      if (!newContact) {
        throw new Error('Erro ao salvar contato');
      }
      navigate(`/home/contact/${newContact.id}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao salvar contato:', error.message);
      }
    }
  }, []);

  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-2  gap-5  bg-primary/5 p-4 py-8 w-full rounded-xl "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold lg:col-span-2 text-primary">
        Novo contato
      </h1>
      <h2 className="lg:col-span-2 text-primary font-semibold text-lg border-b-2 border-primary">
        Informações pessoais
      </h2>
      <Input
        label="Nome"
        {...register('name')}
        placeholder="Seu nome"
        error={errors.name?.message}
      />
      <Input
        label="Telefone"
        {...register('phone')}
        onChange={(value) => setValue('phone', formatPhone(value.target.value))}
        placeholder="(00) 00000-0000"
        error={errors.phone?.message}
      />
      <Input
        label="CPF"
        {...register('cpf')}
        onChange={(value) => setValue('cpf', formatCpf(value.target.value))}
        placeholder="000.000.000-00"
        error={errors.cpf?.message}
      />
      <h2 className="lg:col-span-2 text-primary font-semibold text-lg border-b-2 border-primary">
        Endereço
      </h2>
      <Input
        label="CEP"
        {...register('address.zipcode')}
        onChange={handleCepChange}
        placeholder="00000-000"
        error={errors.address?.zipcode?.message}
      />
      <Input
        label="Rua"
        {...register('address.street')}
        placeholder="Rua Exemplo"
        error={errors.address?.street?.message}
      />
      <Input
        label="Número"
        {...register('address.number')}
        placeholder="123"
        type="number"
        error={errors.address?.number?.message}
      />
      <Input
        label="Complemento"
        {...register('address.complement')}
        placeholder="Apto 101 (opcional)"
        error={errors.address?.complement?.message}
      />
      <Input
        label="Bairro"
        {...register('address.neighborhood')}
        placeholder="Centro"
        error={errors.address?.neighborhood?.message}
      />
      <Input
        label="Cidade"
        {...register('address.city')}
        placeholder="Cidade Exemplo"
        error={errors.address?.city?.message}
      />
      <Select
        label="Estado"
        {...register('address.state')}
        error={errors.address?.state?.message}
        options={brazilStates}
      />
      <div className="lg:col-span-2 mt-2 ">
        <Button className="w-full" text="Enviar" type="submit" />
      </div>
    </form>
  );
};

export default ContactForm;
