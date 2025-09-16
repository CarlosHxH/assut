'use client'
import { useState, useEffect, useMemo } from 'react'
import { CreditCard, Plus, Check, Clock, XCircle, Search, Eye } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'
import Modal from '@/components/Modal'
import { User } from '@/@types'
import supabase from '@/lib/supabase'

const mockUsers: User[] = [
    {
        id: '1',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-20T14:22:00Z',
        nome: 'João Silva',
        data_nascimento: '1990-05-15',
        cpf: '123.456.789-10',
        celular: '(11) 99999-1234',
        genero: 'Masculino',
        escolaridade: 'Superior Completo',
        cep: '01234-567',
        endereco: 'Rua das Flores, 123',
        numero: '123',
        complemento: 'Apto 45',
        bairro: 'Centro',
        cidade: 'São Paulo',
        foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        email: 'joao@email.com',
        status: 'Ativo',
        priority: 'normal',
        expected_completion: null,
        notes: null,
        estado: 'SP',
        code: 'USR001'
    },
    {
        id: '2',
        created_at: '2024-01-10T08:15:00Z',
        updated_at: '2024-01-18T16:45:00Z',
        nome: 'Maria Santos',
        data_nascimento: '1985-03-22',
        cpf: '987.654.321-00',
        celular: '(11) 88888-5678',
        genero: 'Feminino',
        escolaridade: 'Ensino Médio',
        cep: '54321-098',
        endereco: 'Av. Principal, 456',
        numero: '456',
        complemento: null,
        bairro: 'Jardim',
        cidade: 'Rio de Janeiro',
        foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        email: 'maria@email.com',
        status: 'Pendente',
        priority: 'high',
        expected_completion: '2024-02-01',
        notes: 'Documentação incompleta',
        estado: 'RJ',
        code: 'USR002'
    }
]

export default function CarteirinhasPage() {
    const [users, setUsers] = useState<User[]>(mockUsers)
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState<'edit' | 'view' | 'create' | 'process'>('edit')
    const [selectedItem, setSelectedItem] = useState<User | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    useMemo(() => {
        const start = async () => {
            const { data: usersData, error: usersError } = await supabase.from('users').select()
            if (!usersError) setUsers(usersData || [])
        }
        start()
    }, [])

    const openModal = (type: 'edit' | 'view' | 'create' | 'process', item?: User) => {
        setModalType(type)
        setSelectedItem(item || null)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedItem(null)
    }

    const handleSave = (data: User) => {
        if (modalType === 'edit' && selectedItem) {
            setUsers(prev => prev.map(user =>
                user.id === selectedItem.id ? { ...user, ...data } : user
            ))
        }
        closeModal()
    }

    const filteredUsers = users.filter(user => {
        const matchesSearch = searchTerm === '' ||
            user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.code?.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
    })

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Carteirinhas</h2>
                    <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                            <Plus size={16} />
                            <span>Gerar Carteirinha</span>
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            Exportar Relatório
                        </button>
                    </div>
                </div>

                {/* Carteirinhas Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <CreditCard className="h-8 w-8 text-blue-500" />
                            <div className="ml-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">892</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <Check className="h-8 w-8 text-green-500" />
                            <div className="ml-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Ativas</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">756</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <Clock className="h-8 w-8 text-yellow-500" />
                            <div className="ml-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Vencendo</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">89</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <XCircle className="h-8 w-8 text-red-500" />
                            <div className="ml-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Expiradas</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">47</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Buscar carteirinhas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="all">Todos os Status</option>
                            <option value="Ativo">Ativas</option>
                            <option value="Vencendo">Vencendo</option>
                            <option value="Expirada">Expiradas</option>
                        </select>
                    </div>
                </div>

                {/* Carteirinhas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredUsers.map((user: User) => (
                        <div key={user.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Carteirinha Preview */}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white relative">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-xs font-medium opacity-80">ID: {user.code}</div>
                                    <div className="text-xs opacity-80">
                                        {user.status === 'Ativo' ? '✓ Ativa' : '⚠ Inativa'}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <img
                                        className="h-12 w-12 rounded-full object-cover border-2 border-white/30"
                                        src={user.foto || `https://ui-avatars.com/api/?name=${user.nome}&background=fff&color=333`}
                                        alt={user.nome}
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm truncate">{user.nome}</h3>
                                        <p className="text-xs opacity-80 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <div className="mt-3 text-xs opacity-80">
                                    Válida até: {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-4">
                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    <span>Criada: {new Date(user.created_at).toLocaleDateString('pt-BR')}</span>
                                    <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Ativo'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                        }`}>
                                        {user.status}
                                    </span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => openModal('view', user)}
                                        className="flex-1 text-blue-600 hover:text-blue-900 dark:text-blue-400 text-sm py-2 px-3 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                    >
                                        Visualizar
                                    </button>
                                    <button className="flex-1 text-green-600 hover:text-green-900 dark:text-green-400 text-sm py-2 px-3 border border-green-200 dark:border-green-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                                        Baixar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {users.length === 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                        <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhuma carteirinha encontrada</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">Não há carteirinhas que correspondam aos seus critérios de busca.</p>
                    </div>
                )}
            </div>

            <Modal
                isOpen={showModal}
                onClose={closeModal}
                type={modalType}
                item={selectedItem}
                onSave={handleSave}
                context="carteirinhas"
            />
        </DashboardLayout>
    )
}