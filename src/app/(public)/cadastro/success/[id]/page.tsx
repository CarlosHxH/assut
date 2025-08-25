'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SolicitationSuccess() {
    const params = useParams<{ id: string; }>();
    const [solicitionNumber, setSolicitionNumber] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Generate solicitation number only on client side
        setSolicitionNumber(`SOL-${params.id.toString().substr(0, 8).toUpperCase()}`);
        setIsClient(true);
    }, [params]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    {/* Ícone de sucesso */}
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                        <svg
                            className="h-10 w-10 text-green-600 dark:text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    {/* Título principal */}
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Solicitação Enviada com Sucesso!
                    </h1>

                    {/* Subtítulo */}
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        Sua solicitação foi recebida e está sendo processada.
                        Você receberá uma confirmação por email em breve.
                    </p>
                </div>

                {/* Card de informações */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Número da Solicitação:
                        </span>
                        <span className="text-sm font-mono text-gray-900 dark:text-white bg-white dark:bg-gray-700 px-3 py-1 rounded">
                            {isClient ? `#${solicitionNumber}` : '#SOL-...'}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Data:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white">
                            {isClient ? new Date().toLocaleDateString('pt-BR') : '--/--/----'}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Status:
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                            Em Processamento
                        </span>
                    </div>
                </div>

                {/* Próximos passos */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Próximos Passos:
                    </h2>

                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                                <div className="h-2 w-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                            </div>
                            <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                                Verificaremos sua solicitação em até 24 horas
                            </p>
                        </li>

                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                                <div className="h-2 w-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                            </div>
                            <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                                Você receberá um email de confirmação
                            </p>
                        </li>

                        <li className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                                <div className="h-2 w-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                            </div>
                            <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                                Entraremos em contato caso precisemos de informações adicionais
                            </p>
                        </li>
                    </ul>
                </div>

                {/* Botões de ação */}
                <div className="space-y-3">
                    <Link href="/">
                        <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-colors duration-200">
                            Voltar ao Início
                        </button>
                    </Link>

                    <Link href="/cadastro/solicitations">
                        <button className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-colors duration-200">
                            Ver Minhas Solicitações
                        </button>
                    </Link>
                </div>

                {/* Informações de contato */}
                <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Precisa de ajuda?{' '}
                        <Link href="/contato" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                            Entre em contato conosco
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}