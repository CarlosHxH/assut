import React from "react";

// Tipos para o StepperItem
interface StepperItemProps {
  isCompleted: boolean;
  isActive: boolean;
  icon: React.ReactNode;
  hasNextStep?: boolean;
}

const StepperItem: React.FC<StepperItemProps> = ({
  isCompleted,
  isActive,
  icon,
  hasNextStep = true,
}) => {
  const baseClasses =
    "flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0";
  const activeClasses = isCompleted
    ? "bg-blue-100 dark:bg-blue-800"
    : isActive
      ? "bg-blue-100 dark:bg-blue-800"
      : "bg-gray-100 dark:bg-gray-700";

  const afterClasses = hasNextStep
    ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block " +
    (isCompleted
      ? "after:border-blue-100 dark:after:border-blue-800"
      : "after:border-gray-100 dark:after:border-gray-700")
    : "";

  const iconClasses =
    isCompleted || isActive
      ? "w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
      : "w-4 h-4 text-gray-500 lg:w-6 lg:h-6 dark:text-gray-400";

  return (
    <li
      className={`flex items-center ${hasNextStep ? "w-full" : ""} ${isCompleted || isActive ? "text-blue-600 dark:text-blue-500" : ""} ${afterClasses}`}
    >
      <div className={`${baseClasses} ${activeClasses}`}>
        <div className={iconClasses}>{icon}</div>
      </div>
    </li>
  );
};

// Tipos para o Step
export interface Step {
  id: string | number;
  icon: React.JSX.Element | React.ReactNode;
  label?: string;
}

// Props do Stepper reutilizável
export interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

// Componente Stepper reutilizável
export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  className = "",
}) => {
  return (
    <ol className={`mb-4 flex w-full items-center sm:mb-5 ${className}`}>
      {steps.map((step, index) => (
        <StepperItem
          key={step.id}
          isCompleted={currentStep > index + 1}
          isActive={currentStep === index + 1}
          icon={step.icon}
          hasNextStep={index < steps.length - 1}
        />
      ))}
    </ol>
  );
};

// Props para o componente com navegação
export interface StepperWithNavigationProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  children: React.ReactNode;
  backButtonText?: string;
  nextButtonText?: string;
  finishButtonText?: string;
  className?: string;
  hideBackButton?: boolean;
  hideNextButton?: boolean;
  customButtons?: React.ReactNode;
}

// Componente Stepper com navegação (mais completo)
const StepperWithNavigation: React.FC<StepperWithNavigationProps> = ({
  steps,
  currentStep,
  onStepChange,
  children,
  backButtonText = "Voltar",
  nextButtonText = "Continuar",
  finishButtonText = "Finalizar",
  className = "",
  hideBackButton = false,
  hideNextButton = false,
  customButtons,
}) => {
  const handleBackStep = () => {
    if (currentStep > 1) onStepChange(currentStep - 1);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) onStepChange(currentStep + 1);
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length;

  return (
    <div className={`mx-auto max-w-2xl p-6 ${className}`}>
      {/* Stepper */}
      <Stepper steps={steps} currentStep={currentStep} />

      {/* Conteúdo do step atual */}
      {children}

      {/* Botões de navegação */}
      {customButtons || (
        <div className="flex justify-end gap-2">
          {!hideBackButton && !isFirstStep && (
            <button
              type="button"
              onClick={handleBackStep}
              className="rounded-lg border-1 border-gray-400 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              {backButtonText}
            </button>
          )}
          {!hideNextButton && (
            <button
              onClick={handleNextStep}
              type="submit"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLastStep ? finishButtonText : nextButtonText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
export default StepperWithNavigation;
/*
// Exemplo de uso básico
const BasicStepperExample: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps: Step[] = [
    {
      id: "profile",
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 16"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
        </svg>
      ),
      label: "Perfil"
    },
    {
      id: "payment",
      icon: (
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
      label: "Pagamento"
    },
    {
      id: "confirmation",
      icon: (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
        </svg>
      ),
      label: "Confirmação"
    }
  ];

  const getStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Informações do Perfil
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Preencha suas informações pessoais aqui.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Informações de Pagamento
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Adicione seus dados de pagamento aqui.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Confirmação
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Revise e confirme suas informações.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Stepper Reutilizável
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Exemplo de uso do componente Stepper
        </p>
      </div>

      {/* Exemplo 1: Stepper com navegação completa * /}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Com Navegação Automática:
        </h2>
        <StepperWithNavigation
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        >
          {getStepContent(currentStep)}
        </StepperWithNavigation>
      </div>

      {/* Exemplo 2: Stepper básico (apenas visual) * /}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Apenas Visual:
        </h2>
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg border">
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              ←
            </button>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded">
              Passo {currentStep} de {steps.length}
            </span>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BasicStepperExample;
*/
