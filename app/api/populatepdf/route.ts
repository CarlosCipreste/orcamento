import { NextRequest, NextResponse } from "next/server";
import { OrcamentoDTO } from "@/app/types/OrcamentoDTO";
import { generateOrcamentoPDF } from "@/app/services/GenerateOrcamentoPDF";
import { redis } from "@/app/lib/redis";



export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as OrcamentoDTO;

        const dataFormatada = new Date().toLocaleDateString("pt-BR").replace(/\//g, "-");
        const soNumber = await redis.incr("contador:os");
        const pdfName = `orcamento-${dataFormatada}-${soNumber}.pdf`;

        const pdfBytes = await generateOrcamentoPDF(body);

        return new NextResponse(pdfBytes, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${pdfName}"`,
            },
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Erro ao gerar orçamento", error: String(err) }, { status: 500 });
    }
}