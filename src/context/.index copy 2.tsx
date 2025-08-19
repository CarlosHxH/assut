import supabase from "@/lib/supabase";
import React, { ReactNode, useEffect } from "react";
//import axios, { AxiosResponse, AxiosError } from "axios";

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

// Função para aplicar máscara de CEP
export const cepMask = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove todos os caracteres não numéricos
    .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona hífen após os primeiros 5 dígitos
    .replace(/(-\d{3})\d+?$/, "$1"); // Limita a 8 dígitos no total
};

export interface PersonData {
  nome?: string;
  data_nascimento?: string;
  cpf?: string;
  telefone?: string;
  genero?: "Masculino" | "Feminino" | "Outro";
  //celular?: string | null;
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
  //comprovante?: string | null;
  //senha?: string;
  email?: string;
  //rua?: string;
  //estado?: string;
}

interface FormContextType {
  formData: PersonData;
  setFormData: React.Dispatch<React.SetStateAction<PersonData>>;
  handlerSubmit: (callback?: () => void) => Promise<{ id: string }>;
  status: boolean;
  isSubmiting: boolean;
  error: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  resetForm: () => void;
}

interface FormProviderProps {
  children: ReactNode;
}

export const FormContext = React.createContext<FormContextType | null>(null);

export const useForm = (): FormContextType => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useForm deve ser usado dentro de um FormProvider");
  }
  return context;
};

export function FormProvider({ children }: FormProviderProps): React.ReactNode {
  const [formData, setFormData] = React.useState<PersonData>({});
  const [status, setStatus] = React.useState<boolean>(false);
  const [isSubmiting, setSubmiting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  // Função para carregar dados do localStorage
  const loadFromStorage = () => {
    try {
      const savedData = localStorage.getItem('formApp');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      }
    } catch (err) {
      console.error('Erro ao carregar dados do localStorage:', err);
    }
  };

  // Função para salvar dados no localStorage
  const saveToStorage = (data: PersonData) => {
    try {
      localStorage.setItem('formApp', JSON.stringify(data));
    } catch (err) {
      console.error('Erro ao salvar dados no localStorage:', err);
    }
  };

  const handlerSubmit = async (callback?: () => void) => {
    setSubmiting(true);
    setError(null);

    try {
      // Validação básica
      if (!formData.nome || !formData.email) {
        throw new Error('Nome e email são obrigatórios');
      }

      /*if (!process.env.REACT_APP_URL_SERVER || process.env.REACT_APP_URL_SERVER === "") {
        throw new Error('URL do servidor não declarada nas variáveis de ambiente.');
      }*/

      // Prepara os dados para envio
      const dataToSend = {
        ...formData,
        // Converte formato de gênero se necessário
        genero: formData.genero === 'Masculino' ? 'M' : formData.genero === 'Feminino' ? 'F' : 'O',
        // Converte formato de escolaridade se necessário
        escolaridade: formData.escolaridade?.charAt(0) || '',
      };


      //const supabase = await createClient();

      const { data, error } = await supabase
        .from('customers')
        .insert(dataToSend).select();


      /*
      const response: AxiosResponse = await axios.post(
        process.env.REACT_APP_URL_SERVER || "/api/v1/cadastro",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      );
      */
      setStatus(true);

      // Remove dados do localStorage após sucesso (opcional)
      //localStorage.removeItem('formApp');

      if (error) {
        console.error('Error inserting data:', error.message);
      } else {
        // 'data' will be an array containing the newly inserted row(s),
        // including the auto-generated ID.
        const insertedRow = data[0]; // Assuming you inserted a single row
        const newId = insertedRow.id; // Access the ID property
        console.log('Successfully inserted row with ID:', newId);
        return { id: newId }
      }
      return { id: "" }
    } catch (error: unknown) {
      const errorMessage = 'Erro ao enviar formulário';
      /*
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Erro de resposta do servidor
        errorMessage = `Erro ${axiosError.response.status}: ${axiosError.response.statusText}`;
      } else if (axiosError.request) {
        // Erro de rede
        errorMessage = 'Erro de conexão. Verifique sua internet.';
      } else if (error instanceof Error) {
        // Outros erros
        errorMessage = error.message;
      }*/

      console.error('Erro no envio:', error);
      setError(errorMessage);
      setStatus(false);
    } finally {
      setSubmiting(false);
      if (callback) {
        callback();
      }
    }
  };

  // Carrega dados do localStorage ao montar o componente
  useEffect(() => {
    loadFromStorage();
  }, []);

  // Salva dados no localStorage quando formData muda
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      saveToStorage(formData);
    }
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    // Aplica máscaras conforme o campo
    if (name === "cpf") newValue = cpfMask(value);
    if (name === "celular" || name === "telefone") newValue = phoneMask(value);
    if (name === "cep") newValue = cepMask(value);

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Limpa erro quando usuário começa a digitar
    if (error) setError(null);
  };

  const resetForm = () => {
    setFormData({});
    setStatus(false);
    setError(null);
    localStorage.removeItem('formApp');
  };

  const contextValue: FormContextType = {
    formData,
    setFormData,
    handlerSubmit,
    status,
    isSubmiting,
    error,
    handleInputChange,
    resetForm,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
}