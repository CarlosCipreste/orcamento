'use client'
import React from 'react'
import { ErrorBox } from './ErrorBox'
import { TabelaItensOrcamentoProps } from '../types/TabelaItensOrcamentoProps';

const TabelaItensOrcamento = ({fields, remove, append, register, errors} : TabelaItensOrcamentoProps) => {

    return (<>
        <table className="table w-full border border-gray-200 text-sm ">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 text-center w-[50%]">Descrição</th>
                    <th className="p-2 text-center w-[10%]">Qtd</th>
                    <th className="p-2 text-center w-[10%]">Preço</th>
                    <th className="p-2 text-center w-[30%]">Ações</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {/* Criação dos items do Orçamento */}
                {fields.map((field, index) => (
                    <tr key={field.id}>
                        <td className="p-2 align-top">
                            <input
                                {...register(`itens.${index}.descricao`)}
                                placeholder="Descrição"
                                className="w-full rounded p-2 bg-gray-100"
                            />
                            {errors.itens?.[index]?.descricao?.message && (
                                <ErrorBox message={errors.itens[index]?.descricao?.message} />
                            )}
                        </td>

                        <td className="p-2">
                            <input
                                type="number"
                                {...register(`itens.${index}.quantidade`, { valueAsNumber: true })}
                                placeholder="Qtd"
                                className="w-full rounded p-2 bg-gray-100 no-spinner"
                            />
                        </td>

                        <td className="p-2">
                            <input
                                type="number"
                                step="0.01"
                                {...register(`itens.${index}.precoUnitario`, { valueAsNumber: true })}
                                placeholder="Preço"
                                className="w-full rounded p-2 bg-gray-100 no-spinner text-center"
                            />
                        </td>

                        <td className="p-2 text-center">
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-600 hover:bg-red-600 hover:text-white active:bg-red-200 hover:underline cursor-pointer transition ease-in-out p-2 font-bold rounded-md"
                            >
                                Remover
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        <button type="button"
            className='cursor-pointer hover:bg-gray-300 active:bg-gray-100 p-1 rounded-lg text-blue-600 transition ease-in-out'
            onClick={() =>
                append({ descricao: '', quantidade: 1, precoUnitario: 0 })
            }>
            Adicionar Item
        </button>
    </>
    )
}

export default TabelaItensOrcamento