import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ItemOrcamento } from "./ItemOrcamento";
import { OrcamentoData } from "../schemas/orcamento";

export type TabelaItensOrcamentoProps = {
    fields: Array<{ id: string } & ItemOrcamento>;
    register: UseFormRegister<OrcamentoData>;
    append: (item: ItemOrcamento) => void;
    remove: (index: number) => void;
    errors: FieldErrors<OrcamentoData>;
};