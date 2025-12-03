import { z } from 'zod'

// Padrão para versão: apenas números e pontos (ex: 21.2.3, 1.0, 3.14)
const versaoPattern = /^(\d+)(\.\d+)*$/

export const linguagemSchema = z.object({
  descricao: z
    .string()
    .min(1, 'Linguagem é obrigatória')
    .min(3, 'Linguagem deve ter pelo menos 3 caracteres'),
  versao: z
    .string()
    .min(1, 'Versão é obrigatória')
    .regex(versaoPattern, 'Versão deve conter apenas números e pontos. Exemplos válidos: 1, 3.14, 21.2.3.0.2'),
})

export type LinguagemValidacao = z.infer<typeof linguagemSchema>

export function validarLinguagem(dados: unknown) {
  try {
    return {
      sucesso: true,
      dados: linguagemSchema.parse(dados),
      erros: {},
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const erros: Record<string, string> = {}
      error.issues.forEach((issue) => {
        const path = issue.path.join('.')
        erros[path] = issue.message
      })
      return {
        sucesso: false,
        dados: null,
        erros,
      }
    }
    return {
      sucesso: false,
      dados: null,
      erros: { geral: 'Erro ao validar dados' },
    }
  }
}
