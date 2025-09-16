'use client'
import { useState, useEffect, useMemo } from 'react'
import { BookOpen, Plus, Eye, Edit, Check, Search } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'
import Modal from '@/components/Modal'
import { BlogPost } from '@/@types'
import supabase from '@/lib/supabase'

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

export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts)
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState<'edit' | 'view' | 'create' | 'process'>('edit')
    const [selectedItem, setSelectedItem] = useState<BlogPost | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    useMemo(() => {
        const start = async () => {
            const { data: blogData, error: blogError } = await supabase.from('blog_posts').select()
            if (!blogError) setBlogPosts(blogData || [])
        }
        start()
    }, [])

    const openModal = (type: 'edit' | 'view' | 'create' | 'process', item?: BlogPost) => {
        setModalType(type)
        setSelectedItem(item || null)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedItem(null)
    }

    const handleSave = (data: BlogPost) => {
        if (modalType === 'edit' && selectedItem) {
            setBlogPosts(prev => prev.map(post =>
                post.id === selectedItem.id ? { ...post, ...data } : post
            ))
        } else if (modalType === 'create') {
            const newId = Date.now().toString()
            setBlogPosts(prev => [...prev, { ...data, id: newId, date: new Date().toISOString().split('T')[0] }])
        }
        closeModal()
    }

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = searchTerm === '' ||
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || post.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <DashboardLayout>
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
                    {filteredPosts.map((post: BlogPost) => (
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
                {filteredPosts.length === 0 && (
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

            <Modal
                isOpen={showModal}
                onClose={closeModal}
                type={modalType}
                item={selectedItem}
                onSave={handleSave}
                context="blog"
            />
        </DashboardLayout>
    )
}