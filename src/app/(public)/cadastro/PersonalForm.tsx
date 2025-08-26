"use client";
import SimpleAnimate from "@/components/SImpleAnimate";
import { useForm } from "@/context";

interface customProps {
  next?: () => void;
  back?: () => void;
}
export default function PersonalForm({ next }: customProps) {
  const {
    formData,
    handleInputChange,
    validationErrors,
    validateForm
  } = useForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (validateForm()) next?.();
  };

  return (
    <SimpleAnimate>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Informações do Perfil
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Preencha suas informações pessoais aqui.
          </p>

          {/* Form onSubmit={handleSubmit} */}
          <div className="p-2">
            <h3 className="mb-4 text-2xl leading-none font-medium text-gray-900 dark:text-white"></h3>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="col-span-2 w-full">
                <label
                  htmlFor="nome"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nome completo
                </label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  value={formData.nome || ""}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Nome completo"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="name@email.com"
                  required
                />
                {validationErrors.email && <span className="error">{validationErrors.email}</span>}
              </div>

              <div>
                <label
                  htmlFor="data_nascimento"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Data de nascimento
                </label>
                <input
                  type="date"
                  name="data_nascimento"
                  id="data_nascimento"
                  value={formData?.data_nascimento || ""}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="**/**/****"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="cpf"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  id="cpf"
                  value={formData.cpf || ""}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="***.***.***-**"
                  required
                />
                {validationErrors.cpf && <span className="error">{validationErrors.cpf}</span>}
              </div>

              <div>
                <label
                  htmlFor="celular"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Celular
                </label>
                <input
                  type="phone"
                  name="celular"
                  id="celular"
                  value={formData?.celular || ""}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="(**) * ****-****"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="escolaridade"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Escolaridade
                </label>
                <select
                  required
                  defaultValue={formData?.escolaridade || ""}
                  onChange={handleInputChange}
                  name="escolaridade"
                  id="escolaridade"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="FundamentalIncompleto">
                    Fundamental incompleto
                  </option>
                  <option value="FundamentalCompleto">Fundamental completo</option>
                  <option value="SuperiorIncompleto">Superior incompleto</option>
                  <option value="SuperiorCompleto">Superior completo</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="genero"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gênero
                </label>
                <select
                  required
                  defaultValue={formData?.genero || ""}
                  onChange={handleInputChange}
                  name="genero"
                  id="genero"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {"Continuar"}
          </button>
        </div>
      </form>
    </SimpleAnimate>
  );
}
