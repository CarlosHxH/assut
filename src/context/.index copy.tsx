import React, { ReactNode, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

export const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};
// Função para aplicar máscara de telefone
export const phoneMask = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove todos os caracteres não numéricos
    .replace(/(\d{2})(\d)/, "($1) $2") // Adiciona parênteses no DDD e espaço
    .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona hífen antes dos últimos 4 dígitos
    .replace(/(-\d{4})\d+?$/, "$1"); // Limita a 11 dígitos no total
};

export interface PersonData {
  nome?: string;
  data_nascimento?: string;
  cpf?: string;
  telefone?: string;
  genero?: "Masculino" | "Feminino" | "Outro";
  celular?: string | null;
  escolaridade?:
  | "Fundamental incompleto"
  | "Fundamental completo"
  | "Superior incompleto"
  | "Superior completo";
  cep?: string;
  endereco?: string | null;
  numero?: string;
  complemento?: string | null;
  bairro?: string;
  cidade?: string;
  foto?: string | null;
  comprovante?: string | null;
  senha?: string;
  email?: string;
  rua?: string;
  estado?: string;
}

interface FormContextType {
  formData: PersonData;
  setFormData: React.Dispatch<React.SetStateAction<PersonData>>;
  handlerSubmit: (callback?: () => void) => Promise<void>;
  status: boolean;
  isSubmiting: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormProviderProps {
  children: ReactNode;
}

export const FormContext = React.createContext<FormContextType | null>(null);

export const useForm = (): FormContextType => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useform deve ser usado dentro de um FormProvider");
  }
  return context;
};

export function FormProvider({ children }: FormProviderProps): React.ReactNode {
  const [formData, setFormData] = React.useState<PersonData>({});
  const [status, setStatus] = React.useState<boolean>(false);
  const [isSubmiting, setSubmiting] = React.useState<boolean>(false);

  const handlerSubmit = async (callback?: () => void): Promise<void> => {
    try {
      const response: AxiosResponse = await axios.post("#", {
        nome: "Carlos",
        data_nascimento: "1960-02-10",
        cpf: "111.111.111-11",
        telefone: "(11) 11111-1111",
        genero: "M",
        celular: null,
        escolaridade: "S",
        cep: "78048225",
        endereco: null,
        numero: "100",
        complemento: null,
        bairro: "Jardim Bom Clima",
        cidade: "Cuiabá",
        foto: null,
        comprovante: null,
        senha: "pjbwMLrz",
        email: "email@gmail.com",
        rua: "Rua das Brisas",
        estado: "MT",
      });

      console.log(response);
      setStatus(true);

      if (callback) {
        callback();
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      setStatus(false);

      if (callback) {
        callback();
      }
    }

    try {
      if (!process.env.REACT_APP_URL_SERVER)
        throw new Error(
          "Url do servidor não declarada nas variaveis de ambiente.",
        );
      setSubmiting(true);
      await axios.post(process.env.REACT_APP_URL_SERVER, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });

      setStatus(true);
      console.log(formData);
    } catch (error) {
      console.log(error);
      setStatus(false);
      console.log(formData);
    } finally {
      setSubmiting(false);
      if (callback) callback();
    }
  };

  useEffect(() => {
    if (Object.keys(formData).length != 0) {
      const data = JSON.parse(localStorage.getItem('formApp') || '{}');
      setFormData((prev) => ({ ...prev, ...data }));
      localStorage.setItem('formApp', JSON.stringify(data));
    }
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "cpf") newValue = cpfMask(value);
    if (name === "celular") newValue = phoneMask(value);

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const contextValue: FormContextType = {
    formData,
    setFormData,
    handlerSubmit,
    status,
    isSubmiting,
    handleInputChange,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}{JSON.stringify(formData)}</FormContext.Provider>
  );
}
