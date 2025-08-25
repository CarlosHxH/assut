"use client";
import { useForm } from "@/context";

interface customProps {
  next?: () => void;
  back?: () => void;
}
export default function AddressForm({ next, back }: customProps) {
  const { formData, handleInputChange } = useForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    console.log("Dados do formulário:", formData);
    next?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Informações de Endereço
        </h3>
        <h3 className="mb-4 text-2xl leading-none font-medium text-gray-900 dark:text-white"></h3>
        <p className="text-gray-600 dark:text-gray-400">
          Adicione seus dados de endereço aqui.
        </p>
        {/* Form */}
        <div className="p-2">
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="col-span-2 w-full">
              <label
                htmlFor="endereco"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Endereço completo
              </label>
              <input
                type="text"
                name="endereco"
                id="endereco"
                value={formData?.endereco || ""}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Endereço completo"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                id="cidade"
                value={formData.cidade || ""}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Cidade"
                required
              />
            </div>

            <div>
              <label
                htmlFor="cep"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                CEP
              </label>
              <input
                type="text"
                name="cep"
                id="cep"
                value={formData?.cep || ""}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder=""
                required
              />
            </div>

            <div>
              <label
                htmlFor="bairro"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Bairro
              </label>
              <input
                type="text"
                name="bairro"
                id="bairro"
                value={formData.bairro || ""}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder=""
                required
              />
            </div>

            <div>
              <label
                htmlFor="numero"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Número
              </label>
              <input
                type="text"
                name="numero"
                id="numero"
                value={formData?.numero || ""}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder=""
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={back}
          className="rounded-lg border-1 border-gray-400 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          {"Voltar"}
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {"Continuar"}
        </button>
      </div>
    </form>
  );
}
