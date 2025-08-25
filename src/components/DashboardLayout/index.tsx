'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
    Users, FileText, AlertTriangle, BookOpen, Settings,
    CreditCard, Menu, X, Bell, Search, Moon, Sun, User
} from 'lucide-react'
import { SidebarItem } from '@/types'
import supabase from '@/lib/supabase'
import { User as typeUser } from '@supabase/supabase-js'

const sidebarItems: SidebarItem[] = [
    { id: 'usuarios', label: 'Usuários', icon: <Users size={20} />, count: 1247, href: '/admin' },
    { id: 'solicitacoes', label: 'Solicitações', icon: <FileText size={20} />, count: 23, href: '/admin/solicitacoes' },
    { id: 'denuncias', label: 'Denúncias', icon: <AlertTriangle size={20} />, count: 7, href: '/admin/denuncias' },
    { id: 'blog', label: 'Blog', icon: <BookOpen size={20} />, count: 45, href: '/admin/blog' },
    { id: 'configuracoes', label: 'Configurações', icon: <Settings size={20} />, href: '/admin/configuracoes' },
    { id: 'carteirinhas', label: 'Carteirinhas', icon: <CreditCard size={20} />, count: 892, href: '/admin/carteirinhas' },
]

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [user, setUser] = useState<typeUser | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }

        getUser()
    }, [])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    const getActiveItem = () => {
        const item = sidebarItems.find(item => item.href === pathname)
        return item?.id || 'usuarios'
    }

    const handleNavigation = (href: string) => {
        router.push(href)
        setSidebarOpen(false)
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
                                    onClick={() => handleNavigation(item.href)}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${getActiveItem() === item.id
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-2 border-blue-700 dark:border-blue-400'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </div>
                                    {item.count && (
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${getActiveItem() === item.id
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
                                            <button
                                                onClick={handleSignOut}
                                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                            >
                                                Sign Out
                                            </button>
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
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}