"use client"
import React, { useState } from 'react';

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface StepperItemProps {
    isCompleted: boolean;
    isActive: boolean;
    icon: React.ReactNode;
    hasNextStep?: boolean;
}

const StepperItem: React.FC<StepperItemProps> = ({ isCompleted, isActive, icon, hasNextStep = true }) => {
    const baseClasses = "flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0";
    const activeClasses = isCompleted || isActive
        ? "bg-blue-100 dark:bg-blue-800"
        : "bg-gray-100 dark:bg-gray-700";

    const completed = isCompleted ? "after:border-blue-100 dark:after:border-blue-800" : "after:border-gray-600 dark:after:border-gray-700";
    const afterClasses = hasNextStep ? `safter:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${completed}` : "";

    return (
        <li className={`flex items-center ${hasNextStep ? 'w-full' : ''} ${afterClasses}`}>
            <div className={`${baseClasses} ${activeClasses}`}>
                {icon}
            </div>
        </li>
    );
};

const StepperProgress: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validação básica
        if (formData.password !== formData.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        // Aqui você pode adicionar a lógica para enviar os dados
        console.log('Dados do formulário:', formData);

        // Navegar para a próxima etapa (Payment Info)
        // router.push('/payment') - se estiver usando Next.js router
    };

    const stepperIcons = {
        profile: (
            <svg
                className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
            >
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
            </svg>
        ),
        payment: (
            <svg
                className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
            >
                <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
            </svg>
        ),
        confirmation: (
            <svg
                className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
            >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
            </svg>
        )
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* Stepper */}
            <ol className="flex items-center w-full mb-4 sm:mb-5">
                <StepperItem
                    isCompleted={true}
                    isActive={true}
                    icon={stepperIcons.profile}
                    hasNextStep={true}
                />
                <StepperItem
                    isCompleted={true}
                    isActive={true}
                    icon={stepperIcons.payment}
                    hasNextStep={true}
                />
                <StepperItem
                    isCompleted={false}
                    isActive={false}
                    icon={stepperIcons.confirmation}
                    hasNextStep={false}
                />
            </ol>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
                    Invoice details
                </h3>

                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="username.example"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="•••••••••"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Confirm password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirm-password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="•••••••••"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Next Step: Payment Info
                </button>
            </form>
        </div>
    );
};

export default StepperProgress;