import { z } from "zod";
// Schema de validação com zod
export const carteirinhaSchema = z.object({
    nomeCompleto: z.string().min(3, 'Nome obrigatório'),
    cpf: z.string().min(14, 'CPF obrigatório'),
    rg: z.string().min(5, 'RG obrigatório'),
    dataNascimento: z.string().min(8, 'Data de nascimento obrigatória'),
    nomeMae: z.string().min(3, 'Nome da mãe obrigatório'),
    estadoCivil: z.string().optional(),
    profissao: z.string().optional(),
    cep: z.string().min(9, 'CEP obrigatório'),
    endereco: z.string().min(3, 'Endereço obrigatório'),
    numero: z.string().min(1, 'Número obrigatório'),
    complemento: z.string().optional(),
    bairro: z.string().min(2, 'Bairro obrigatório'),
    cidade: z.string().min(2, 'Cidade obrigatória'),
    estado: z.string().min(2, 'Estado obrigatório'),
    telefone: z.string().optional(),
    celular: z.string().min(8, 'Celular obrigatório'),
    email: z.string().email('E-mail inválido'),
    foto: z.string().nullable(),
});

export type CarteirinhaSchema = z.infer<typeof carteirinhaSchema>;