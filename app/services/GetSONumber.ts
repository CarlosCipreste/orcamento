import fs from "fs/promises"
import path from "path"

export async function GetSOAndIncrement() {
    try {
        const jsonPath = path.resolve(process.cwd(), 'json', 'OsNumber.json');

        const file = await fs.readFile(jsonPath, 'utf8');
        const data = JSON.parse(file);

        const currentNumber = data.number ?? 1;
        const nextNumber = currentNumber + 1;

        await fs.writeFile(jsonPath, JSON.stringify({ number: nextNumber }, null, 2))

        return currentNumber;
    } catch (error) {
        console.error("Erro ao ler JSON:", error);
        return null;
    }
}

export async function GetSoNumber() {
    try {
        const jsonPath = path.resolve(process.cwd(), 'json', 'OsNumber.json');

        const file = await fs.readFile(jsonPath, 'utf8');
        const data = JSON.parse(file);

        const currentNumber = data.number ?? 1;

        return currentNumber;
    } catch (error) {
        console.error("Erro ao ler JSON:", error);
        return null;
    }
}
