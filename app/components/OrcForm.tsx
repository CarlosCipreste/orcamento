'use client'

import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray } from 'react-hook-form';
import { OrcamentoDTO } from '../types/OrcamentoDTO';
import { enviarOrcamentoEbaixarPDF } from '../services/SendPdfData';
import { ErrorBox } from './ErrorBox';
import TabelaItensOrcamento from './TabelaItensOrcamento';
import { FormField } from './FormField';
import { OrcamentoData, OrcamentoFormSchema } from '../schemas/orcamento';

export default function OrcForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<OrcamentoData>({
        resolver: zodResolver(OrcamentoFormSchema),
        defaultValues: {
            nome: "",
            telefone: "",
            documento: "",
            endereco: "",
            itens: [{ descricao: '', quantidade: 1, precoUnitario: 0 }],
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'itens',
    });

    const onSubmit = async (data: OrcamentoData) => {
        const orcamento: OrcamentoDTO = {
            cliente: {
                nome: data.nome,
                telefone: data.telefone,
                documento: data.documento,
                endereco: data.endereco,
            },
            itens: data.itens.map(item => ({
                descricao: item.descricao,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario,
            })),
        }
        await enviarOrcamentoEbaixarPDF(orcamento);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='
        border-1
        shadow-lg
        border-gray-100
        rounded-2xl 
        flex  
        flex-col 
        items-center 
        gap-4 
        p-4
        [&>div]:flex
        [&>div]:gap-2
        [&>div]:items-center
        [&>div]:w-full
        '
        >

            <FormField label="Cliente" error={errors.nome?.message}
                children={<input
                    {...register('nome')}
                    placeholder="Nome"
                    className="rounded-lg p-2 w-full bg-gray-200 " />
                } name={'name'}>

            </FormField>

            <FormField label="Telefone" error={errors.telefone?.message} name={'telefone'} children={
                <input
                    {...register('telefone')}
                    placeholder="Telefone"
                    className="rounded-lg p-2 bg-gray-200 w-full"
                />
            }>

            </FormField>

            <FormField label="Documento" error={errors.documento?.message} name={'documento'} children={
                <input
                    {...register('documento')}
                    placeholder="CPF/CNPJ"
                    className="rounded-lg p-2 bg-gray-200 w-full"
                />
            }>

            </FormField>

            <FormField label="Endereço" error={errors.endereco?.message} name={'endereco'} children={<input
                {...register('endereco')}
                placeholder="Endereço"
                className="rounded-lg p-2 bg-gray-200 w-full"
            />}>

            </FormField>

            <TabelaItensOrcamento
                fields={fields}
                append={append}
                remove={remove}
                register={register}
                errors={errors} />

            <button type='submit'
                className='cursor-pointer text-green-600 hover:text-green-500 hover:bg-gray-300 active:bg-gray-100 p-1 rounded-lg transition ease-in-out'>Gerar PDF</button>

        </form>
    )
}