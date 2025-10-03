"use client"
import AppBar from "@/components/Appbar";
import StepperProgress from "@/components/StepperProgress";
import { useForm } from "@/context";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const { formData, setFormData, handlerSubmit } = useForm();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Dados do formulário:', formData);
    router.push('/payment')
    handlerSubmit();
  };

  return (
    <>
      <AppBar />

      <div className="px-40">
        <h1 className="my-5 text-2xl font-bold leading-none text-gray-900">ASSUT-MT</h1>
      </div>

      <StepperProgress>
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-2">

          <h3 className="mb-4 text-2xl font-medium leading-none text-gray-900">
            Informações pessoais
          </h3>

          <div className="grid gap-4 mb-4 grid-cols-2">

            <div className="w-full col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nome completo
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.nome}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nome completo"
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
                value={formData.email || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@email.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="data_nascimento"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Data de nascimento
              </label>
              <input
                type="date"
                name="data_nascimento"
                id="data_nascimento"
                value={formData?.data_nascimento || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="**/**/****"
                required
              />
            </div>

            <div>
              <label
                htmlFor="cpf"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                CPF
              </label>
              <input
                type="text"
                name="cpf"
                id="cpf"
                value={formData.cpf || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="***.***.***-**"
                required
              />
            </div>

            <div>
              <label
                htmlFor="celular"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Celular
              </label>
              <input
                type="phone"
                name="celular"
                id="celular"
                value={formData?.celular || ""}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="(**) * ****-****"
                required
              />
            </div>

            <div>
              <label htmlFor="escolaridade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Escolaridade</label>
              <select required defaultValue={formData?.escolaridade} name="escolaridade" id="escolaridade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Selecione</option>
                <option value="FundamentalIncompleto">Fundamental incompleto</option>
                <option value="FundamentalCompleto">Fundamental completo</option>
                <option value="SuperiorIncompleto">Superior incompleto</option>
                <option value="SuperiorCompleto">Superior completo</option>
              </select>
            </div>

            <div>
              <label htmlFor="genero" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gênero</label>
              <select required defaultValue={formData?.genero} name="genero" id="genero" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

          </div>



        </form>
      </StepperProgress>
    </>
  );
}