import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

export async function GET() {
  return NextResponse.json({ message: "teste" });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const zodSchema = z.object({
      nome: z.string().min(1),
      email: z.string().email(),
      data_nascimento: z.string().min(1),
      cpf: z.string().min(1),
      celular: z.string().min(1),
      escolaridade: z.string().min(1),
      genero: z.string().min(1),
      endereco: z.string().min(1),
      cidade: z.string().min(1),
      cep: z.string().min(1),
      numero: z.string().min(1),
      bairro: z.string().min(1),
      foto: z.string().min(1),
    });

    const validatedData = zodSchema.parse(data);
    return NextResponse.json({
      message: "Cadastro realizado com sucesso",
      data: validatedData,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao cadastrar", error: error },
      { status: 400 },
    );
  }
}
