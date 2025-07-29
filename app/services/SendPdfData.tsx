import { OrcamentoDTO } from "../types/OrcamentoDTO";


export async function enviarOrcamentoEbaixarPDF(orcamento: OrcamentoDTO) {
    try {
        const response = await fetch('/api/populatepdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orcamento),
        });

        if (!response.ok) {
            throw new Error(`Erro ao gerar PDF: ${response.statusText}`);
        }

        const blob = await response.blob();
        const contentDisposition = response.headers.get("Content-Disposition")

        // pega manualmente o header pra conseguir mudar o nome do arquivo
        let filename = "orcamento.pdf"; // valor padrão
        if (contentDisposition) {
            console.log(contentDisposition)
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match?.[1]) {
                filename = match[1];
            }
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error(error);
        alert('Erro ao gerar o PDF');
    }
}
