declare interface CustomFormData {
    name: string;
    email: string;
    type: string;
    message: string;
}

declare interface CarteirinhaData {
    // Informações Pessoais
    nomeCompleto: string;
    cpf: string;
    rg: string;
    dataNascimento: string;
    nomeMae: string;
    estadoCivil: string;
    profissao: string;

    // Endereço
    cep: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;

    // Contato
    telefone: string;
    celular: string;
    email: string;

    // Foto
    foto: string | null;
}