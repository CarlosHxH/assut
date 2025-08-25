import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg'
    text?: string
    fullScreen?: boolean
    className?: string
}

export default function Loading({
    size = 'md',
    text = 'Carregando...',
    fullScreen = false,
    className = ''
}: LoadingProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    }

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600 mx-auto mb-4`} />
                    <p className="text-gray-600 dark:text-gray-400 font-medium">{text}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={`flex items-center justify-center p-8 ${className}`}>
            <div className="text-center">
                <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600 mx-auto mb-2`} />
                <p className="text-gray-600 dark:text-gray-400 text-sm">{text}</p>
            </div>
        </div>
    )
}

// Componente para skeleton loading
export function SkeletonLoader({ className = '' }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
    )
}

// Componente para skeleton de tabela
export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number, columns?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex space-x-4">
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <SkeletonLoader key={colIndex} className="h-4 flex-1" />
                    ))}
                </div>
            ))}
        </div>
    )
}