/**
 * Validador de CPF em TypeScript
 * Implementa as regras oficiais de validação do CPF brasileiro
 */

interface CPFValidationResult {
  isValid: boolean;
  formatted?: string;
  error?: string;
}

class CPFValidator {
  /**
   * Remove caracteres não numéricos do CPF
   */
  private static cleanCPF(cpf: string): string {
    return cpf.replace(/\D/g, "");
  }

  /**
   * Formata CPF no padrão XXX.XXX.XXX-XX
   */
  static formatCPF(cpf: string): string {
    const cleaned = this.cleanCPF(cpf);
    if (cleaned.length !== 11) {
      throw new Error("CPF deve conter 11 dígitos");
    }
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  /**
   * Verifica se todos os dígitos são iguais (CPFs inválidos conhecidos)
   */
  private static hasAllSameDigits(cpf: string): boolean {
    return cpf.split("").every((digit) => digit === cpf[0]);
  }

  /**
   * Calcula o dígito verificador do CPF
   */
  private static calculateDigit(cpf: string, position: number): number {
    let sum = 0;
    let multiplier = position + 1;

    for (let i = 0; i < position; i++) {
      sum += parseInt(cpf[i]) * multiplier;
      multiplier--;
    }

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  /**
   * Valida se o CPF é válido
   */
  static isValid(cpf: string): boolean {
    if (!cpf || typeof cpf !== "string") {
      return false;
    }

    const cleaned = this.cleanCPF(cpf);

    // Verifica se tem 11 dígitos
    if (cleaned.length !== 11) {
      return false;
    }

    // Verifica se não são todos os dígitos iguais
    if (this.hasAllSameDigits(cleaned)) {
      return false;
    }

    // Calcula o primeiro dígito verificador
    const firstDigit = this.calculateDigit(cleaned, 9);
    if (firstDigit !== parseInt(cleaned[9])) {
      return false;
    }

    // Calcula o segundo dígito verificador
    const secondDigit = this.calculateDigit(cleaned, 10);
    if (secondDigit !== parseInt(cleaned[10])) {
      return false;
    }

    return true;
  }

  /**
   * Valida CPF e retorna resultado detalhado
   */
  static validate(cpf: string): CPFValidationResult {
    if (!cpf || typeof cpf !== "string") {
      return {
        isValid: false,
        error: "CPF deve ser uma string não vazia",
      };
    }

    const cleaned = this.cleanCPF(cpf);

    if (cleaned.length !== 11) {
      return {
        isValid: false,
        error: "CPF deve conter exatamente 11 dígitos",
      };
    }

    if (!/^\d{11}$/.test(cleaned)) {
      return {
        isValid: false,
        error: "CPF deve conter apenas números",
      };
    }

    if (this.hasAllSameDigits(cleaned)) {
      return {
        isValid: false,
        error: "CPF não pode ter todos os dígitos iguais",
      };
    }

    const isValid = this.isValid(cpf);

    if (isValid) {
      return {
        isValid: true,
        formatted: this.formatCPF(cleaned),
      };
    } else {
      return {
        isValid: false,
        error: "CPF possui dígitos verificadores inválidos",
      };
    }
  }

  /**
   * Gera um CPF válido aleatório (para testes)
   */
  static generate(): string {
    // Gera os primeiros 9 dígitos aleatoriamente
    const firstNineDigits = Array.from({ length: 9 }, () =>
      Math.floor(Math.random() * 10),
    ).join("");

    // Calcula os dígitos verificadores
    const firstDigit = this.calculateDigit(firstNineDigits, 9);
    const cpfWithFirstDigit = firstNineDigits + firstDigit;
    const secondDigit = this.calculateDigit(cpfWithFirstDigit, 10);

    const generatedCPF = firstNineDigits + firstDigit + secondDigit;
    return this.formatCPF(generatedCPF);
  }
}

// Exemplos de uso:
/*
// Validação simples
console.log("=== Validação Simples ===");
console.log(CPFValidator.isValid("111.222.333-96")); // true
console.log(CPFValidator.isValid("111.111.111-11")); // false
console.log(CPFValidator.isValid("123.456.789-10")); // false

// Validação detalhada
console.log("\n=== Validação Detalhada ===");
console.log(CPFValidator.validate("111.222.333-96"));
console.log(CPFValidator.validate("111.111.111-11"));
console.log(CPFValidator.validate("12345678901"));
console.log(CPFValidator.validate("123.456.789-10"));


// Formatação
console.log("\n=== Formatação ===");
try {
  console.log(CPFValidator.formatCPF("11122233396")); // 111.222.333-96
} catch (error) {
  console.error(error.message);
}

// Geração de CPF válido
console.log("\n=== Geração de CPF ===");
console.log("CPF gerado:", CPFValidator.generate());
console.log("CPF gerado:", CPFValidator.generate());
console.log("CPF gerado:", CPFValidator.generate());
*/
export { CPFValidator };
