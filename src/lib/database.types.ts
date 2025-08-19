export interface PersonData {
  id?: string;
  nome?: string;
  data_nascimento?: string;
  cpf?: string;
  celular?: string;
  genero?: "Masculino" | "Feminino" | "Outro";
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
  email?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  expected_completion?: string;
  notes?: string;
}

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: PersonData;
        Insert: PersonData;
        Update: PersonData;
        delete: PersonData;
      };
    };
  };
}
