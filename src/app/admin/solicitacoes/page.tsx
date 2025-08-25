'use client'
import { useState, useEffect, useMemo } from 'react'
import { FileText, Check, AlertTriangle, Eye, XCircle, Search } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'
import Modal from '@/components/Modal'
import { User } from '@/types'
import supabase from '@/lib/supabase'


export default function SolicitacoesPage() {
    const [users, setUsers] = useState<User[]>([])
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

    const updateStatus = (id: string, newStatus: string) => {
        setUsers(prev => prev.map(user =>
            user.id === id ? { ...user, status: newStatus, updated_at: new Date().toISOString() } : user
        ))
    }

    const filteredUsers = users.filter(user => {
        const matchesSearch = searchTerm === '' ||
            Object.values(user).some(value =>
                value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Solicitações</h2>
                    <div className="flex space-x-2">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            Processar Todas
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <FileText className="h-8 w-8 text-blue-500" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Pendentes</dt>
                                    <dd className="text-lg font-medium text-gray-900 dark:text-white">{users.filter(u => u.status === 'Pendente').length}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Check className="h-8 w-8 text-green-500" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Aprovadas</dt>
                                    <dd className="text-lg font-medium text-gray-900 dark:text-white">{users.filter(u => u.status === 'Ativo').length}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <AlertTriangle className="h-8 w-8 text-red-500" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Alta Prioridade</dt>
                                    <dd className="text-lg font-medium text-gray-900 dark:text-white">{users.filter(u => u.priority === 'high').length}</dd>
                                </dl>
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
                                placeholder="Buscar solicitações..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 text-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border text-gray-600 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="all">Todos os Status</option>
                            <option value="Pendente">Pendente</option>
                            <option value="Ativo">Processado</option>
                            <option value="Rejeitado">Rejeitado</option>
                        </select>
                    </div>
                </div>

                {/* Solicitations List */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Solicitações Recentes</h3>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredUsers.map((user: User) => (
                            <div key={user.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            className="h-12 w-12 rounded-full object-cover"
                                            src={user.foto || `https://ui-avatars.com/api/?name=${user.nome}&background=3B82F6&color=fff`}
                                            alt={user.nome || ""}
                                        />
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{user.nome}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                            <div className="flex items-center mt-1 space-x-2">
                                                <span className={`px-2 py-1 text-xs rounded-full ${user.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                                    user.priority === 'normal' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                    }`}>
                                                    {user.priority === 'high' ? 'Alta' : user.priority === 'normal' ? 'Normal' : 'Baixa'} Prioridade
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(user.created_at).toLocaleDateString('pt-BR')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className={`px-3 py-1 text-sm rounded-full ${user.status === 'Ativo'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                            : user.status === 'Pendente'
                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                            }`}>
                                            {user.status}
                                        </span>
                                        <div className="flex space-x-1">
                                            <button
                                                onClick={() => openModal('view', user)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                title="Visualizar"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => openModal('process', user)}
                                                className="text-green-600 hover:text-green-900 dark:text-green-400 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
                                                title="Processar"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                onClick={() => updateStatus(user.id, 'Rejeitado')}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                                title="Rejeitar"
                                            >
                                                <XCircle size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {user.notes && (
                                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                        <strong>Notas:</strong> {user.notes}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={showModal}
                onClose={closeModal}
                type={modalType}
                item={selectedItem}
                onSave={handleSave}
                context="solicitacoes"
            />
        </DashboardLayout>
    )
}