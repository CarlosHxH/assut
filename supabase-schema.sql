-- Esquema do banco de dados para o sistema de carteirinhas

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    celular VARCHAR(20) NOT NULL,
    genero VARCHAR(20) NOT NULL,
    escolaridade VARCHAR(100) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    endereco TEXT NOT NULL,
    numero VARCHAR(20) NOT NULL,
    complemento TEXT,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    foto TEXT,
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'Pendente' CHECK (status IN ('Ativo', 'Pendente', 'Inativo', 'Suspenso')),
    priority VARCHAR(10) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high')),
    expected_completion DATE,
    notes TEXT,
    code VARCHAR(20) UNIQUE
);

-- Tabela de carteirinhas
CREATE TABLE IF NOT EXISTS carteirinhas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    numero_carteirinha VARCHAR(50) UNIQUE NOT NULL,
    data_emissao DATE DEFAULT CURRENT_DATE,
    data_validade DATE,
    status VARCHAR(20) DEFAULT 'Ativa' CHECK (status IN ('Ativa', 'Inativa', 'Expirada', 'Cancelada')),
    qr_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de solicitações de carteirinhas
CREATE TABLE IF NOT EXISTS solicitacoes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tipo_solicitacao VARCHAR(50) NOT NULL CHECK (tipo_solicitacao IN ('Nova', 'Renovacao', 'Segunda_Via')),
    status VARCHAR(20) DEFAULT 'Pendente' CHECK (status IN ('Pendente', 'Em_Analise', 'Aprovada', 'Rejeitada')),
    documentos_anexos JSONB,
    observacoes TEXT,
    data_solicitacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_processamento TIMESTAMP WITH TIME ZONE,
    processado_por UUID,
    motivo_rejeicao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de posts do blog
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de denúncias
CREATE TABLE IF NOT EXISTS denuncias (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
    reported_id UUID REFERENCES users(id) ON DELETE SET NULL,
    reporter VARCHAR(255) NOT NULL,
    reported VARCHAR(255) NOT NULL,
    reason VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'dismissed')),
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de administradores
CREATE TABLE IF NOT EXISTS admins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_carteirinhas_updated_at BEFORE UPDATE ON carteirinhas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_solicitacoes_updated_at BEFORE UPDATE ON solicitacoes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_denuncias_updated_at BEFORE UPDATE ON denuncias FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_cpf ON users(cpf);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_carteirinhas_user_id ON carteirinhas(user_id);
CREATE INDEX IF NOT EXISTS idx_carteirinhas_numero ON carteirinhas(numero_carteirinha);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_user_id ON solicitacoes(user_id);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_status ON solicitacoes(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_denuncias_status ON denuncias(status);

-- Políticas de segurança RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE carteirinhas ENABLE ROW LEVEL SECURITY;
ALTER TABLE solicitacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE denuncias ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Políticas para usuários (podem ver apenas seus próprios dados)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);

-- Políticas para carteirinhas (usuários podem ver apenas suas próprias carteirinhas)
CREATE POLICY "Users can view own carteirinhas" ON carteirinhas FOR SELECT USING (auth.uid()::text = user_id::text);

-- Políticas para solicitações (usuários podem ver e criar suas próprias solicitações)
CREATE POLICY "Users can view own solicitacoes" ON solicitacoes FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can create solicitacoes" ON solicitacoes FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Políticas para blog posts (todos podem ler posts publicados)
CREATE POLICY "Anyone can view published blog posts" ON blog_posts FOR SELECT USING (status = 'published');

-- Políticas para denúncias (usuários podem criar denúncias)
CREATE POLICY "Users can create denuncias" ON denuncias FOR INSERT WITH CHECK (auth.uid()::text = reporter_id::text);
CREATE POLICY "Users can view own denuncias" ON denuncias FOR SELECT USING (auth.uid()::text = reporter_id::text);

-- Políticas para admins (acesso total para administradores autenticados)
-- Nota: Estas políticas devem ser ajustadas conforme o sistema de autenticação de admins

-- Inserir dados de exemplo
INSERT INTO users (nome, data_nascimento, cpf, celular, genero, escolaridade, cep, endereco, numero, complemento, bairro, cidade, estado, email, status, priority, code) VALUES
('João Silva', '1990-05-15', '123.456.789-10', '(11) 99999-1234', 'Masculino', 'Superior Completo', '01234-567', 'Rua das Flores', '123', 'Apto 45', 'Centro', 'São Paulo', 'SP', 'joao@email.com', 'Ativo', 'normal', 'USR001'),
('Maria Santos', '1985-03-22', '987.654.321-00', '(11) 88888-5678', 'Feminino', 'Ensino Médio', '54321-098', 'Av. Principal', '456', NULL, 'Jardim', 'Rio de Janeiro', 'RJ', 'maria@email.com', 'Pendente', 'high', 'USR002');

INSERT INTO blog_posts (title, content, author, status) VALUES
('Como Solicitar sua Carteirinha', 'Guia completo para solicitar sua carteirinha digital...', 'Admin', 'published'),
('Novas Funcionalidades da Plataforma', 'Confira as últimas atualizações do sistema...', 'Admin', 'draft');

INSERT INTO denuncias (reporter, reported, reason, description, status, priority) VALUES
('João Silva', 'Pedro Costa', 'Conteúdo Inapropriado', 'Usuário publicou conteúdo ofensivo no perfil', 'open', 'high'),
('Ana Lima', 'Carlos Santos', 'Spam', 'Usuário está enviando mensagens em massa', 'investigating', 'medium');

