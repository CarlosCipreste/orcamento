import { kv } from "@vercel/kv";

const OS_COUNTER_KEY = "contador:os";

export async function GetSOAndIncrement(): Promise<number> {
  const nextNumber = await kv.incr(OS_COUNTER_KEY); // já retorna o número novo
  return nextNumber;
}

export async function GetSoNumber(): Promise<number> {
  const current = await kv.get<number>(OS_COUNTER_KEY);
  return current ?? 1;
}