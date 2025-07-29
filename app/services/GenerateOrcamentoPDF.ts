
import { OrcamentoDTO } from "@/app/types/OrcamentoDTO";
import { PDFDocument } from "pdf-lib";
import { promises as fs } from "fs";
import path from "path";

export async function generateOrcamentoPDF(
    orcamento: OrcamentoDTO,
): Promise<Uint8Array> {
    // 1. Carrega o template de PDF a partir do sistema de arquivos
    const templatePath = path.join(process.cwd(), 'public', 'modelo-orcamento-v1.pdf');
    const templateBytes = await fs.readFile(templatePath);

    // 2. Abre o documento
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();

    // 3. Preenche campos básicos
    const hoje = new Date();
    const formattedDate = hoje.toLocaleDateString("pt-BR"); // dd/mm/aaaa

    form.getTextField("data_tf").setText(formattedDate);
    form.getTextField("nome_tf").setText(orcamento.cliente.nome);
    form.getTextField("telefone_tf").setText(orcamento.cliente.telefone);
    form.getTextField("documento_tf").setText(orcamento.cliente.documento);
    form.getTextField("endereco_tf").setText(orcamento.cliente.endereco);

    // 4. Preenche itens do orçamento
    let valorTotal = 0;
    orcamento.itens.forEach((item, idx) => {
        const line = idx + 1; // campos começam em 1
        valorTotal += item.quantidade * item.precoUnitario;

        form.getTextField(`descricao${line}_tf`).setText(item.descricao);
        form.getTextField(`qtd${line}_tf`).setText(String(item.quantidade));
        form
            .getTextField(`valor${line}_tf`)
            .setText(item.precoUnitario.toFixed(2).replace(".", ","));
    });

    // 5. Campo total + texto declaratório
    form
        .getTextField("valorTotal_tf")
        .setText(valorTotal.toFixed(2).replace(".", ","));
    form
        .getTextField("paragrafo_tf")
        .setText(
            `Eu, ${orcamento.cliente.nome} de Documento ${orcamento.cliente.documento}, ` +
            `declaro para os devidos fins que recebi o equipamento descrito neste orçamento, ` +
            `após realização dos serviços listados, em perfeitas condições de funcionamento.`,
        );

    // 6. Opcional: torna o PDF não editável
    form.flatten();

    // 7. Salva e devolve os bytes
    return pdfDoc.save();
}