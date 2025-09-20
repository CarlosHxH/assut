import React, { useState } from 'react';

interface StepperItemProps {
    isCompleted: boolean;
    isActive: boolean;
    icon: React.ReactNode;
    hasNextStep?: boolean;
}

const StepperItem: React.FC<StepperItemProps> = ({ isCompleted, isActive, icon, hasNextStep = true }) => {
    const baseClasses = "flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0";
    const activeClasses = isCompleted
        ? "bg-blue-100 dark:bg-blue-800"
        : isActive
            ? "bg-blue-100 dark:bg-blue-800"
            : "bg-gray-100 dark:bg-gray-700";

    const afterClasses = hasNextStep
        ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block " +
        (isCompleted ? "after:border-blue-100 dark:after:border-blue-800" : "after:border-gray-100 dark:after:border-gray-700")
        : "";

    const iconClasses = isCompleted || isActive
        ? "w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
        : "w-4 h-4 text-gray-500 lg:w-6 lg:h-6 dark:text-gray-400";

    return (
        <li className={`flex items-center ${hasNextStep ? 'w-full' : ''} ${isCompleted || isActive ? 'text-blue-600 dark:text-blue-500' : ''} ${afterClasses}`}>
            <div className={`${baseClasses} ${activeClasses}`}>
                <div className={iconClasses}>
                    {icon}
                </div>
            </div>
        </li>
    );
};


const InvoiceDetailsForm = ({ children }: { children: React.ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<number>(1);

    function onBackStep() {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    }

    function onNextStep() {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    }

    const stepperIcons = {
        profile: (
            <svg
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
                    isCompleted={currentStep > 1}
                    isActive={currentStep === 1}
                    icon={stepperIcons.profile}
                    hasNextStep={true}
                />
                <StepperItem
                    isCompleted={currentStep > 2}
                    isActive={currentStep === 2}
                    icon={stepperIcons.payment}
                    hasNextStep={true}
                />
                <StepperItem
                    isCompleted={currentStep > 3}
                    isActive={currentStep === 3}
                    icon={stepperIcons.confirmation}
                    hasNextStep={false}
                />
            </ol>

            {children}

            <div className='flex justify-end gap-2'>
                {currentStep > 1 &&
                    <button
                        type='button'
                        onClick={onBackStep}
                        className="text-gray-500 bg-white border-1 border-gray-400 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Voltar
                    </button>
                }
                {
                    Object.keys(stepperIcons).length >= currentStep &&
                    <button
                        onClick={onNextStep}
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {Object.keys(stepperIcons).length > currentStep ? "Continuar" : "Finalizar"}
                    </button>
                }

            </div>
        </div >
    );
};

export default InvoiceDetailsForm;