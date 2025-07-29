import { Cliente } from "./Cliente";
import { ItemOrcamento } from "./ItemOrcamento";

export interface OrcamentoDTO {
    cliente: Cliente;
    itens: ItemOrcamento[];
}