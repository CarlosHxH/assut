export interface User {
    id: string;
    created_at: string;
    updated_at: string;
    nome: string;
    data_nascimento: string;
    cpf: string;
    celular: string;
    genero: string;
    escolaridade: string;
    cep: string;
    endereco: string;
    numero: string;
    complemento: string | null;
    bairro: string;
    cidade: string;
    foto: string | null;
    email: string;
    status: string;
    priority: string;
    expected_completion: string | null;
    notes: string | null;
    estado: string | null;
    code: string | null;
}

export interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    status: 'published' | 'draft';
}

export interface Denuncia {
    id: string;
    reporter: string;
    reported: string;
    reason: string;
    description: string;
    date: string;
    status: 'open' | 'investigating' | 'resolved' | 'dismissed';
    priority: 'low' | 'medium' | 'high';
}

export interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    count?: number;
    href: string;
}

export interface StatsCard {
    title: string;
    value: string;
    change: string;
    color: string;
}

export type ModalType = 'edit' | 'view' | 'create' | 'process';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: ModalType;
    item?: string | User | Denuncia | { [x: string]: string | number };
    onSave?: (data: string | User | Denuncia | { [x: string]: string | number }) => void;
    context: string;
}