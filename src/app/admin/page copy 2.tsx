'use client'

import { useMemo, useState } from 'react'
import {
  Users,
  FileText,
  AlertTriangle,
  BookOpen,
  Settings,
  CreditCard,
  Menu,
  X,
  Bell
} from 'lucide-react'
import { DarkThemeToggle } from 'flowbite-react'
import supabase from '@/lib/supabase'
import Image from 'next/image'

interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  count?: number
}

interface User {
  id: string;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  nome: string;
  data_nascimento: string; // ISO 8601 date string
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

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState('usuarios')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [solicitations, setSolicitations] = useState<User[]>()

  useMemo(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('customers').select();
      if (error) {
        console.log(error);
      } else {
        setSolicitations(data);
      }
    }
    fetch();
  }, []);


  const renderContent = () => {
    switch (activeItem) {
      case 'usuarios':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Usuários</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Adicionar Usuário
              </button>
            </div>
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Usuários Recentes</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {solicitations && solicitations.map((user, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div className="flex items-center space-x-3">
                        <Image priority className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-xl" width={500} height={500} src={user?.foto || ""} alt={"userImg"} />
                        {/*<div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>*/}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{user.nome}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{user.genero}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Ativo'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      case 'solicitacoes':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Solicitações</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400">Lista de solicitações pendentes e processadas.</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {solicitations && solicitations.map((user, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div className="flex items-center space-x-3">
                        <Image priority className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-xl" width={500} height={500} src={user?.foto || ""} alt={"userImg"} />
                        {/*<div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>*/}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{user.nome}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{user.genero}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Ativo'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      case 'denuncias':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Denúncias</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">Gerenciamento de denúncias e moderação de conteúdo.</p>
            </div>
          </div>
        )
      case 'blog':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">Gerenciamento de posts e conteúdo do blog.</p>
            </div>
          </div>
        )
      case 'configuracoes':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Configurações</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">Configurações gerais do sistema e preferências.</p>
            </div>
          </div>
        )
      case 'carteirinhas':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Carteirinhas</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">Gerenciamento de carteirinhas e credenciais.</p>
            </div>
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
                      ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
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
        <header className="bg-white shadow-sm border-b border-gray-200 lg:static lg:overflow-y-visible">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
              <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                <div className="flex-shrink-0 flex items-center">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
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
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Buscar..."
                        type="search"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:static xl:col-span-2">
                <div className="flex-shrink-0 flex items-center space-x-4">
                  <DarkThemeToggle />
                  <button className="bg-white p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-50">
                    <Bell size={20} />
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-gray-900">Admin</p>
                      <p className="text-xs text-gray-500">admin@exemplo.com</p>
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
    </div>
  )
}