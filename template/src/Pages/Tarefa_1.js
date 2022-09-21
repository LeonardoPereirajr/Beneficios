import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react'
import useGlobalState from '../globalState';
import { InputTextarea } from 'primereact/inputtextarea'
import { useState, useEffect } from 'react';
import getColaborador from '../Services/getColaborador';
import GLOBAL from '../integration/storage.json'
import { InputNumber } from 'primereact/inputnumber';
import FieldName from '../components/FieldName';
import { Datepicker } from '../components/Datepicker';
import getEscalaAtualColaborador from '../Services/getEscalaAtualColaborador';
import getPlanoSaudeAtualColaborador from '../Services/getPlanoSaudeAtualColaborador';


export default function Tarefa_1() {

    const { globalState } = useGlobalState()

    const info = globalState.variaveisProcesso

    const motivoSolicitacao = [
        { label: 'Alteração de Unidade', cod: 1 },
        { label: 'Alteração de Escala', cod: 2 },
        { label: 'Alteração de Endereço', cod: 3 },
        { label: 'Outros (Justifique)', cod: 4 },

    ]
    const [motivoSelecionado, setMotivoSelecionado] = useState(null)

    const beneficio = [
        { label: 'Vale Transporte', cod: 1 },
        { label: 'Plano de Saúde', cod: 2 },
        { label: 'Odonto', cod: 3 },
        { label: 'VA / VR', cod: 4 },
    ]
    const [beneficioSelecionado, setBeneficioSelecionado] = useState(null)

    const operacao = [
        { label: 'Incluir', cod: 1 },
        { label: 'Alterar', cod: 2 },
        { label: 'Excluir', cod: 3 },
    ]
    const [operacaoSelecionada, setOperacaoSelecionada] = useState(null)

    const operacaoVale = [
        { label: 'Alterar', cod: 1 },
    ]
    const [operacaoSelecionadaVale, setOperacaoSelecionadaVale] = useState(null)

    const operacaoPlano = [
        { label: 'Incluir', cod: 1 },
        { label: 'Alterar Titular + Dependentes', cod: 2 },
        { label: 'Incluir Dependentes', cod: 3 },
        { label: 'Excluir', cod: 4 },
    ]
    const [operacaoSelecionadaPlano, setOperacaoSelecionadaPlano] = useState(null)

    const [dados, setDados] = useState(null)

    const [VTAtual, setVTAtual] = useState("")

    const [DataInclusaoVT, setInclusaoVT] = useState("")

    const [PlanoAtual, setPlanoSaude] = useState("")

    const [DataInclusaoPlano, setInclusaoPlano] = useState("")

    useEffect(() => {
        getColaborador(globalState.usuario.subject).then((param) => {
            setDados(param)
            getEscalaAtualColaborador(param.usuario.numEmp, param.usuario.tipCol, param.usuario.numCad)
                .then((data) => {
                    if (data.escalas.nomevt) {
                        setVTAtual(data.escalas.nomevt)
                    }
                    if (data.escalas.inievt) {
                        setInclusaoVT(data.escalas.inievt)
                    }
                })
        })
    }, [])
    useEffect(() => {
        getColaborador(globalState.usuario.subject).then((param) => {
            setPlanoSaude(param)
            getPlanoSaudeAtualColaborador(param.usuario.numEmp, param.usuario.tipCol, param.usuario.numCad)
                .then((data) => {
                    if (data.colaboradores.nompla) {
                        setPlanoSaude(data.colaboradores.nompla)
                    }
                    if (data.colaboradores.mesinc) {
                        setInclusaoPlano(data.colaboradores.mesinc)
                    }
                })
        })
    }, [])

    return (
        <div className="grid">
            {
                globalState.variaveisProcesso?.observacao &&

                <div className="col-12 field">
                    <label>
                        Observação CSC
                    </label>
                    <InputTextarea className="w-full"
                        value={info.observacao}
                        readonly
                    />
                </div>
            }
            <div className="col-12 field">
                <label>
                    COLABORADOR
                </label>
                <InputText className="w-full"
                    value={dados?.usuario.nomFun}
                    readonly
                />
            </div>

            <div className="col-12 field">

                <label>
                    Histórico Atual
                </label>
                {console.log(dados)}
                <InputText className="w-full" value={dados?.empresa.datfil + ' | ' + dados?.empresa.numEmp + '-' + dados?.empresa.codFil + '-' + dados?.empresa.nomFil}
                    readonly
                />
            </div>
            <div className="col-12 field">

                <label>
                    Para qual Período Deseja Solicitar a Alteração?
                </label>
                {console.log(dados)}
                <InputText className="w-full" value={dados?.empresa.datfil + ' | ' + dados?.empresa.numEmp + '-' + dados?.empresa.codFil + '-' + dados?.empresa.nomFil}
                    readonly
                />
            </div>

            <Divider align="left" > BENEFÍCIOS </Divider>


            <div className="col-12 field">
                <label> Escolha o motivo da solicitação</label>
                <Dropdown
                    value={motivoSelecionado}
                    options={motivoSolicitacao}
                    className="w-full"
                    onChange={(e) => setMotivoSelecionado(e.value)}
                />
            </div>

            <div className="grid px-2" style={{ display: motivoSelecionado ? "" : "none" }}>

                {
                    motivoSelecionado?.cod == 1 &&
                    <>
                        <div className="col-12 field">
                            <label> Escolha o beneficio. </label>
                            <Dropdown
                                value={beneficioSelecionado}
                                options={beneficio}
                                className="w-full"
                                onChange={(e) => setBeneficioSelecionado(e.value)}
                            />
                        </div>
                        {/* Vale Transporte */}
                        {
                            beneficioSelecionado?.cod == 1 &&
                            <>

                                <div className="col-12 field">
                                    <Divider align="left" > Vale Transporte </Divider>
                                    <label>
                                        Escala Vale de transporte Atual
                                    </label>
                                    <InputText className="w-full" value={VTAtual}
                                        readonly
                                    />
                                </div>


                                <div className="col-12 field">
                                    <label>Tipo de operação</label>
                                    <Dropdown
                                        value={operacaoSelecionada}
                                        options={operacao}
                                        className="w-full"
                                        onChange={(e) => setOperacaoSelecionada(e.value)}
                                    />
                                </div>

                                {
                                    operacaoSelecionada?.cod == 1 &&
                                    <>

                                        <div className="col-12 field">
                                            <label>
                                                Nome da Operadora de Vale Transporte
                                            </label>
                                            <InputText className="w-full" value={"Empresa XPTO"}
                                                readonly
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Numero da Linha
                                            </label>
                                            <InputNumber className="w-full" value={999999}
                                                readonly
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Tipo de Transporte
                                            </label>
                                            <InputText className="w-full" value={'Onibus,Metro,Trem,Etc.'}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Valor da Tarifa
                                            </label>
                                            <InputNumber className="w-full" value={99.99}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Ida
                                            </label>
                                            <InputNumber className="w-full" value={1}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Volta
                                            </label>
                                            <InputNumber className="w-full" value={1}
                                                readonly
                                            />
                                        </div>

                                        <div className="col-4 field">
                                            <label>
                                                Escala Vale Transporte
                                            </label>
                                            <InputNumber className="w-full" value={1}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-4 field">
                                            <FieldName required name='Data Início' />
                                            <Datepicker
                                                className='w-full'
                                                inputClassName='obrigatorio'
                                            />
                                        </div>
                                        <div className="col-4 field">
                                            <FieldName required name='Data Fim' />
                                            <Datepicker
                                                className='w-full'
                                                inputClassName='obrigatorio'
                                            />
                                        </div>
                                        <Divider align="left" > GRID </Divider>

                                        <div className="col-3 field">
                                            <label>
                                                Linha 1
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 2
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 3
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 4
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 5
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 6
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                    </>
                                }
                                {
                                    operacaoSelecionada?.cod == 2 &&
                                    <>

                                        <div className="col-12 field">
                                            <label>
                                                Nome da Operadora de Vale Transporte
                                            </label>
                                            <InputText className="w-full" value={"Empresa XPTO"}
                                                readonly
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Numero da Linha
                                            </label>
                                            <InputNumber className="w-full" value={999999}
                                                readonly
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Tipo de Transporte
                                            </label>
                                            <InputText className="w-full" value={'Onibus,Metro,Trem,Etc.'}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Valor da Tarifa
                                            </label>
                                            <InputNumber className="w-full" value={99.99}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Ida
                                            </label>
                                            <InputNumber className="w-full" value={1}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Volta
                                            </label>
                                            <InputNumber className="w-full" value={1}
                                                readonly
                                            />
                                        </div>

                                        <div className="col-4 field">
                                            <label>
                                                Escala Vale Transporte
                                            </label>
                                            <InputNumber className="w-full" value={1}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-4 field">
                                            <FieldName required name='Data Início' />
                                            <Datepicker
                                                className='w-full'
                                                inputClassName='obrigatorio'
                                            />
                                        </div>
                                        <div className="col-4 field">
                                            <FieldName required name='Data Fim' />
                                            <Datepicker
                                                className='w-full'
                                                inputClassName='obrigatorio'
                                            />
                                        </div>
                                        <Divider align="left" > GRID </Divider>

                                        <div className="col-3 field">
                                            <label>
                                                Linha 1
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 2
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 3
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 4
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 5
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 6
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                    </>
                                }
                                {
                                    operacaoSelecionada?.cod == 3 &&
                                    <>
                                        <div className="col-12 field">
                                            <FieldName name='Data Início' />
                                            <InputText
                                                readOnly
                                                className="w-full"
                                                value={DataInclusaoVT}
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <FieldName required name='Data Fim' />
                                            <Datepicker
                                                className='w-full'
                                                inputClassName='obrigatorio'
                                            />
                                        </div>
                                    </>
                                }
                            </>
                        }

                        {/* Plano de saude */}
                        {
                            beneficioSelecionado?.cod == 2 &&
                            <>

                                <div className="col-12 field">
                                    <Divider align="left" > Plano de Saude </Divider>
                                    <label>
                                        Plano Titular Atual + Data Inclusão
                                    </label>
                                    {console.log(dados)}
                                    <InputText className="w-full" value={PlanoAtual + ' | ' + DataInclusaoPlano}
                                        readonly
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Tipo de Operação
                                    </label>
                                    <Dropdown
                                        value={operacaoSelecionadaPlano}
                                        options={operacaoPlano}
                                        className="w-full"
                                        onChange={(e) => setOperacaoSelecionadaPlano(e.value)}
                                    />
                                </div>

                                {
                                    operacaoSelecionadaPlano?.cod == 1 &&
                                    <>
                                        <div className="col-12 field">
                                            <label>
                                                Plano Titular
                                            </label>
                                            <InputText className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <FieldName name='Data Inclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <FieldName name='Data Exclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>

                                        <Divider align="left" > Dependente </Divider>
                                        <div className="col-4 flex flex-column mb-2">
                                            <InputText className="w-full" placeholder='Dependente 1'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 2'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 3'
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Marque ou desmarque quem será incluído ou excluído do Plano.
                                            </label>
                                        </div>
                                        <div className="col-3 field">
                                            <input id="Manter" name="base" type="radio" value="S" />
                                            <label>
                                                Manter dependente no Plano
                                            </label>
                                            <label>
                                                <input id="Incluir" name="base" type="radio" value="S" />
                                                Esta ação irá incluir dependente no Plano
                                            </label>
                                            <label>
                                                <input id="Excluir" name="base" type="radio" value="S" />
                                                Esta ação irá excluir dependente no Plano
                                            </label>
                                        </div>
                                    </>
                                }

                                {
                                    operacaoSelecionadaPlano?.cod == 2 &&
                                    <>
                                        <div className="col-12 field">
                                            <label>
                                                Plano Titular
                                            </label>
                                            <InputText className="w-full" value={PlanoAtual + ' | ' + DataInclusaoPlano}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-4 field">
                                            <FieldName name='Data Inclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>
                                        <div className="col-4 field">
                                            <FieldName name='Data Exclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>

                                        <Divider align="left" > Dependente </Divider>
                                        <div className="col-4 flex flex-column mb-2">
                                            <InputText className="w-full" placeholder='Dependente 1'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 2'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 3'
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Marque ou desmarque quem será incluído ou excluído do Plano.
                                            </label>
                                        </div>
                                        <div className="col-3 field">
                                            <input id="Manter" name="base" type="radio" value="S" />
                                            <label>
                                                Manter dependente no Plano
                                            </label>
                                            <label>
                                                <input id="Incluir" name="base" type="radio" value="S" />
                                                Esta ação irá incluir dependente no Plano
                                            </label>
                                            <label>
                                                <input id="Excluir" name="base" type="radio" value="S" />
                                                Esta ação irá excluir dependente no Plano
                                            </label>
                                        </div>
                                    </>
                                }

                                {
                                    operacaoSelecionadaPlano?.cod == 3 &&
                                    <>
                                        <div className="col-12 field">
                                            <label>
                                                Plano Titular Atual
                                            </label>
                                            <InputText className="w-full" value={PlanoAtual + ' | ' + DataInclusaoPlano}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <FieldName name='Data Inclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <FieldName name='Data Exclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>

                                        <Divider align="left" > Dependente </Divider>
                                        <div className="col-4 flex flex-column mb-2">
                                            <InputText className="w-full" placeholder='Dependente 1'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 2'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 3'
                                            />
                                        </div>

                                        <div className="col-3 field">
                                            <input id="Excluir1" name="base" type="radio" value="S" />
                                            <label>
                                                Excluir
                                            </label>
                                            <label>
                                                <input id="Excluir2" name="base" type="radio" value="S" />
                                                Excluir
                                            </label>
                                            <label>
                                                <input id="Excluir3" name="base" type="radio" value="S" />
                                                Excluir
                                            </label>
                                        </div>
                                    </>
                                }
                                {
                                    operacaoSelecionadaPlano?.cod == 4 &&
                                    <>
                                        <div className="col-6 field">
                                            <label>
                                                Plano Titular Atual
                                            </label>
                                            <InputText className="w-full" value={PlanoAtual + ' | ' + DataInclusaoPlano}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field">
                                            <FieldName name='Data Exclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>

                                        <Divider align="left" > Dependente </Divider>
                                        <div className="col-4 flex flex-column mb-2">
                                            <InputText className="w-full" placeholder='Dependente 1'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 2'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 3'
                                            />
                                        </div>

                                        <div className="col-3 field">
                                            <input id="Excluir1" name="base" type="radio" value="S" />
                                            <label>
                                                Excluir
                                            </label>
                                            <label>
                                                <input id="Excluir2" name="base" type="radio" value="S" />
                                                Excluir
                                            </label>
                                            <label>
                                                <input id="Excluir3" name="base" type="radio" value="S" />
                                                Excluir
                                            </label>
                                        </div>
                                    </>
                                }

                            </>
                        }

                        {/* PLANO ODONTO */}

                        {
                            beneficioSelecionado?.cod == 3 &&
                            <>

                                <div className="col-12 field">
                                    <Divider align="left" > Plano Odonto </Divider>
                                    <label>
                                        Plano Titular Atual
                                    </label>
                                    <InputText className="w-full" value={""}
                                        readonly
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Tipo de Operação
                                    </label>
                                    <Dropdown
                                        value={operacaoSelecionadaPlano}
                                        options={operacaoPlano}
                                        className="w-full"
                                        onChange={(e) => setOperacaoSelecionadaPlano(e.value)}
                                    />
                                </div>
                                <div className="col-4 field">
                                    <FieldName name='Data Exclusão' />
                                    <Datepicker
                                        className='w-full'
                                    />
                                </div>

                                <Divider align="left" > Dependente </Divider>
                                <div className="col-4 flex flex-column mb-2">
                                    <InputText className="w-full" placeholder='Dependente 1'
                                    />
                                    <div className="col-3 field">
                                        <input id="Manter" name="base" type="checkbox" value="S" />
                                        <label>
                                            Excluir
                                        </label>
                                    </div>
                                    <InputText className="w-full" placeholder='Dependente 2'
                                    />
                                    <div className="col-3 field">
                                        <input id="Manter" name="base" type="checkbox" value="S" />
                                        <label>
                                            Excluir
                                        </label>
                                    </div>
                                    <InputText className="w-full" placeholder='Dependente 3'
                                    />
                                    <div className="col-3 field">
                                        <input id="Manter" name="base" type="checkbox" value="S" />
                                        <label>
                                            Excluir
                                        </label>
                                    </div>
                                </div>

                            </>
                        }

                        {/* VA/VR */}
                        {
                            beneficioSelecionado?.cod == 4 &&
                            <>

                                <Divider align="left" > VA / VR </Divider>


                                <div className="col-12 field">
                                    <label>
                                        Tipo de Operação
                                    </label>
                                    <Dropdown
                                        value={operacaoSelecionadaVale}
                                        options={operacaoVale}
                                        className="w-full"
                                        onChange={(e) => setOperacaoSelecionadaVale(e.value)}
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Codigo do Vale Anterior
                                    </label>
                                    <InputText className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field">
                                    <label>
                                        Tipo Vale
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-6 field">
                                    <label>
                                        Quantidade Vales
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Dia útil
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Sábado
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Domingo
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Feriado
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />

                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Codigo do Vale
                                    </label>
                                    <InputText className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field">
                                    <label>
                                        Tipo Vale
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-6 field">
                                    <label>
                                        Quantidade Vales
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Dia útil
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Sábado
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Domingo
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Feriado
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                            </>
                        }

                    </>
                }


                {
                    motivoSelecionado?.cod == 2 &&
                    <>
                        {/* Vale Transporte motivo 2 */}

                        <div className="col-12 field">
                            <label>
                                Histórico Atual
                            </label>
                            <InputText className="w-full" value={dados?.empresa.datfil + ' | ' + dados?.usuario.escala}
                                readonly
                            />
                        </div>
                        <div className="col-12 field">
                            <label>
                                Para qual Período Deseja Solicitar a Alteração?
                            </label>
                            <InputText className="w-full" value={dados?.empresa.datfil + ' | ' + dados?.usuario.escala}
                                readonly
                            />
                        </div>

                        <div className="col-12 field">
                            <Divider align="left" > Vale Transporte </Divider>
                            <label>
                                Escala Vale de transporte Atual
                            </label>
                            <InputText className="w-full" value={VTAtual}
                                readonly
                            />
                        </div>


                        <div className="col-12 field">
                            <label>Tipo de operação</label>
                            <Dropdown
                                value={operacaoSelecionada}
                                options={operacao}
                                className="w-full"
                                onChange={(e) => setOperacaoSelecionada(e.value)}
                            />
                        </div>

                        {
                            operacaoSelecionada?.cod == 1 &&
                            <>

                                <div className="col-12 field">
                                    <label>
                                        Nome da Operadora de Vale Transporte
                                    </label>
                                    <InputText className="w-full" value={"Empresa XPTO"}
                                        readonly
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Numero da Linha
                                    </label>
                                    <InputNumber className="w-full" value={999999}
                                        readonly
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Tipo de Transporte
                                    </label>
                                    <InputText className="w-full" value={'Onibus,Metro,Trem,Etc.'}
                                        readonly
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Valor da Tarifa
                                    </label>
                                    <InputNumber className="w-full" value={99.99}
                                        readonly
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Quantidade Utilizada para Ida
                                    </label>
                                    <InputNumber className="w-full" value={1}
                                        readonly
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Quantidade Utilizada para Volta
                                    </label>
                                    <InputNumber className="w-full" value={1}
                                        readonly
                                    />
                                </div>

                                <div className="col-4 field">
                                    <label>
                                        Escala Vale Transporte
                                    </label>
                                    <InputNumber className="w-full" value={1}
                                        readonly
                                    />
                                </div>
                                <div className="col-4 field">
                                    <FieldName required name='Data Início' />
                                    <Datepicker
                                        className='w-full'
                                        inputClassName='obrigatorio'
                                    />
                                </div>
                                <div className="col-4 field">
                                    <FieldName required name='Data Fim' />
                                    <Datepicker
                                        className='w-full'
                                        inputClassName='obrigatorio'
                                    />
                                </div>
                                <Divider align="left" > GRID </Divider>

                                <div className="col-3 field">
                                    <label>
                                        Linha 1
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 2
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 3
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 4
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 5
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 6
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                            </>
                        }
                        {
                            operacaoSelecionada?.cod == 2 &&
                            <>

                                <div className="col-12 field">
                                    <label>
                                        Nome da Operadora de Vale Transporte
                                    </label>
                                    <InputText className="w-full" value={"Empresa XPTO"}
                                        readonly
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Numero da Linha
                                    </label>
                                    <InputNumber className="w-full" value={999999}
                                        readonly
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Tipo de Transporte
                                    </label>
                                    <InputText className="w-full" value={'Onibus,Metro,Trem,Etc.'}
                                        readonly
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Valor da Tarifa
                                    </label>
                                    <InputNumber className="w-full" value={99.99}
                                        readonly
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Quantidade Utilizada para Ida
                                    </label>
                                    <InputNumber className="w-full" value={1}
                                        readonly
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Quantidade Utilizada para Volta
                                    </label>
                                    <InputNumber className="w-full" value={1}
                                        readonly
                                    />
                                </div>

                                <div className="col-4 field">
                                    <label>
                                        Escala Vale Transporte
                                    </label>
                                    <InputNumber className="w-full" value={1}
                                        readonly
                                    />
                                </div>
                                <div className="col-4 field">
                                    <FieldName required name='Data Início' />
                                    <Datepicker
                                        className='w-full'
                                        inputClassName='obrigatorio'
                                    />
                                </div>
                                <div className="col-4 field">
                                    <FieldName required name='Data Fim' />
                                    <Datepicker
                                        className='w-full'
                                        inputClassName='obrigatorio'
                                    />
                                </div>
                                <Divider align="left" > GRID </Divider>

                                <div className="col-3 field">
                                    <label>
                                        Linha 1
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 2
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 3
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 4
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 5
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 6
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                            </>
                        }
                        {
                            operacaoSelecionada?.cod == 3 &&
                            <>
                                <div className="col-12 field">
                                    <FieldName name='Data Início' />
                                    <InputText
                                        readOnly
                                        className="w-full"
                                        value={DataInclusaoVT}
                                    />
                                </div>
                                <div className="col-12 field">
                                    <FieldName required name='Data Fim' />
                                    <Datepicker
                                        className='w-full'
                                        inputClassName='obrigatorio'
                                    />
                                </div>
                            </>
                        }
                    </>
                }


                {
                    motivoSelecionado?.cod == 3 &&
                    <>
                        {/* Vale Transporte motivo 3 */}

                        <div className="col-12 field">
                            <label>
                                CEP
                            </label>
                            <InputText className="w-full" value={dados?.usuario.endcep}
                                readonly
                            />
                        </div>
                        <div className="col-12 field">
                            <label>
                                Tipo/Logradouro/Nº
                            </label>
                            <InputText className="w-full" value={dados?.usuario.endrua}
                                readonly
                            />
                        </div>
                        <div className="col-12 field">
                            <label>
                                Complemento
                            </label>
                            <InputText className="w-full" value={dados?.usuario.endcpl}
                                readonly
                            />
                        </div>
                        <div className="col-12 field">
                            <label>
                                Bairro
                            </label>
                            <InputText className="w-full" value={dados?.usuario.nombai}
                                readonly
                            />
                        </div>
                        <div className="col-12 field">
                            <label>
                                Cidade
                            </label>
                            <InputText className="w-full" value={dados?.usuario.nomcid}
                                readonly
                            />
                        </div>
                        <div className="col-12 flex flex-column mb-2">
                            <label>
                                Anexos
                            </label>
                            <InputText className="w-full" value={"Os anexos devem ser inseridos na Aba Anexos"}
                                readonly
                            />

                        </div>

                        <div className="col-12 field">
                            <Divider align="left" > Vale Transporte </Divider>
                            <label>
                                Escala Vale de transporte Atual
                            </label>
                            <InputText className="w-full" value={VTAtual}
                                readonly
                            />
                        </div>


                        <div className="col-12 field">
                            <label>Tipo de operação</label>
                            <Dropdown
                                value={operacaoSelecionada}
                                options={operacao}
                                className="w-full"
                                onChange={(e) => setOperacaoSelecionada(e.value)}
                            />
                        </div>

                        {
                            operacaoSelecionada?.cod == 1 &&
                            <>

                                <div className="col-12 field">
                                    <label>
                                        Nome da Operadora de Vale Transporte
                                    </label>
                                    <InputText className="w-full" value={"Empresa XPTO"}
                                        readonly
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Numero da Linha
                                    </label>
                                    <InputNumber className="w-full" value={999999}
                                        readonly
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Tipo de Transporte
                                    </label>
                                    <InputText className="w-full" value={'Onibus,Metro,Trem,Etc.'}
                                        readonly
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Valor da Tarifa
                                    </label>
                                    <InputNumber className="w-full" value={99.99}
                                        readonly
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Quantidade Utilizada para Ida
                                    </label>
                                    <InputNumber className="w-full" value={1}
                                        readonly
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Quantidade Utilizada para Volta
                                    </label>
                                    <InputNumber className="w-full" value={1}
                                        readonly
                                    />
                                </div>

                                <div className="col-4 field">
                                    <label>
                                        Escala Vale Transporte
                                    </label>
                                    <InputNumber className="w-full" value={1}
                                        readonly
                                    />
                                </div>
                                <div className="col-4 field">
                                    <FieldName required name='Data Início' />
                                    <Datepicker
                                        className='w-full'
                                        inputClassName='obrigatorio'
                                    />
                                </div>
                                <div className="col-4 field">
                                    <FieldName required name='Data Fim' />
                                    <Datepicker
                                        className='w-full'
                                        inputClassName='obrigatorio'
                                    />
                                </div>
                                <Divider align="left" > GRID </Divider>

                                <div className="col-3 field">
                                    <label>
                                        Linha 1
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 2
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 3
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 4
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 5
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 6
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                            </>
                        }
                        {
                            operacaoSelecionada?.cod == 2 &&
                            <>

                                <div className="col-12 field">
                                    <label>
                                        Nome da Operadora de Vale Transporte
                                    </label>
                                    <InputText className="w-full" value={"Empresa XPTO"}
                                        readonly
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Numero da Linha
                                    </label>
                                    <InputNumber className="w-full" value={999999}
                                        readonly
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Tipo de Transporte
                                    </label>
                                    <InputText className="w-full" value={'Onibus,Metro,Trem,Etc.'}
                                        readonly
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Valor da Tarifa
                                    </label>
                                    <InputNumber className="w-full" value={99.99}
                                        readonly
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Quantidade Utilizada para Ida
                                    </label>
                                    <InputNumber className="w-full" value={1}
                                        readonly
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Quantidade Utilizada para Volta
                                    </label>
                                    <InputNumber className="w-full" value={1}
                                        readonly
                                    />
                                </div>

                                <div className="col-4 field">
                                    <label>
                                        Escala Vale Transporte
                                    </label>
                                    <InputNumber className="w-full" value={1}
                                        readonly
                                    />
                                </div>
                                <div className="col-4 field">
                                    <FieldName required name='Data Início' />
                                    <Datepicker
                                        className='w-full'
                                        inputClassName='obrigatorio'
                                    />
                                </div>
                                <div className="col-4 field">
                                    <FieldName required name='Data Fim' />
                                    <Datepicker
                                        className='w-full'
                                        inputClassName='obrigatorio'
                                    />
                                </div>
                                <Divider align="left" > GRID </Divider>

                                <div className="col-3 field">
                                    <label>
                                        Linha 1
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 2
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 3
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 4
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 5
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field" />
                                <div className="col-3 field">
                                    <label>
                                        Linha 6
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Numero do Cartão
                                    </label>
                                    <InputNumber className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                            </>
                        }
                        {
                            operacaoSelecionada?.cod == 3 &&
                            <>
                                <div className="col-12 field">
                                    <FieldName name='Data Início' />
                                    <InputText
                                        readOnly
                                        className="w-full"
                                        value={DataInclusaoVT}
                                    />
                                </div>
                                <div className="col-12 field">
                                    <FieldName required name='Data Fim' />
                                    <Datepicker
                                        className='w-full'
                                        inputClassName='obrigatorio'
                                    />
                                </div>
                            </>
                        }
                    </>
                }


                {
                    motivoSelecionado?.cod == 4 &&
                    <>
                        <div className='field col-12'>
                            <FieldName name='Justifique' />
                            <InputTextarea
                                className='w-full'
                            />
                        </div>
                        <div className="col-12 field">
                            <label> Escolha o beneficio. </label>
                            <Dropdown
                                value={beneficioSelecionado}
                                options={beneficio}
                                className="w-full"
                                onChange={(e) => setBeneficioSelecionado(e.value)}
                            />
                        </div>
                        {
                            beneficioSelecionado?.cod == 1 &&
                            <>
                                {/* Vale Transporte */}

                                <div className="col-12 field">
                                    <Divider align="left" > Vale Transporte </Divider>
                                    <label>
                                        Escala Vale de transporte Atual
                                    </label>
                                    <InputText className="w-full" value={VTAtual}
                                        readonly
                                    />
                                </div>


                                <div className="col-12 field">
                                    <label>Tipo de operação</label>
                                    <Dropdown
                                        value={operacaoSelecionada}
                                        options={operacao}
                                        className="w-full"
                                        onChange={(e) => setOperacaoSelecionada(e.value)}
                                    />
                                </div>

                                {
                                    operacaoSelecionada?.cod == 1 &&
                                    <>

                                        <div className="col-12 field">
                                            <label>
                                                Nome da Operadora de Vale Transporte
                                            </label>
                                            <InputText className="w-full" value={"Empresa XPTO"}
                                                readonly
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Numero da Linha
                                            </label>
                                            <InputNumber className="w-full" value={999999}
                                                readonly
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Tipo de Transporte
                                            </label>
                                            <InputText className="w-full" value={'Onibus,Metro,Trem,Etc.'}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Valor da Tarifa
                                            </label>
                                            <InputNumber className="w-full" value={99.99}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Ida
                                            </label>
                                            <InputNumber className="w-full" value={1}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Volta
                                            </label>
                                            <InputNumber className="w-full" value={1}
                                                readonly
                                            />
                                        </div>

                                        <div className="col-4 field">
                                            <label>
                                                Escala Vale Transporte
                                            </label>
                                            <InputNumber className="w-full" value={1}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-4 field">
                                            <FieldName required name='Data Início' />
                                            <Datepicker
                                                className='w-full'
                                                inputClassName='obrigatorio'
                                            />
                                        </div>
                                        <div className="col-4 field">
                                            <FieldName required name='Data Fim' />
                                            <Datepicker
                                                className='w-full'
                                                inputClassName='obrigatorio'
                                            />
                                        </div>
                                        <Divider align="left" > GRID </Divider>

                                        <div className="col-3 field">
                                            <label>
                                                Linha 1
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 2
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 3
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 4
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 5
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 6
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                    </>
                                }
                                {
                                    operacaoSelecionada?.cod == 2 &&
                                    <>

                                        <div className="col-12 field">
                                            <label>
                                                Nome da Operadora de Vale Transporte
                                            </label>
                                            <InputText className="w-full" value={"Empresa XPTO"}
                                                readonly
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Numero da Linha
                                            </label>
                                            <InputNumber className="w-full" value={999999}
                                                readonly
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Tipo de Transporte
                                            </label>
                                            <InputText className="w-full" value={'Onibus,Metro,Trem,Etc.'}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Valor da Tarifa
                                            </label>
                                            <InputNumber className="w-full" value={99.99}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Ida
                                            </label>
                                            <InputNumber className="w-full" value={1}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Volta
                                            </label>
                                            <InputNumber className="w-full" value={1}
                                                readonly
                                            />
                                        </div>

                                        <div className="col-4 field">
                                            <label>
                                                Escala Vale Transporte
                                            </label>
                                            <InputNumber className="w-full" value={1}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-4 field">
                                            <FieldName required name='Data Início' />
                                            <Datepicker
                                                className='w-full'
                                                inputClassName='obrigatorio'
                                            />
                                        </div>
                                        <div className="col-4 field">
                                            <FieldName required name='Data Fim' />
                                            <Datepicker
                                                className='w-full'
                                                inputClassName='obrigatorio'
                                            />
                                        </div>
                                        <Divider align="left" > GRID </Divider>

                                        <div className="col-3 field">
                                            <label>
                                                Linha 1
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 2
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 3
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 4
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 5
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field" />
                                        <div className="col-3 field">
                                            <label>
                                                Linha 6
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-3 field">
                                            <label>
                                                Numero do Cartão
                                            </label>
                                            <InputNumber className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                    </>
                                }
                                {
                                    operacaoSelecionada?.cod == 3 &&
                                    <>
                                        <div className="col-12 field">
                                            <FieldName name='Data Início' />
                                            <InputText
                                                readOnly
                                                className="w-full"
                                                value={DataInclusaoVT}
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <FieldName required name='Data Fim' />
                                            <Datepicker
                                                className='w-full'
                                                inputClassName='obrigatorio'
                                            />
                                        </div>
                                    </>
                                }
                            </>
                        }

                        {
                            beneficioSelecionado?.cod == 2 &&
                            <>

                                {/* PLANO DE SAUDE */}

                                <div className="col-12 field">
                                    <Divider align="left" > Plano de Saude </Divider>
                                    <label>
                                        Plano Titular Atual + Data Inclusão
                                    </label>
                                    {console.log(dados)}
                                    <InputText className="w-full" value={PlanoAtual + ' | ' + DataInclusaoPlano}
                                        readonly
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Tipo de Operação
                                    </label>
                                    <Dropdown
                                        value={operacaoSelecionadaPlano}
                                        options={operacaoPlano}
                                        className="w-full"
                                        onChange={(e) => setOperacaoSelecionadaPlano(e.value)}
                                    />
                                </div>

                                {
                                    operacaoSelecionadaPlano?.cod == 1 &&
                                    <>
                                        <div className="col-12 field">
                                            <label>
                                                Plano Titular
                                            </label>
                                            <InputText className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <FieldName name='Data Inclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <FieldName name='Data Exclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>

                                        <Divider align="left" > Dependente </Divider>
                                        <div className="col-4 flex flex-column mb-2">
                                            <InputText className="w-full" placeholder='Dependente 1'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 2'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 3'
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Marque ou desmarque quem será incluído ou excluído do Plano.
                                            </label>
                                        </div>
                                        <div className="col-3 field">
                                            <input id="Manter" name="base" type="radio" value="S" />
                                            <label>
                                                Manter dependente no Plano
                                            </label>
                                            <label>
                                                <input id="Incluir" name="base" type="radio" value="S" />
                                                Esta ação irá incluir dependente no Plano
                                            </label>
                                            <label>
                                                <input id="Excluir" name="base" type="radio" value="S" />
                                                Esta ação irá excluir dependente no Plano
                                            </label>
                                        </div>
                                    </>
                                }

                                {
                                    operacaoSelecionadaPlano?.cod == 2 &&
                                    <>
                                        <div className="col-12 field">
                                            <label>
                                                Plano Titular
                                            </label>
                                            <InputText className="w-full" value={""}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-4 field">
                                            <FieldName name='Data Inclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>
                                        <div className="col-4 field">
                                            <FieldName name='Data Exclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>

                                        <Divider align="left" > Dependente </Divider>
                                        <div className="col-4 flex flex-column mb-2">
                                            <InputText className="w-full" placeholder='Dependente 1'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 2'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 3'
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Marque ou desmarque quem será incluído ou excluído do Plano.
                                            </label>
                                        </div>
                                        <div className="col-3 field">
                                            <input id="Manter" name="base" type="radio" value="S" />
                                            <label>
                                                Manter dependente no Plano
                                            </label>
                                            <label>
                                                <input id="Incluir" name="base" type="radio" value="S" />
                                                Esta ação irá incluir dependente no Plano
                                            </label>
                                            <label>
                                                <input id="Excluir" name="base" type="radio" value="S" />
                                                Esta ação irá excluir dependente no Plano
                                            </label>
                                        </div>
                                    </>
                                }

{
                                    operacaoSelecionadaPlano?.cod == 3 &&
                                    <>
                                        <div className="col-6 field">
                                            <label>
                                                Plano Titular Atual
                                            </label>
                                            <InputText className="w-full" value={PlanoAtual + ' | ' + DataInclusaoPlano}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-4 field">
                                            <FieldName name='Data Inclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>
                                        <div className="col-6 field">
                                            <FieldName name='Data Exclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>

                                        <Divider align="left" > Dependente </Divider>
                                        <div className="col-4 flex flex-column mb-2">
                                            <InputText className="w-full" placeholder='Dependente 1'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 2'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 3'
                                            />
                                        </div>

                                        <div className="col-3 field">
                                            <input id="Excluir1" name="base" type="radio" value="S" />
                                            <label>
                                                Excluir
                                            </label>
                                            <label>
                                                <input id="Excluir2" name="base" type="radio" value="S" />
                                                Excluir
                                            </label>
                                            <label>
                                                <input id="Excluir3" name="base" type="radio" value="S" />
                                                Excluir
                                            </label>
                                        </div>
                                    </>
                                }
                                {
                                    operacaoSelecionadaPlano?.cod == 4 &&
                                    <>
                                        <div className="col-6 field">
                                            <label>
                                                Plano Titular Atual
                                            </label>
                                            <InputText className="w-full" value={PlanoAtual + ' | ' + DataInclusaoPlano}
                                                readonly
                                            />
                                        </div>
                                        <div className="col-6 field">
                                            <FieldName name='Data Exclusão' />
                                            <Datepicker
                                                className='w-full'
                                            />
                                        </div>

                                        <Divider align="left" > Dependente </Divider>
                                        <div className="col-4 flex flex-column mb-2">
                                            <InputText className="w-full" placeholder='Dependente 1'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 2'
                                            />
                                            <InputText className="w-full" placeholder='Dependente 3'
                                            />
                                        </div>

                                        <div className="col-3 field">
                                            <input id="Excluir1" name="base" type="radio" value="S" />
                                            <label>
                                                Excluir
                                            </label>
                                            <label>
                                                <input id="Excluir2" name="base" type="radio" value="S" />
                                                Excluir
                                            </label>
                                            <label>
                                                <input id="Excluir3" name="base" type="radio" value="S" />
                                                Excluir
                                            </label>
                                        </div>
                                    </>
                                }

                            </>
                        }

                        {/* PLANO ODONTO */}

                        {
                            beneficioSelecionado?.cod == 3 &&
                            <>

                                <div className="col-12 field">
                                    <Divider align="left" > Plano Odonto </Divider>
                                    <label>
                                        Plano Titular Atual
                                    </label>
                                    <InputText className="w-full" value={""}
                                        readonly
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Tipo de Operação
                                    </label>
                                    <Dropdown
                                        value={operacaoSelecionadaPlano}
                                        options={operacaoPlano}
                                        className="w-full"
                                        onChange={(e) => setOperacaoSelecionadaPlano(e.value)}
                                    />
                                </div>
                                <div className="col-4 field">
                                    <FieldName name='Data Exclusão' />
                                    <Datepicker
                                        className='w-full'
                                    />
                                </div>

                                <Divider align="left" > Dependente </Divider>
                                <div className="col-4 flex flex-column mb-2">
                                    <InputText className="w-full" placeholder='Dependente 1'
                                    />
                                    <div className="col-3 field">
                                        <input id="Manter" name="base" type="checkbox" value="S" />
                                        <label>
                                            Excluir
                                        </label>
                                    </div>
                                    <InputText className="w-full" placeholder='Dependente 2'
                                    />
                                    <div className="col-3 field">
                                        <input id="Manter" name="base" type="checkbox" value="S" />
                                        <label>
                                            Excluir
                                        </label>
                                    </div>
                                    <InputText className="w-full" placeholder='Dependente 3'
                                    />
                                    <div className="col-3 field">
                                        <input id="Manter" name="base" type="checkbox" value="S" />
                                        <label>
                                            Excluir
                                        </label>
                                    </div>
                                </div>

                            </>
                        }

                        {/* VA/VR */}
                        {
                            beneficioSelecionado?.cod == 4 &&
                            <>

                                <Divider align="left" > VA / VR </Divider>


                                <div className="col-12 field">
                                    <label>
                                        Tipo de Operação
                                    </label>
                                    <Dropdown
                                        value={operacaoSelecionadaVale}
                                        options={operacaoVale}
                                        className="w-full"
                                        onChange={(e) => setOperacaoSelecionadaVale(e.value)}
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Codigo do Vale Anterior
                                    </label>
                                    <InputText className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field">
                                    <label>
                                        Tipo Vale
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-6 field">
                                    <label>
                                        Quantidade Vales
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Dia útil
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Sábado
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Domingo
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Feriado
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />

                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Codigo do Vale
                                    </label>
                                    <InputText className="w-full" value={""}
                                        readonly
                                    />
                                </div>
                                <div className="col-6 field">
                                    <label>
                                        Tipo Vale
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-6 field">
                                    <label>
                                        Quantidade Vales
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Dia útil
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Sábado
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Domingo
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                                <div className="col-3 field">
                                    <label>
                                        Quantidade Feriado
                                    </label>
                                    <InputText className="w-full" value={""}
                                    />
                                </div>
                            </>
                        }

                    </>
                }

            </div>
        </div>
    )
}