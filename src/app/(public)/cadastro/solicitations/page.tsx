// src/app/solicitations/page.tsx
'use client';

import { useState } from 'react';
import { Search, FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import supabase from '@/lib/supabase';
import { PersonData } from '@/lib/database.types';

export default function SolicitationsPage() {
    const [searchNumber, setSearchNumber] = useState('');
    const [solicitation, setSolicitation] = useState<PersonData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getStatusIcon = (status: PersonData['status']) => {
        switch (status) {
            case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'in_progress': return <AlertCircle className="w-5 h-5 text-blue-500" />;
            case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
            default: return <Clock className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusText = (status: PersonData['status']) => {
        switch (status) {
            case 'pending': return 'Pendente';
            case 'in_progress': return 'Em Andamento';
            case 'completed': return 'Concluída';
            case 'cancelled': return 'Cancelada';
            default: return 'Desconhecido';
        }
    };

    const getStatusColor = (status: PersonData['status']) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: PersonData['priority']) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('pt-BR');
    };

    const handleSearch = async () => {
        if (!searchNumber.trim()) {
            setError('Digite o número da solicitação');
            return;
        }
        if (!searchNumber.trim().replace("#", "").startsWith("SOL-")) {
            setError('Tipo de solicitação invalida');
            return;
        }

        const search = searchNumber.trim().replace("#", "").replace("SOL-", "");

        setLoading(true);
        setError('');
        setSolicitation(null);

        try {

            const { data, error } = await supabase.rpc('search_customers_by_id', { search_term: search });

            if (error || data.length === 0) {
                console.log(error);

                setError('Solicitação não encontrada');
            } else {
                const { id, nome, ...fields } = data[0];
                const newId = `#SOL-${id.split("-")[0].toUpperCase()}`;
                const newNome = nome.split(" ")[0] + " " + nome.split(" ")[1]
                setSolicitation({ id: newId, nome: newNome, ...fields });
            }
        } catch (err) {
            console.log(err);

            setError('Erro ao buscar solicitação');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen dark:bg-gray-900 bg-white py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-600 mb-2">
                        Acompanhamento de Solicitações
                    </h1>
                    <p className="text-gray-600">
                        Digite o número da sua solicitação para acompanhar o status
                    </p>
                </div>

                {/* Search Section */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label htmlFor="searchNumber" className="sr-only">
                                Número da solicitação
                            </label>
                            <input
                                id="searchNumber"
                                type="text"
                                placeholder="Ex: SOL-2024-001"
                                value={searchNumber}
                                onChange={(e) => setSearchNumber(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full text-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Search className="w-5 h-5" />
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                </div>

                {/* Results Section */}
                {!error && solicitation && (
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
                        {/* Header do Card */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-6 h-6 text-white" />
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">
                                            {solicitation.id}
                                        </h2>
                                        <p className="text-blue-100">{solicitation.nome}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {getStatusIcon(solicitation.status)}
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(solicitation.status)}`}>
                                        {getStatusText(solicitation.status)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Conteúdo do Card */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Informações Básicas */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                            Informações Básicas
                                        </h3>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm font-medium text-gray-500 dark:text-white">Descrição:</span>
                                                <p className="text-gray-900 dark:text-gray-100">{"Socilitação"}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-500 dark:text-white">Solicitante:</span>
                                                <p className="text-gray-900 dark:text-gray-100">{solicitation.nome}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-500 dark:text-white">Prioridade:</span>
                                                <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getPriorityColor(solicitation.priority)}`}>
                                                    {solicitation.priority === 'high' ? 'Alta' :
                                                        solicitation.priority === 'medium' ? 'Média' : 'Baixa'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Timeline
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Solicitação criada</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-100">{formatDate(solicitation.created_at)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Última atualização</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-100">{formatDate(solicitation.updated_at)}</p>
                                            </div>
                                        </div>
                                        {!solicitation.expected_completion && (
                                            <div className="flex items-start gap-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Conclusão prevista</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-100">
                                                        {solicitation.expected_completion ? formatDate(solicitation.expected_completion) : 'Não definida'}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Observações */}
                            {solicitation.notes && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Observações
                                    </h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700">{solicitation.notes}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Exemplos de números */}
                {/*<div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 mb-2">
                        Para teste, use um destes números:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {mockSolicitations.map((sol) => (
                            <button
                                key={sol.id}
                                onClick={() => setSearchNumber(sol.number)}
                                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                {sol.number}
                            </button>
                        ))}
                    </div>
                </div>*/}
            </div>
        </div>
    );
}