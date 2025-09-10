"use client";
import React, { useState } from "react";
import { Step } from "@/components/StepperProgress";
import PersonalForm from "./PersonalForm";
import AddressForm from "./AddressForm";
import DocumentForm from "./DocumentForm";
import { IdCard, IdCardLanyard, MapPinHouse, X } from "lucide-react";
import StepperWithNavigation from "@/components/StepperProgress";
import { useForm } from "@/context";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "flowbite-react";
import SimpleAnimate from "@/components/SImpleAnimate";

const App: React.FC = () => {
  const router = useRouter();
  const { error, handlerSubmit, clearError, isSubmiting } = useForm();

  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    handlerSubmit().then((data: { success: boolean; id: string }) => {
      console.log(data);
      if (data.success) {
        router.push(`/cadastro/success/${data.id}`);
      }
    });
  }

  const steps: Step[] = [
    { id: "profile", icon: <IdCard />, label: "Perfil" },
    { id: "payment", icon: <MapPinHouse />, label: "Pagamento" },
    { id: "confirmation", icon: <IdCardLanyard />, label: "Confirmação" },
  ];

  const getStepContent = (step: number) => {
    switch (step) {
      case 1: return <PersonalForm next={() => setCurrentStep(2)} />;
      case 2: return <AddressForm back={() => setCurrentStep(1)} next={() => setCurrentStep(3)} />;
      case 3: return <DocumentForm back={() => setCurrentStep(2)} next={() => setCurrentStep(4)} />;
      case 4: return <SubmitPage />;
      default: return null;
    }
  };

  const SubmitPage = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="p-5 bg-gray-200 dark:bg-gray-500/50 rounded-xl">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Enviar Solicitação</h2>
            <div className="text-center"></div>
          </div>
          <div className="flex justify-end gap-2">
            {error && <Button color={"gray"} onClick={() => setCurrentStep(1)}>Voltar</Button>}
            <Button type="submit" disabled={isSubmiting || !!error} className="gap-3">
              {isSubmiting && <Spinner size="md" />} {"Solicitar"}
            </Button>
          </div>
        </div>
      </form>
    )
  }

  return (
    <SimpleAnimate>
      <div className="min-h-screen space-y-8 bg-white dark:bg-gray-900">
        <div>
          {error && (
            <div id="toast-top-right" className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-red-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm top-5 right-5 dark:text-red-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
              {error}
              <button className="text-white ms-auto hover:bg-gray-700 rounded-4xl"><X /></button>
            </div>
          )}
          <StepperWithNavigation
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            customButtons={true}
          >
            {getStepContent(currentStep)}
          </StepperWithNavigation>
        </div>

        {/* Controles de demonstração */}
        {/*<div className="mt-8 text-center">
        <div className="inline-flex gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <button
            onClick={() => setCurrentStep(1)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${currentStep === 1
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            Passo 1
          </button>
          <button
            onClick={() => setCurrentStep(2)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${currentStep === 2
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            Passo 2
          </button>
          <button
            onClick={() => setCurrentStep(3)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${currentStep === 3
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            Passo 3
          </button>
        </div>
      </div>*/}

      </div >
    </SimpleAnimate>
  );
};
export default App;