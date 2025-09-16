'use client'
import { useState, useMemo } from 'react'
import { Plus, Eye, Edit, Check, XCircle, Search } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'
import Modal from '@/components/Modal'
import { User, StatsCard } from '@/@types'
import supabase from '@/lib/supabase'

const statsCards: StatsCard[] = [
  { title: 'Total de Usuários', value: '1,247', change: '+12%', color: 'bg-blue-500' },
  { title: 'Solicitações Pendentes', value: '23', change: '+5%', color: 'bg-yellow-500' },
  { title: 'Denúncias Abertas', value: '7', change: '-15%', color: 'bg-red-500' },
  { title: 'Posts Publicados', value: '45', change: '+8%', color: 'bg-green-500' },
]

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'edit' | 'view' | 'create' | 'process'>('edit')
  const [selectedItem, setSelectedItem] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useMemo(() => {
    (async () => {
      const { data: usersData, error: usersError } = await supabase.from('users').select()
      if (!usersError) setUsers(usersData || []);
    })()
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
    } else if (modalType === 'create') {
      const newId = Date.now().toString()
      setUsers(prev => [...prev, { ...data, id: newId, created_at: new Date().toISOString() }])
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Usuários</h2>
          <button
            onClick={() => openModal('create')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Adicionar Usuário</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">{card.change}</p>
                </div>
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                  <div className="w-6 h-6 bg-white rounded opacity-80"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Todos os Status</option>
              <option value="Ativo">Ativo</option>
              <option value="Pendente">Pendente</option>
              <option value="Inativo">Inativo</option>
              <option value="Suspenso">Suspenso</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lista de Usuários</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Usuário</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contato</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user: User) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={user.foto || `https://ui-avatars.com/api/?name=${user.nome}&background=3B82F6&color=fff`}
                            alt={user.nome}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{user.nome}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{user.email}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{user.celular}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Ativo'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : user.status === 'Pendente'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openModal('view', user)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 p-1 rounded"
                          title="Visualizar"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openModal('edit', user)}
                          className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 p-1 rounded"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => updateStatus(user.id, user.status === 'Ativo' ? 'Suspenso' : 'Ativo')}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 p-1 rounded"
                          title={user.status === 'Ativo' ? 'Suspender' : 'Ativar'}
                        >
                          {user.status === 'Ativo' ? <XCircle size={16} /> : <Check size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        type={modalType}
        item={selectedItem}
        onSave={handleSave}
        context="usuarios"
      />
    </DashboardLayout>
  )
}