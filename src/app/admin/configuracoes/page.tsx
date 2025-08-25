'use client'
import { useState } from 'react'
import { Settings, AlertTriangle, Mail, FileText, Save } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'

export default function ConfiguracoesPage() {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <DashboardLayout>
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
                                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Porta</label>
                                <input
                                    type="number"
                                    defaultValue="587"
                                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email do Sistema</label>
                                <input
                                    type="email"
                                    defaultValue="admin@sistema.com"
                                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <button className="w-full font-bold text-gray-300 bg-blue-600 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
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
        </DashboardLayout>
    )
}