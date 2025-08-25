"use client"
import { useEffect, useMemo, useState } from 'react'
import { Users, FileText, AlertTriangle, BookOpen, Settings, CreditCard, Menu, X, Bell, Search, Edit, Check, XCircle, Eye, Plus, Moon, Sun, Save, Mail, User, Clock } from 'lucide-react'
import supabase from '@/lib/supabase'

interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  count?: number
}

interface User {
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

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  status: 'published' | 'draft';
}

interface Denuncia {
  id: string;
  reporter: string;
  reported: string;
  reason: string;
  description: string;
  date: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
}

const sidebarItems: SidebarItem[] = [
  { id: 'usuarios', label: 'Usuários', icon: <Users size={20} />, count: 1247 },
  { id: 'solicitacoes', label: 'Solicitações', icon: <FileText size={20} />, count: 23 },
  { id: 'denuncias', label: 'Denúncias', icon: <AlertTriangle size={20} />, count: 7 },
  { id: 'blog', label: 'Blog', icon: <BookOpen size={20} />, count: 45 },
  { id: 'configuracoes', label: 'Configurações', icon: <Settings size={20} /> },
  { id: 'carteirinhas', label: 'Carteirinhas', icon: <CreditCard size={20} />, count: 892 },
]

const statsCards = [
  { title: 'Total de Usuários', value: '1,247', change: '+12%', color: 'bg-blue-500' },
  { title: 'Solicitações Pendentes', value: '23', change: '+5%', color: 'bg-yellow-500' },
  { title: 'Denúncias Abertas', value: '7', change: '-15%', color: 'bg-red-500' },
  { title: 'Posts Publicados', value: '45', change: '+8%', color: 'bg-green-500' },
]

