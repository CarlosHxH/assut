import { PersonData } from "@/lib/database.types";
import supabase from "@/lib/supabase";
import React, { ReactNode, useEffect, useCallback, useMemo } from "react";

// Input mask utilities
export const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const phoneMask = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

export const cepMask = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, "");
  if (cleanCPF.length !== 11) return false;

  // Check for repeated digits
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Validate CPF algorithm
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false;

  return true;
};

// Create default person data
const createDefaultPersonData = (): PersonData => ({
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

// Types
interface FormContextType {
  formData: PersonData;
  setFormData: React.Dispatch<React.SetStateAction<PersonData>>;
  handlerSubmit: (callback?: () => void) => Promise<{ id: string; success: boolean; error?: string }>;
  status: boolean;
  isSubmiting: boolean;
  error: string | null;
  validationErrors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  resetForm: () => void;
  validateForm: () => boolean;
  clearError: () => void;
}

interface FormProviderProps {
  children: ReactNode;
  storageKey?: string;
  autoSave?: boolean;
}

// Constants
const STORAGE_KEY = 'formAppAssut';
const DEBOUNCE_DELAY = 500;

export const FormContext = React.createContext<FormContextType | null>(null);

export const useForm = (): FormContextType => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useForm deve ser usado dentro de um FormProvider");
  }
  return context;
};

// Storage utilities
const storageUtils = {
  save: (key: string, data: PersonData): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
    }
  },

  load: (key: string): PersonData | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedData = localStorage.getItem(key);
        if (savedData) {
          return JSON.parse(savedData) as PersonData;
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
    }
    return null;
  },

  remove: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
    }
  }
};

export function FormProvider({
  children,
  storageKey = STORAGE_KEY,
  autoSave = true
}: FormProviderProps): React.ReactNode {

  const [formData, setFormData] = React.useState<PersonData>(createDefaultPersonData());
  const [status, setStatus] = React.useState<boolean>(false);
  const [isSubmiting, setSubmiting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = storageUtils.load(storageKey);
    if (savedData) {
      setFormData((prevData: PersonData) => ({ ...prevData, ...createDefaultPersonData(), ...savedData }));
    }
  }, [storageKey]);

  // Auto-save to localStorage with debounce
  useEffect(() => {
    if (!autoSave) return;

    const defaultData = createDefaultPersonData();
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(defaultData);

    if (hasChanges) {
      const timeoutId = setTimeout(() => {
        storageUtils.save(storageKey, formData);
      }, DEBOUNCE_DELAY);

      return () => clearTimeout(timeoutId);
    }
  }, [formData, storageKey, autoSave]);

  // Form validation
  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.nome?.trim()) {
      errors.nome = 'Nome é obrigatório';
    }

    if (!formData.email?.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Email deve ter um formato válido';
    }

    if (formData.cpf && !validateCPF(formData.cpf)) {
      errors.cpf = 'CPF inválido';
    }

    if (formData.celular) {
      const cleanPhone = formData.celular.replace(/\D/g, "");
      if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        errors.celular = 'Telefone deve ter 10 ou 11 dígitos';
      }
    }

    if (formData.cep) {
      const cleanCep = formData.cep.replace(/\D/g, "");
      if (cleanCep.length !== 8) {
        errors.cep = 'CEP deve ter 8 dígitos';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Submit handler with improved error handling
  const handlerSubmit = useCallback(async (callback?: () => void): Promise<{ id: string; success: boolean; error?: string }> => {
    setSubmiting(true);
    setError(null);
    setValidationErrors({});

    try {
      // Validate form first
      if (!validateForm()) {
        throw new Error('Por favor, corrija os erros no formulário');
      }

      const dataToSend = {
        ...formData,
        updated_at: new Date().toISOString()
      };


      // Check for existing records
      const { data: existingData, error: checkError } = await supabase
        .from('customers')
        .select('id, email, cpf')
        .or(`email.eq.${formData.email},cpf.eq.${formData.cpf}`);

      console.log("Select", existingData);

      if (checkError) {
        throw new Error(`Erro ao verificar dados existentes: ${checkError.message}`);
      }

      if (existingData && existingData.length > 0) {
        const emailExists = existingData.some(item => item.email === formData.email);
        const cpfExists = existingData.some(item => item.cpf === formData.cpf);
        if (!!emailExists && cpfExists) {
          throw new Error('Email e cpf já está em uso');
        } else if (!!emailExists) {
          throw new Error('Email já está em uso');
        } else if (cpfExists) {
          throw new Error('CPF já está em uso');
        }
      }

      // Insert new record
      const { data, error: insertError } = await supabase
        .from('customers')
        .insert([dataToSend])
        .select()
        .single();
      console.log("Insert: ", data);


      if (insertError) {
        // Handle unique constraint violation specifically
        if (insertError.code === '23505') {
          // Check which field caused the violation
          const { data: existingData } = await supabase
            .from('customers')
            .select('email, cpf')
            .or(`email.eq.${formData.email},cpf.eq.${formData.cpf?.replace(/\D/g, '')}`)
            .maybeSingle();

          if (existingData) {

            if (existingData.email === formData.email && existingData.cpf === formData.cpf?.replace(/\D/g, '')) {
              throw new Error('Email e cpf já está em uso');
            }

            if (existingData.email === formData.email) {
              throw new Error('Email já está em uso');
            }
            if (existingData.cpf === formData.cpf?.replace(/\D/g, '')) {
              throw new Error('CPF já está em uso');
            }
          }
          throw new Error('Dados já cadastrados no sistema');
        }
        throw new Error(`Erro ao salvar dados: ${insertError.message}`);
      }

      if (!data?.id) {
        throw new Error('Erro: dados não foram salvos corretamente');
      }

      console.log('Successfully inserted row with ID:', data.id);
      setStatus(true);
      // Clear localStorage on successful submit
      storageUtils.remove(storageKey);

      return {
        id: data.id,
        success: true
      };

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao enviar formulário';

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
      callback?.();
    }
  }, [formData, validateForm, storageKey]);

  // Input change handler with improved masking
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    // Apply masks based on field name
    const maskMap: Record<string, (val: string) => string> = {
      cpf: cpfMask,
      celular: phoneMask,
      telefone: phoneMask,
      cep: cepMask
    };

    if (maskMap[name]) {
      newValue = maskMap[name](value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
      updated_at: new Date().toISOString()
    }));

    // Clear errors when user starts typing
    if (error) setError(null);
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  }, [error, validationErrors]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(createDefaultPersonData());
    setStatus(false);
    setError(null);
    setValidationErrors({});
    storageUtils.remove(storageKey);
  }, [storageKey]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<FormContextType>(() => ({
    formData,
    setFormData,
    handlerSubmit,
    status,
    isSubmiting,
    error,
    validationErrors,
    handleInputChange,
    resetForm,
    validateForm,
    clearError,
  }), [
    formData,
    handlerSubmit,
    status,
    isSubmiting,
    error,
    validationErrors,
    handleInputChange,
    resetForm,
    validateForm,
    clearError,
  ]);

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
}

/*

// In your app
<FormProvider storageKey="myCustomKey" autoSave={true}>
  <YourFormComponent />
</FormProvider>

// In your form component
const { 
  formData, 
  handleInputChange, 
  validationErrors, 
  handlerSubmit, 
  validateForm 
} = useForm();

// Display field-specific errors
{validationErrors.email && <span className="error">{validationErrors.email}</span>}
*/