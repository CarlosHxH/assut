import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
<<<<<<< HEAD
=======

export function formatCPF(cpf: string): string {
    const cleaned = cpf.replace(/\D/g, '')
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export function formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
}

export function formatDateTime(date: string): string {
    return new Date(date).toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}

export function getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
        case 'ativo':
        case 'published':
        case 'resolved':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        case 'pendente':
        case 'draft':
        case 'investigating':
        case 'open':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
        case 'inativo':
        case 'suspenso':
        case 'dismissed':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
}

export function getPriorityColor(priority: string): string {
    switch (priority.toLowerCase()) {
        case 'high':
        case 'alta':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        case 'medium':
        case 'normal':
        case 'média':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
        case 'low':
        case 'baixa':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func(...args), delay)
    }
}

export function filterData<T>(
    data: T[],
    searchTerm: string,
    statusFilter: string,
    statusKey: keyof T = 'status' as keyof T
): T[] {
    return data.filter(item => {
        const matchesSearch = searchTerm === '' ||
            Object.values(item as any).some(value =>
                value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        const matchesStatus = statusFilter === 'all' ||
            (item[statusKey] as any) === statusFilter
        return matchesSearch && matchesStatus
    })
}

export function generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function validateCPF(cpf: string): boolean {
    const cleaned = cpf.replace(/\D/g, '')
    if (cleaned.length !== 11 || /^(.)\1{10}$/.test(cleaned)) return false

    let sum = 0
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleaned.charAt(i)) * (10 - i)
    }
    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleaned.charAt(9))) return false

    sum = 0
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleaned.charAt(i)) * (11 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleaned.charAt(10))) return false

    return true
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + '...'
}
>>>>>>> parent of 351f9ec (Auth page)
