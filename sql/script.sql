create table public.carteirinhas (
  id uuid primary key default gen_random_uuid(),
  nomeCompleto text not null,
  cpf text not null,
  rg text not null,
  dataNascimento date not null,
  nomeMae text not null,
  estadoCivil text,
  profissao text,
  cep text not null,
  endereco text not null,
  numero text not null,
  complemento text,
  bairro text not null,
  cidade text not null,
  estado text not null,
  telefone text,
  celular text not null,
  email text not null,
  foto text, -- pode ser uma URL ou base64, dependendo do seu uso
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create or replace function public.cadastrar_carteirinha(
  p_nomeCompleto text,
  p_cpf text,
  p_rg text,
  p_dataNascimento date,
  p_nomeMae text,
  p_estadoCivil text,
  p_profissao text,
  p_cep text,
  p_endereco text,
  p_numero text,
  p_complemento text,
  p_bairro text,
  p_cidade text,
  p_estado text,
  p_telefone text,
  p_celular text,
  p_email text,
  p_foto text
)
returns void as $$
begin
  insert into public.carteirinhas (
    nomeCompleto, cpf, rg, dataNascimento, nomeMae, estadoCivil, profissao,
    cep, endereco, numero, complemento, bairro, cidade, estado,
    telefone, celular, email, foto
  ) values (
    p_nomeCompleto, p_cpf, p_rg, p_dataNascimento, p_nomeMae, p_estadoCivil, p_profissao,
    p_cep, p_endereco, p_numero, p_complemento, p_bairro, p_cidade, p_estado,
    p_telefone, p_celular, p_email, p_foto
  );
end;
$$ language plpgsql;