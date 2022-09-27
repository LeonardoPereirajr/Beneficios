import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { useState, useEffect } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import React from 'react'
import useGlobalState from '../globalState';
import GLOBAL from '../integration/storage.json'
import { InputTextarea } from 'primereact/inputtextarea'


export default function Tarefa_2() {

    const { globalState } = useGlobalState()

    const infos = globalState.variaveisProcesso

    const tipoBeneficio = [
        { label: 'Vale Transporte', value: 1 },
        { label: 'Plano de Saúde/ Odontologico', value: 2 },
        { label: 'Vale refeição/ Alimentação', value: 3 }
    ]

    const [observacao, setObservacao] = useState(infos?.observacao || '')


    // const [beneficios] = useState(
    //     infos?.beneficios_JSON.beneficios
    // )

    useEffect(() => {
        GLOBAL.tarefa_2 = {
            observacao
        }
    }, [observacao])

    function onSelect(param, i) {
        if (param === 1) {
            return (<>
                <div className="col-12 field">
                    <label>
                        Nome da Operadora de Vale Transporte
                    </label>
                    <InputText
                        className="w-full"
                        value={globalState.nomevt}
                    />

                </div>
                <div className="col-12 field">

                    <label>
                        Número da Linha
                    </label>
                    <InputNumber className="w-full" inputClassName="w-full"
                        value={globalState.linha}
                        readOnly />
                </div>
                <div className="col-12 field">

                    <label>
                        Tipo de Transporte
                    </label>
                    <InputText className="w-full"
                        value={globalState.tipo}
                        readOnly
                        placeholder="Onibus, metro, trem etc"
                    />
                </div>
                <div className="col-12 field">

                    <label>
                        Valor da Tarifa
                    </label>
                    <InputNumber className="w-full" inputClassName="w-full" mode="currency" currency="BRL" locale="pt-BR"
                        value={globalState.valor}
                        readOnly />

                </div>
                <div className="col-12 field">

                    <label>
                        Quantidade utilizada para ida
                    </label>
                    <InputNumber className="w-full"
                        value={globalState.qtdida}
                        readOnly />

                </div>
                <div className="col-12 field">

                    <label>
                        Quantidade utilizada para volta
                    </label>
                    <InputNumber className="w-full"
                        value={globalState.qtdvolta}
                        readOnly />

                </div>
            </>
            )

        } else if (param === 2) {

            const listaTipoPessoa = [
                { label: 'Titular' },
                { label: 'Dependente' },

            ]

            return (<>

                <div className="col-12 field">

                    <label>
                        Plano
                    </label>
                    <Dropdown
                        className="w-full"
                        optionLabel="nome"
                        options={[
                            { nome: "Plano1" },
                            { nome: "Plano2" }
                        ]}
                        readOnly
                        // value={beneficios[i]?.tipoPlano}
                    />
                </div>

            </>)

        } else if (param === 3) {
            return " "
        }
    }
    console.log(GLOBAL.tarefa_1)
    return (
    
        <div className="grid">
            <div className="col-12 field">
                <label>
                    Solicitante
                </label>
                <InputText className="w-full"
                    value={globalState.usuario.nomFun}
                    readOnly
                />
            </div>
            <Divider align="left" >Histórico Anterior </Divider>

            <div className="col-12 field">

                <label>
                    Empresa
                </label>
                <InputText className="w-full" value={infos?.empresa}
                    readOnly
                />

            </div>
            <div className="col-12 field">

                <label>
                    Filial
                </label>
                <InputText className="w-full" value={infos?.filial}
                    readOnly
                />

            </div>
            <div className="col-12 field">

                <label>
                    Data
                </label>
                <InputText className="w-full" value={new Date().toLocaleDateString()} />

            </div>
            <div className="col-12 field">

                <label>
                    Data
                </label>
                <InputText className="w-full"
                    value={new Date().toLocaleDateString()}
                    readonly
                />

            </div>
            <div className="col-12 field">

                <label>
                    Escala
                </label>
                <InputText className="w-full" value={infos?.escala} />

            </div>
            <div className="col-12 field">

                <label>
                    Data
                </label>
                <InputText className="w-full" value={new Date().toLocaleDateString()}
                    readOnly
                />

            </div>
            
            <Divider align="left" > Benefícios </Divider>
    
            <Divider align="left" > Informações da Solicitação </Divider>
            <div className="col-12 field">
                <label>
                    Descrição
                </label>
                <InputTextarea className="w-full" rows={4} value={infos?.descricao}
                    readOnly
                />
            </div>
            <div className="col-12 field">
                <label>
                    Observação
                </label>
                <InputTextarea className="w-full" rows={4} value={observacao} onChange={(e) => setObservacao(e.target.value)} />
            </div>
        </div>
    )
}

