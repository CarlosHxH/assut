import React from "react";

export interface Step {
  id: string | number;
  label: string;
  shortLabel?: string;
  completed?: boolean;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
  </svg>
);

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  className = "",
}) => {
  const getStepStatus = (index: number) => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "active";
    return "inactive";
  };

  const getStepClasses = (status: string, isLast: boolean, index: number) => {
    const baseClasses = "flex items-center";

    // Determina a cor do conector baseado no status do passo atual
    const isConnectorCompleted = index < currentStep;
    const connectorClasses = isLast
      ? ""
      : `md:w-full after:content-[''] after:w-full after:h-1 after:border-b after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 ${
          isConnectorCompleted
            ? "after:border-blue-600 dark:after:border-blue-500"
            : "after:border-gray-200 dark:after:border-gray-700"
        }`;

    const statusClasses = {
      completed: "text-blue-600 dark:text-blue-500",
      active: "text-blue-600 dark:text-blue-500",
      inactive: "text-gray-500 dark:text-gray-400",
    };

    return `${baseClasses} ${connectorClasses} ${statusClasses[status as keyof typeof statusClasses]}`;
  };

  const getSpanClasses = (isLast: boolean) => {
    const baseClasses = "flex items-center";
    const separatorClasses = isLast
      ? ""
      : "after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500";

    return `${baseClasses} ${separatorClasses}`;
  };

  return (
    <ol
      className={`flex w-full items-center text-center text-sm font-medium text-gray-500 sm:text-base dark:text-gray-400 ${className}`}
    >
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isLast = index === steps.length - 1;
        const isCompleted = status === "completed";

        return (
          <li key={step.id} className={getStepClasses(status, isLast, index)}>
            <span className={getSpanClasses(isLast)}>
              {isCompleted ? (
                <CheckIcon className="me-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ) : (
                <span className="me-2">{index + 1}</span>
              )}
              {step.label}
              {step.shortLabel && (
                <span className="hidden sm:ms-2 sm:inline-flex">
                  {step.shortLabel}
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
};
/*
// Exemplo de uso
const App: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps: Step[] = [
    { id: 1, label: "Personal", shortLabel: "Info" },
    { id: 2, label: "Account", shortLabel: "Info" },
    { id: 3, label: "Confirmation" }
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Stepper Component Example
        </h2>
        
        <Stepper 
          steps={steps} 
          currentStep={currentStep}
          className="mb-8" 
        />

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
          >
            Anterior
          </button>
          
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            Próximo
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Passo atual: {currentStep + 1}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {steps[currentStep]?.label} {steps[currentStep]?.shortLabel}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
*/
