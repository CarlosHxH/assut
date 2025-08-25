export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "13.0.4"
    }
    public: {
        Tables: {
            admins: {
                Row: {
                    created_at: string | null
                    email: string
                    id: string
                    nome: string
                    password_hash: string
                    role: string | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    id?: string
                    nome: string
                    password_hash: string
                    role?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    id?: string
                    nome?: string
                    password_hash?: string
                    role?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            blog_posts: {
                Row: {
                    author: string
                    content: string
                    created_at: string | null
                    id: string
                    status: string | null
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    author: string
                    content: string
                    created_at?: string | null
                    id?: string
                    status?: string | null
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    author?: string
                    content?: string
                    created_at?: string | null
                    id?: string
                    status?: string | null
                    title?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            carteirinhas: {
                Row: {
                    created_at: string | null
                    data_emissao: string | null
                    data_validade: string | null
                    id: string
                    numero_carteirinha: string
                    qr_code: string | null
                    status: string | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    data_emissao?: string | null
                    data_validade?: string | null
                    id?: string
                    numero_carteirinha: string
                    qr_code?: string | null
                    status?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    data_emissao?: string | null
                    data_validade?: string | null
                    id?: string
                    numero_carteirinha?: string
                    qr_code?: string | null
                    status?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "carteirinhas_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            customers: {
                Row: {
                    bairro: string | null
                    celular: string | null
                    cep: string | null
                    cidade: string | null
                    code: string | null
                    complemento: string | null
                    cpf: string | null
                    created_at: string
                    data_nascimento: string | null
                    email: string | null
                    endereco: string | null
                    escolaridade: string | null
                    estado: string | null
                    expected_completion: string | null
                    foto: string | null
                    genero: string | null
                    id: string
                    nome: string | null
                    notes: string | null
                    numero: string | null
                    priority: string | null
                    status: string | null
                    updated_at: string | null
                }
                Insert: {
                    bairro?: string | null
                    celular?: string | null
                    cep?: string | null
                    cidade?: string | null
                    code?: string | null
                    complemento?: string | null
                    cpf?: string | null
                    created_at?: string
                    data_nascimento?: string | null
                    email?: string | null
                    endereco?: string | null
                    escolaridade?: string | null
                    estado?: string | null
                    expected_completion?: string | null
                    foto?: string | null
                    genero?: string | null
                    id?: string
                    nome?: string | null
                    notes?: string | null
                    numero?: string | null
                    priority?: string | null
                    status?: string | null
                    updated_at?: string | null
                }
                Update: {
                    bairro?: string | null
                    celular?: string | null
                    cep?: string | null
                    cidade?: string | null
                    code?: string | null
                    complemento?: string | null
                    cpf?: string | null
                    created_at?: string
                    data_nascimento?: string | null
                    email?: string | null
                    endereco?: string | null
                    escolaridade?: string | null
                    estado?: string | null
                    expected_completion?: string | null
                    foto?: string | null
                    genero?: string | null
                    id?: string
                    nome?: string | null
                    notes?: string | null
                    numero?: string | null
                    priority?: string | null
                    status?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            denuncias: {
                Row: {
                    created_at: string | null
                    description: string
                    id: string
                    priority: string | null
                    reason: string
                    reported: string
                    reported_id: string | null
                    reporter: string
                    reporter_id: string | null
                    status: string | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    description: string
                    id?: string
                    priority?: string | null
                    reason: string
                    reported: string
                    reported_id?: string | null
                    reporter: string
                    reporter_id?: string | null
                    status?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    description?: string
                    id?: string
                    priority?: string | null
                    reason?: string
                    reported?: string
                    reported_id?: string | null
                    reporter?: string
                    reporter_id?: string | null
                    status?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "denuncias_reported_id_fkey"
                        columns: ["reported_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "denuncias_reporter_id_fkey"
                        columns: ["reporter_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            solicitacoes: {
                Row: {
                    created_at: string | null
                    data_processamento: string | null
                    data_solicitacao: string | null
                    documentos_anexos: Json | null
                    id: string
                    motivo_rejeicao: string | null
                    observacoes: string | null
                    processado_por: string | null
                    status: string | null
                    tipo_solicitacao: string
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    data_processamento?: string | null
                    data_solicitacao?: string | null
                    documentos_anexos?: Json | null
                    id?: string
                    motivo_rejeicao?: string | null
                    observacoes?: string | null
                    processado_por?: string | null
                    status?: string | null
                    tipo_solicitacao: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    data_processamento?: string | null
                    data_solicitacao?: string | null
                    documentos_anexos?: Json | null
                    id?: string
                    motivo_rejeicao?: string | null
                    observacoes?: string | null
                    processado_por?: string | null
                    status?: string | null
                    tipo_solicitacao?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "solicitacoes_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            users: {
                Row: {
                    bairro: string
                    celular: string
                    cep: string
                    cidade: string
                    code: string | null
                    complemento: string | null
                    cpf: string
                    created_at: string | null
                    data_nascimento: string
                    email: string
                    endereco: string
                    escolaridade: string
                    estado: string
                    expected_completion: string | null
                    foto: string | null
                    genero: string
                    id: string
                    nome: string
                    notes: string | null
                    numero: string
                    priority: string | null
                    status: string | null
                    updated_at: string | null
                }
                Insert: {
                    bairro: string
                    celular: string
                    cep: string
                    cidade: string
                    code?: string | null
                    complemento?: string | null
                    cpf: string
                    created_at?: string | null
                    data_nascimento: string
                    email: string
                    endereco: string
                    escolaridade: string
                    estado: string
                    expected_completion?: string | null
                    foto?: string | null
                    genero: string
                    id?: string
                    nome: string
                    notes?: string | null
                    numero: string
                    priority?: string | null
                    status?: string | null
                    updated_at?: string | null
                }
                Update: {
                    bairro?: string
                    celular?: string
                    cep?: string
                    cidade?: string
                    code?: string | null
                    complemento?: string | null
                    cpf?: string
                    created_at?: string | null
                    data_nascimento?: string
                    email?: string
                    endereco?: string
                    escolaridade?: string
                    estado?: string
                    expected_completion?: string | null
                    foto?: string | null
                    genero?: string
                    id?: string
                    nome?: string
                    notes?: string | null
                    numero?: string
                    priority?: string | null
                    status?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            search: {
                Args: { search: string }
                Returns: {
                    bairro: string | null
                    celular: string | null
                    cep: string | null
                    cidade: string | null
                    code: string | null
                    complemento: string | null
                    cpf: string | null
                    created_at: string
                    data_nascimento: string | null
                    email: string | null
                    endereco: string | null
                    escolaridade: string | null
                    estado: string | null
                    expected_completion: string | null
                    foto: string | null
                    genero: string | null
                    id: string
                    nome: string | null
                    notes: string | null
                    numero: string | null
                    priority: string | null
                    status: string | null
                    updated_at: string | null
                }[]
            }
            search_customers_by_id: {
                Args: { search_term: string }
                Returns: {
                    created_at: string
                    expected_completion: string
                    id: string
                    nome: string
                    notes: string
                    priority: string
                    status: string
                    updated_at: string
                }[]
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
    public: {
        Enums: {},
    },
} as const
