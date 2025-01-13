import { useForm } from 'react-hook-form';
import Button from '../common/button';
import Input from '../common/input';
import { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import Select from '../common/select';
import brazilStates from '../../utils/brazilStates';
import formatCep from '../../utils/formatCep';
import formatCpf from '../../utils/formatCPF';
import formatPhone from '../../utils/formatPhone';
import { useNavigate } from 'react-router-dom';
import { contactSchema, ContactSchema } from '../../schemas/contact/contact';
import InputAddress from '../common/inputAddress';
import { Contact } from '../../types/contact';
import updateContact from '../../services/contacts/updateContact';
import { Address } from '../../schemas/googleApi/address';

type EditContactFormProps = {
  contact: Contact;
};

const EditContactForm = ({ contact }: EditContactFormProps) => {
  const navigate = useNavigate();
  const [addressSuggestion, setAddressSuggestion] = useState<Address | null>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
  } = useForm<ContactSchema>({
    mode: 'onBlur',
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: contact.name,
      phone: contact.phone,
      cpf: contact.cpf,
      address: {
        street: contact.address.street,
        number: Number(contact.address.number),
        complement: contact.address.complement,
        neighborhood: contact.address.neighborhood,
        city: contact.address.city,
        state: contact.address.state,
        zipcode: contact.address.zipcode,
      },
    },
  });

  // Funcionalidade para preencher os campos do formulário com os dados do CEP
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
          setError('address.zipcode', {
            type: 'manual',
            message: 'CEP não encontrado',
          });
          throw new Error('CEP não encontrado');
        }

        // Preenche os outros campos do formulário
        setValue('address.street', data.logradouro || '');
        setValue('address.neighborhood', data.bairro || '');
        setValue('address.city', data.localidade || '');
        setValue('address.state', data.uf || '');
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    }
  };

  // Função de submit
  const onSubmit = useCallback(async (data: ContactSchema) => {
    try {
      const token = localStorage.getItem('contacthub@authToken');
      await updateContact(token!, data, contact.id);

      toast.success('Contato atualizado com sucesso!');
      reset();

      navigate(`/home/contact/${contact.id}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error('Erro ao atualizar contato contato:', error.message);
      }
    }
  }, []);

  // Função para preencher os campos do formulário quando o usuário selecionar uma sugestão
  const onSelectSuggestion = () => {
    if (!addressSuggestion) return;

    setValue('address.street', addressSuggestion.street || '');
    setValue('address.neighborhood', addressSuggestion.neighborhood || '');
    setValue('address.city', addressSuggestion.city || '');
    setValue('address.state', addressSuggestion.state || '');
    setValue('address.zipcode', addressSuggestion.postalCode || '');
    setValue('address.number', Number(addressSuggestion.number || ''));
  };

  useEffect(() => {
    onSelectSuggestion();
  }, [addressSuggestion]);

  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-2 col-span-2  gap-5  bg-primary/5 p-4 py-8 w-full rounded-xl shadow-lg "
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl flex justify-between font-bold lg:col-span-2 text-primary">
        <p>Editando - {contact.name}</p>
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

      <InputAddress
        setAddressSuggestion={setAddressSuggestion}
        containerClassName="col-span-2"
      />

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

      <Button className="w-full col-span-2" text="Salvar" type="submit" />
    </form>
  );
};

export default EditContactForm;
