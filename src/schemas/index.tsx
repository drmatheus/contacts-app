import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  phone: z.string().min(10, 'Telefone inválido'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  address: z.object({
    street: z.string().min(1, 'A rua é obrigatória'),
    number: z.string().min(1, 'O número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, 'O bairro é obrigatório'),
    city: z.string().min(1, 'A cidade é obrigatória'),
    state: z.string().min(1, 'O estado é obrigatório'),
    zipcode: z.string().min(1, 'O cep é obrigatório'),
  }),
});

export type ContactSchema = z.infer<typeof contactSchema>;
