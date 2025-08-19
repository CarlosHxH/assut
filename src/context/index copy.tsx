import { PersonData } from "@/lib/database.types";
import supabase from "@/lib/supabase";
import React, { ReactNode, useEffect } from "react";

export const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

// Função para aplicar máscara de telefone
export const phoneMask = (value: string): string => {
  return value
    .replace(/\D/g, "") // Remove todos os caracteres não numéricos
    .replace(/(\d{2})(\d)/, "($1) $2") // Adiciona parênteses no DDD e espaço
    .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona hífen antes dos últimos 4 dígitos
    .replace(/(-\d{4})\d+?$/, "$1"); // Limita a 11 dígitos no total
};

// Função para aplicar máscara de CEP
export const cepMask = (value: string): string => {
  return value
    .replace(/\D/g, "") // Remove todos os caracteres não numéricos
    .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona hífen após os primeiros 5 dígitos
    .replace(/(-\d{3})\d+?$/, "$1"); // Limita a 8 dígitos no total
};

// Função para criar um PersonData padrão
const createDefaultPersonData = (): PersonData => ({
  // Required fields
  status: 'pending',
  priority: 'medium',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  nome: undefined,
  data_nascimento: undefined,
  cpf: undefined,
  celular: undefined,
  genero: undefined,
  escolaridade: undefined,
  cep: undefined,
  endereco: undefined,
  numero: undefined,
  complemento: undefined,
  bairro: undefined,
  cidade: undefined,
  foto: undefined,
  email: undefined,
  expected_completion: undefined,
  notes: undefined
});

interface FormContextType {
  formData: PersonData;
  setFormData: React.Dispatch<React.SetStateAction<PersonData>>;
  handlerSubmit: (callback?: () => void) => Promise<{ id: string; success: boolean; error?: string }>;
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
  // Inicializa com um objeto PersonData válido
  const [formData, setFormData] = React.useState<PersonData>(createDefaultPersonData());
  const [status, setStatus] = React.useState<boolean>(false);
  const [isSubmiting, setSubmiting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  // Função para carregar dados do localStorage
  const loadFromStorage = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedData = localStorage.getItem('formAppAssut');
        if (savedData) {
          const parsedData = JSON.parse(savedData) as PersonData;
          // Merge com defaults para garantir que todas as propriedades existam
          setFormData(prevData => ({ ...createDefaultPersonData(), ...parsedData }));
        }
      }
    } catch (err) {
      console.error('Erro ao carregar dados do localStorage:', err);
    }
  };

  // Função para salvar dados no localStorage
  const saveToStorage = (data: PersonData) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('formAppAssut', JSON.stringify(data));
      }
    } catch (err) {
      console.error('Erro ao salvar dados no localStorage:', err);
    }
  };

  const handlerSubmit = async (callback?: () => void): Promise<{ id: string; success: boolean; error?: string }> => {
    setSubmiting(true);
    setError(null);

    try {
      // Validação básica
      if (!formData.nome || !formData.email) {
        throw new Error('Nome e email são obrigatórios');
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Email deve ter um formato válido');
      }

      // Prepara os dados para envio
      const dataToSend = {
        ...formData,
        // Atualiza timestamp
        updated_at: new Date().toISOString()
      };

      const { data, error: supabaseError } = await supabase
        .from('customers')
        .insert([dataToSend])
        .select()
        .single();

      if (supabaseError) {
        console.error('Error inserting data:', supabaseError.message);
        throw new Error(`Erro ao salvar dados: ${supabaseError.message}`);
      }

      if (data && data.id) {
        console.log('Successfully inserted row with ID:', data.id);
        setStatus(true);

        // Remove dados do localStorage após sucesso (opcional)
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.removeItem('formAppAssut');
        }

        return {
          id: data.id,
          success: true
        };
      } else {
        throw new Error('Erro: dados não foram salvos corretamente');
      }

    } catch (error: unknown) {
      let errorMessage = 'Erro ao enviar formulário';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error('Erro no envio:', error);
      setError(errorMessage);
      setStatus(false);

      return {
        id: "",
        success: false,
        error: errorMessage
      };
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

  // Salva dados no localStorage quando formData muda (mas não na primeira renderização)
  useEffect(() => {
    // Só salva se não for o estado inicial (evita salvar o default)
    const defaultData = createDefaultPersonData();
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(defaultData);

    if (hasChanges) {
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

    // Agora o tipo está correto porque formData sempre é um PersonData válido
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
      updated_at: new Date().toISOString() // atualiza timestamp
    }));

    // Limpa erro quando usuário começa a digitar
    if (error) setError(null);
  };

  const resetForm = () => {
    setFormData(createDefaultPersonData());
    setStatus(false);
    setError(null);

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('formAppAssut');
      }
    } catch (err) {
      console.error('Erro ao limpar localStorage:', err);
    }
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