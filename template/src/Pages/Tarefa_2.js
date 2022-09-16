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

    const [observacao,setObservacao] = useState(infos?.observacao || '')

   
    const [beneficios] = useState(
        infos?.beneficios_JSON.beneficios
    )

    useEffect(() => {
        GLOBAL.tarefa_2 = {
            observacao
        }
    },[observacao])

    function onSelect(param, i) {
        if (param === 1) {
            return (<>
                <div className="col-12 field">
                    {console.log(beneficios)}
                    <label>
                        Nome da operadora de Transporte
                    </label>
                    <InputText
                        className="w-full"
                        value={beneficios[i]?.nomeOperadora}
                        readOnly
                    />

                </div>
                <div className="col-12 field">

                    <label>
                        Número da Linha
                    </label>
                    <InputNumber className="w-full" inputClassName="w-full"
                        value={beneficios[i]?.numeroLinha}
                        readOnly />
                </div>
                <div className="col-12 field">

                    <label>
                        Tipo de Transporte
                    </label>
                    <InputText className="w-full"
                        value={beneficios[i]?.tipoTransporte}
                        readOnly
                        placeholder="Onibus, metro, trem etc"
                    />
                </div>
                <div className="col-12 field">

                    <label>
                        Valor da Tarifa
                    </label>
                    <InputNumber className="w-full" inputClassName="w-full" mode="currency" currency="BRL" locale="pt-BR"
                        value={beneficios[i]?.valorTarifa}
                        readOnly />

                </div>
                <div className="col-12 field">

                    <label>
                        Quantidade utilizada para ida
                    </label>
                    <InputNumber className="w-full"
                        value={beneficios[i]?.quantidadeIda}
                        readOnly />

                </div>
                <div className="col-12 field">

                    <label>
                        Quantidade utilizada para volta
                    </label>
                    <InputNumber className="w-full"
                        value={beneficios[i]?.quantidadeVolta}
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
                    {console.log(beneficios)}
                    <label>
                        Tipo
                    </label>
                    <Dropdown options={listaTipoPessoa} className="w-full"
                        value={beneficios[i]?.tipoPessoa}
                        readOnly />

                </div>
                {
                    beneficios[i].tipoPessoa?.label === "Dependente" &&
                    <div className="col-12 field">
                        <Dropdown
                            className="w-full"
                            optionLabel="nome"
                            options={[
                                { nome: "Dependente1" },
                                { nome: "Dependente2" }
                            ]}
                            readOnly
                            value={beneficios[i]?.dependente}
                        />
                    </div>
                }
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
                        value={beneficios[i]?.tipoPlano}
                    />
                </div>

            </>)

        } else if (param === 3) {
            return " "
        }
    }

    return (
        <div className="grid">
            <div className="col-12 field">
                <label>
                    Solicitante
                </label>
                <InputText className="w-full"
                    value={infos?.solicitante}
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
                    Cargo
                </label>
                <InputText className="w-full" value={infos?.cargo}
                    readOnly
                />

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
            <Divider align="left" >Histórico Atual </Divider>
            <div className="col-12 field">

                <label>
                    Empresa
                </label>
                <InputText className="w-full"
                    value={infos?.empresa}
                    readOnly
                />

            </div>
            <div className="col-12 field">

                <label>
                    Filial
                </label>
                <InputText className="w-full"
                    value={infos?.filial}
                    readOnly
                />

            </div>
            <div className="col-12 field">

                <label>
                    Data
                </label>
                <InputText className="w-full"
                    value={new Date().toLocaleDateString()}
                    readOnly
                />

            </div>
            <div className="col-12 field">

                <label>
                    Cargo
                </label>
                <InputText className="w-full"
                    value={infos?.cargo}
                    readonly
                />

            </div>
            <div className="col-12 field">

                <label>
                    Data
                </label>
                <InputText className="w-full"
                    value={new Date().toLocaleDateString()}
                    readOnly
                />

            </div>
            <div className="col-12 field">

                <label>
                    Escala
                </label>
                <InputText className="w-full"
                    value={infos?.escala}
                    readOnly
                />

            </div>
            <div className="col-12 field">

                <label>
                    Data
                </label>
                <InputText className="w-full"
                    value={new Date().toLocaleDateString()}
                    readOnly
                />
            </div>
            <Divider align="left" > Benefícios </Divider>
            {

                beneficios?.map(
                    (param, i) => (<Card className="w-full m-3">
                        <div className="col-12 field">
                            <label>
                                Tipo de Benefício
                            </label>
                            <Dropdown value={param.tipoBeneficio}
                                className="w-full"
                                options={tipoBeneficio}
                                readonly
                            />
                        </div>
                        {onSelect(param.tipoBeneficio, i)}
                    </Card>
                    )

                )
            }
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
                <InputTextarea className="w-full" rows={4} value={observacao} onChange={(e)=> setObservacao(e.target.value)}/>
            </div>
        </div>
    )
}

