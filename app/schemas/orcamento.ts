import { z } from "zod";

const ItemSchema = z.object({
  descricao: z.string().min(1),
  quantidade: z.number().positive(),
  precoUnitario: z.number().positive(),
});

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

export const OrcamentoFormSchema = z.object({
  nome: z.string().nonempty("O campo não pode estar vazio").regex(/^[A-Za-z\s]+$/, "Apenas letras são permitidas"),
  telefone: z.string().nonempty("O campo não pode estar vazio").regex(/^[0-9]+$/, "Apenas números são permitidos"),
  documento: z.string().nonempty("O campo não pode estar vazio").refine(
    (doc) => cpfRegex.test(doc) || cnpjRegex.test(doc),
    { error: "Documento inválido" }
  ),
  endereco: z.string().nonempty("O campo não pode estar vazio"),
  itens: z.array(ItemSchema).min(1),
});

export type OrcamentoData = z.infer<typeof OrcamentoFormSchema>;
