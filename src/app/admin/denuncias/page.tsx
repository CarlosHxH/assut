'use client'
import { useState, useEffect, useMemo } from 'react'
import { AlertTriangle, Plus, Eye, Edit, Check, Search } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'
import Modal from '@/components/Modal'
import { Denuncia } from '@/@types'
import supabase from '@/lib/supabase'

const mockDenuncias: Denuncia[] = [
    {
        id: '1',
        reporter: 'João Silva',
        reported: 'Pedro Costa',
        reason: 'Conteúdo Inapropriado',
        description: 'Usuário publicou conteúdo ofensivo no perfil',
        date: '2024-01-20',
        status: 'open',
        priority: 'high'
    },
    {
        id: '2',
        reporter: 'Ana Lima',
        reported: 'Carlos Santos',
        reason: 'Spam',
        description: 'Usuário está enviando mensagens em massa',
        date: '2024-01-19',
        status: 'investigating',
        priority: 'medium'
    }
]

export default function DenunciasPage() {
    const [denuncias, setDenuncias] = useState<Denuncia[]>(mockDenuncias)
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState<'edit' | 'view' | 'create' | 'process'>('edit')
    const [selectedItem, setSelectedItem] = useState<Denuncia | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    useMemo(() => {
        const start = async () => {
            const { data: denunciasData, error: denunciasError } = await supabase.from('denuncias').select()
            if (!denunciasError) setDenuncias(denunciasData || [])
        }
        start()
    }, [])

    const openModal = (type: 'edit' | 'view' | 'create' | 'process', item?: Denuncia) => {
        setModalType(type)
        setSelectedItem(item || null)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedItem(null)
    }

    const handleSave = (data: Denuncia) => {
        if (modalType === 'edit' && selectedItem) {
            setDenuncias(prev => prev.map(denuncia =>
                denuncia.id === selectedItem.id ? { ...denuncia, ...data } : denuncia
            ))
        } else if (modalType === 'create') {
            const newId = Date.now().toString()
            setDenuncias(prev => [...prev, { ...data, id: newId, date: new Date().toISOString().split('T')[0] }])
        }
        closeModal()
    }

    const updateStatus = (id: string, newStatus: string) => {
        setDenuncias(prev => prev.map(denuncia =>
            denuncia.id === id ? { ...denuncia, status: newStatus as any } : denuncia
        ))
    }

    const filteredDenuncias = denuncias.filter(denuncia => {
        const matchesSearch = searchTerm === '' ||
            Object.values(denuncia).some(value =>
                value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        const matchesStatus = statusFilter === 'all' || denuncia.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Denúncias</h2>
                    <button
                        onClick={() => openModal('create')}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                    >
                        <Plus size={16} />
                        <span>Nova Denúncia</span>
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                            <div className="ml-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Abertas</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{denuncias.filter(d => d.status === 'open').length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <Search className="h-8 w-8 text-yellow-500" />
                            <div className="ml-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Investigando</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{denuncias.filter(d => d.status === 'investigating').length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <Check className="h-8 w-8 text-green-500" />
                            <div className="ml-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Resolvidas</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{denuncias.filter(d => d.status === 'resolved').length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="h-8 w-8 bg-gray-500 rounded flex items-center justify-center">
                                <div className="h-4 w-4 bg-white rounded"></div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Descartadas</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{denuncias.filter(d => d.status === 'dismissed').length}</p>
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
                                placeholder="Buscar denúncias..."
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
                            <option value="open">Abertas</option>
                            <option value="investigating">Investigando</option>
                            <option value="resolved">Resolvidas</option>
                            <option value="dismissed">Descartadas</option>
                        </select>
                    </div>
                </div>

                {/* Denúncias List */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lista de Denúncias</h3>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredDenuncias.map((denuncia: Denuncia) => (
                            <div key={denuncia.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{denuncia.reason}</h4>
                                            <span className={`px-2 py-1 text-xs rounded-full ${denuncia.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                                denuncia.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                }`}>
                                                {denuncia.priority === 'high' ? 'Alta' : denuncia.priority === 'medium' ? 'Média' : 'Baixa'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{denuncia.description}</p>
                                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                            <span><strong>Denunciante:</strong> {denuncia.reporter}</span>
                                            <span><strong>Denunciado:</strong> {denuncia.reported}</span>
                                            <span><strong>Data:</strong> {new Date(denuncia.date).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 ml-4">
                                        <span className={`px-3 py-1 text-sm rounded-full ${denuncia.status === 'open' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                            denuncia.status === 'investigating' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                                denuncia.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                            {denuncia.status === 'open' ? 'Aberta' :
                                                denuncia.status === 'investigating' ? 'Investigando' :
                                                    denuncia.status === 'resolved' ? 'Resolvida' : 'Descartada'}
                                        </span>
                                        <div className="flex space-x-1">
                                            <button
                                                onClick={() => openModal('view', denuncia)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                title="Visualizar"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => openModal('edit', denuncia)}
                                                className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 p-2 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                                                title="Editar"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => updateStatus(denuncia.id, 'resolved')}
                                                className="text-green-600 hover:text-green-900 dark:text-green-400 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
                                                title="Resolver"
                                            >
                                                <Check size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
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
                context="denuncias"
            />
        </DashboardLayout>
    )
}