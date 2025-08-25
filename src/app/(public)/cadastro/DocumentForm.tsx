"use client";
import WebcamCapture from "@/components/WebcamCapture";
import { CustomButtons } from "@/components/StepperProgress";
import { useForm } from "@/context";

interface customProps {
  next?: () => void;
  back?: () => void;
}

export default function DocumentForm({ next, back }: customProps) {
  const { formData, error, setFormData } = useForm();

  return (
    <form>
      <div className="mb-6 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Confirmação
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Tire uma foto
        </p>
        {/* Form */}
        <div className="p-2">
          <h3 className="mb-4 text-2xl leading-none font-medium text-gray-900 dark:text-white"></h3>
          <WebcamCapture captured={formData.foto || ""} onCapture={(e) => setFormData(prev => ({ ...prev, foto: e }))} />
        </div>
      </div>
      <CustomButtons next={next} back={back} />
    </form>
  );
}