// Mock data
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

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Como Solicitar sua Carteirinha',
    content: 'Guia completo para solicitar sua carteirinha digital...',
    author: 'Admin',
    date: '2024-01-20',
    status: 'published'
  },
  {
    id: '2',
    title: 'Novas Funcionalidades da Plataforma',
    content: 'Confira as últimas atualizações do sistema...',
    author: 'Admin',
    date: '2024-01-18',
    status: 'draft'
  }
]

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

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState('usuarios')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts)
  const [denuncias, setDenuncias] = useState<Denuncia[]>(mockDenuncias)

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'edit' | 'view' | 'create' | 'process'>('edit')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [editForm, setEditForm] = useState<any>({})

  // Search and filter
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useMemo(() => {
    const start = async () => {
      const { data: usersData, error: usersError } = await supabase.from('users').select();
      if (!usersError) setUsers(usersData || []);

      const { data: denuncuasData, error: denuncuasError } = await supabase.from('denuncias').select();
      if (!denuncuasError) setDenuncias(denuncuasData || []);

      const { data: blogData, error: blogError } = await supabase.from('blog_posts').select();
      if (!blogError) setBlogPosts(blogData || []);
    }
    start();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const openModal = (type: 'edit' | 'view' | 'create' | 'process', item?: any) => {
    setModalType(type)
    setSelectedItem(item || null)
    setEditForm(item || {})
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setEditForm({})
  }

  const handleSave = () => {
    if (modalType === 'edit' && selectedItem) {
      if (activeItem === 'usuarios' || activeItem === 'solicitacoes') {
        setUsers(prev => prev.map(user =>
          user.id === selectedItem.id ? { ...user, ...editForm } : user
        ))
      } else if (activeItem === 'blog') {
        setBlogPosts(prev => prev.map(post =>
          post.id === selectedItem.id ? { ...post, ...editForm } : post
        ))
      } else if (activeItem === 'denuncias') {
        setDenuncias(prev => prev.map(denuncia =>
          denuncia.id === selectedItem.id ? { ...denuncia, ...editForm } : denuncia
        ))
      }
    } else if (modalType === 'create') {
      const newId = Date.now().toString()
      if (activeItem === 'usuarios') {
        setUsers(prev => [...prev, { ...editForm, id: newId, created_at: new Date().toISOString() }])
      } else if (activeItem === 'blog') {
        setBlogPosts(prev => [...prev, { ...editForm, id: newId, date: new Date().toISOString().split('T')[0] }])
      } else if (activeItem === 'denuncias') {
        setDenuncias(prev => [...prev, { ...editForm, id: newId, date: new Date().toISOString().split('T')[0] }])
      }
    }
    closeModal()
  }

  const updateStatus = (id: string, newStatus: string) => {
    if (activeItem === 'usuarios' || activeItem === 'solicitacoes') {
      setUsers(prev => prev.map(user =>
        user.id === id ? { ...user, status: newStatus, updated_at: new Date().toISOString() } : user
      ))
    } else if (activeItem === 'denuncias') {
      setDenuncias(prev => prev.map(denuncia =>
        denuncia.id === id ? { ...denuncia, status: newStatus as any } : denuncia
      ))
    }
  }

  const filteredData = () => {
    let data: any[] = []

    if (activeItem === 'usuarios' || activeItem === 'solicitacoes') {
      data = users
    } else if (activeItem === 'blog') {
      data = blogPosts
    } else if (activeItem === 'denuncias') {
      data = denuncias
    }

    return data.filter(item => {
      const matchesSearch = searchTerm === '' ||
        Object.values(item).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }

  const renderModal = () => {
    if (!showModal) return null

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {modalType === 'edit' ? 'Editar' :
                modalType === 'create' ? 'Criar Novo' :
                  modalType === 'view' ? 'Visualizar' : 'Processar'}
              {activeItem === 'usuarios' ? ' Usuário' :
                activeItem === 'solicitacoes' ? ' Solicitação' :
                  activeItem === 'blog' ? ' Post' : ' Denúncia'}
            </h3>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            {(activeItem === 'usuarios' || activeItem === 'solicitacoes') && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
                    <input
                      type="text"
                      value={editForm.nome || ''}
                      onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      disabled={modalType === 'view'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      disabled={modalType === 'view'}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CPF</label>
                    <input
                      type="text"
                      value={editForm.cpf || ''}
                      onChange={(e) => setEditForm({ ...editForm, cpf: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      disabled={modalType === 'view'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Celular</label>
                    <input
                      type="text"
                      value={editForm.celular || ''}
                      onChange={(e) => setEditForm({ ...editForm, celular: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      disabled={modalType === 'view'}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select
                      value={editForm.status || ''}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      disabled={modalType === 'view'}
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Pendente">Pendente</option>
                      <option value="Inativo">Inativo</option>
                      <option value="Suspenso">Suspenso</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prioridade</label>
                    <select
                      value={editForm.priority || ''}
                      onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      disabled={modalType === 'view'}
                    >
                      <option value="low">Baixa</option>
                      <option value="normal">Normal</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notas</label>
                  <textarea
                    value={editForm.notes || ''}
                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    disabled={modalType === 'view'}
                  />
                </div>
              </div>
            )}

            {activeItem === 'blog' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
                  <input
                    type="text"
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    disabled={modalType === 'view'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Conteúdo</label>
                  <textarea
                    value={editForm.content || ''}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    disabled={modalType === 'view'}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Autor</label>
                    <input
                      type="text"
                      value={editForm.author || ''}
                      onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      disabled={modalType === 'view'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select
                      value={editForm.status || ''}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      disabled={modalType === 'view'}
                    >
                      <option value="draft">Rascunho</option>
                      <option value="published">Publicado</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeItem === 'denuncias' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Denunciante</label>
                    <input
                      type="text"
                      value={editForm.reporter || ''}
                      onChange={(e) => setEditForm({ ...editForm, reporter: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      disabled={modalType === 'view'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Denunciado</label>
                    <input
                      type="text"
                      value={editForm.reported || ''}
                      onChange={(e) => setEditForm({ ...editForm, reported: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      disabled={modalType === 'view'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Motivo</label>
                  <input
                    type="text"
                    value={editForm.reason || ''}
                    onChange={(e) => setEditForm({ ...editForm, reason: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    disabled={modalType === 'view'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    disabled={modalType === 'view'}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select
                      value={editForm.status || ''}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      disabled={modalType === 'view'}
                    >
                      <option value="open">Aberta</option>
                      <option value="investigating">Investigando</option>
                      <option value="resolved">Resolvida</option>
                      <option value="dismissed">Descartada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prioridade</label>
                    <select
                      value={editForm.priority || ''}
                      onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      disabled={modalType === 'view'}
                    >
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {modalType !== 'view' && (
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save size={16} />
                <span>Salvar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderContent = () => {
    const data = filteredData()

    switch (activeItem) {
      case 'usuarios':
        return (
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
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                    {data.map((user: User) => (
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
        )

      case 'solicitacoes':
        return (
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
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                {data.map((user: User) => (
                  <div key={user.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={user.foto || `https://ui-avatars.com/api/?name=${user.nome}&background=3B82F6&color=fff`}
                          alt={user.nome}
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
        )

      case 'denuncias':
        return (
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
                  <XCircle className="h-8 w-8 text-gray-500" />
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
                  <option value='investigating'>Investigando</option>
                  <option value="resolved">Resolvidas</option>
                  <option value="dismissed">Descartadas</option>
                </select>
              </div>
            </div>

            {/* Denuncias List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lista de Denúncias</h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {denuncias.filter(denuncia => {
                  const matchesSearch = searchTerm === '' ||
                    Object.values(denuncia).some(value =>
                      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  const matchesStatus = statusFilter === 'all' || denuncia.status === statusFilter
                  return matchesSearch && matchesStatus
                }).map((denuncia: Denuncia) => (
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
          </div >
        )

      case 'blog':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog</h2>
              <button
                onClick={() => openModal('create')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Novo Post</span>
              </button>
            </div>

            {/* Blog Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-blue-500" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total de Posts</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{blogPosts.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center">
                  <Check className="h-8 w-8 text-green-500" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Publicados</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{blogPosts.filter(p => p.status === 'published').length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center">
                  <Edit className="h-8 w-8 text-yellow-500" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Rascunhos</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{blogPosts.filter(p => p.status === 'draft').length}</p>
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
                    placeholder="Buscar posts..."
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
                  <option value="published">Publicados</option>
                  <option value="draft">Rascunhos</option>
                </select>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.filter(post => {
                const matchesSearch = searchTerm === '' ||
                  post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  post.author.toLowerCase().includes(searchTerm.toLowerCase())
                const matchesStatus = statusFilter === 'all' || post.status === statusFilter
                return matchesSearch && matchesStatus
              }).map((post: BlogPost) => (
                <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${post.status === 'published'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                        {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => openModal('view', post)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 p-1 rounded"
                          title="Visualizar"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openModal('edit', post)}
                          className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 p-1 rounded"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>Por {post.author}</span>
                      <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {blogPosts.filter(post => {
              const matchesSearch = searchTerm === '' ||
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.author.toLowerCase().includes(searchTerm.toLowerCase())
              const matchesStatus = statusFilter === 'all' || post.status === statusFilter
              return matchesSearch && matchesStatus
            }).length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhum post encontrado</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Não há posts que correspondam aos seus critérios de busca.</p>
                  <button
                    onClick={() => openModal('create')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Criar Primeiro Post
                  </button>
                </div>
              )}
          </div>
        )

      case 'configuracoes':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações</h2>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Settings className="mr-2" size={20} />
                    Configurações do Sistema
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white">Modo Escuro</label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Ativar tema escuro por padrão</p>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${darkMode ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white">Notificações por Email</label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receber alertas por email</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white">Backup Automático</label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Fazer backup dos dados diariamente</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <AlertTriangle className="mr-2" size={20} />
                    Configurações de Segurança
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tempo de Sessão (minutos)</label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tentativas de Login</label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white">Autenticação de Dois Fatores</label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Segurança adicional para login</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Mail className="mr-2" size={20} />
                    Configurações de Email
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Servidor SMTP</label>
                    <input
                      type="text"
                      defaultValue="smtp.gmail.com"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Porta</label>
                    <input
                      type="number"
                      defaultValue="587"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email do Sistema</label>
                    <input
                      type="email"
                      defaultValue="admin@sistema.com"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Testar Configuração
                  </button>
                </div>
              </div>

              {/* Database Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <FileText className="mr-2" size={20} />
                    Banco de Dados
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total de Registros</label>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tamanho do BD</label>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">2.5 GB</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                      Fazer Backup
                    </button>
                    <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
                      Otimizar Banco
                    </button>
                    <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                      Limpar Logs
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Save size={16} />
                <span>Salvar Configurações</span>
              </button>
            </div>
          </div>
        )

      case 'carteirinhas':
        return (
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
              {users.filter(user => {
                const matchesSearch = searchTerm === '' ||
                  user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.code?.toLowerCase().includes(searchTerm.toLowerCase())
                return matchesSearch
              }).map((user: User) => (
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
        )

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">Bem-vindo ao painel administrativo.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeItem === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-2 border-blue-700 dark:border-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.count && (
                    <span className={`px-2 py-0.5 text-xs rounded-full ${activeItem === item.id
                      ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:blue-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 lg:static lg:overflow-y-visible">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
              <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                <div className="flex-shrink-0 flex items-center">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Menu size={20} />
                  </button>
                </div>
              </div>

              <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-8">
                <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                  <div className="w-full">
                    <label htmlFor="search" className="sr-only">
                      Buscar
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="search"
                        name="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Buscar..."
                        type="search"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:static xl:col-span-2">
                <div className="flex-shrink-0 flex items-center space-x-4">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="bg-white dark:bg-gray-700 p-2 rounded-lg text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
                  >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <button className="bg-white dark:bg-gray-700 p-2 rounded-lg text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">admin@exemplo.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  )
}