import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
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
import getDependentesColaborador from '../Services/getDependentesColaborador';
import ContentDivisor from '../components/ContentDivisor';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default function Tarefa_1() {
    const { globalState } = useGlobalState()

    const initialState = {
        usuario: globalState.usuario,
        nomevt: null,
        codlin: null,
        transporteSelecionado: "",
        valor: null,
        qtdida: 0,
        qtdvolta: 0,
        esc: null,
        datainivale: null,
        linha: null,
        cartao: null,
        motivoSelecionado: null,
        beneficioSelecionado: null,
        operacaoSelecionada: null,
        solicitante: null,
        novoperiodo: null,
        fimperiodo: null,
        inievt: null,
        escvtr: null,
        operadoraAtual: null,
        numerolinha: null,
        nomelinha: null
    }
    const motivoSolicitacao = [
        { label: 'Alteração de Unidade', cod: 1 },
        { label: 'Alteração de Escala', cod: 2 },
        { label: 'Alteração de Endereço', cod: 3 },
        { label: 'Outros (Justifique)', cod: 4 },
    ]
    const tipoTransporte = [
        { label: 'Onibus', cod: 1 },
        { label: 'Metro', cod: 2 },
        { label: 'Trem', cod: 3 },
        { label: 'Outro', cod: 4 }
    ]

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
    const [operadoraAtual, setOperadoraAtual] = useState("")
    const [DataInclusaoVT, setInclusaoVT] = useState("")
    const [escalaAtual, setEscalaAtual] = useState("")
    const [PlanoAtual, setPlanoSaude] = useState("")
    const [DataInclusaoPlano, setInclusaoPlano] = useState("")
    const [dependente, setDependentes] = useState([])
    const [linhasTransporte, setLinhasTransportes] = useState([{ linha: "", cartao: "" }])
    const [state, setState] = useState(initialState);
    const [numerolinha, setNumeroLinha] = useState("")
    const [nomelinha, setNomeLinha] = useState("")
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        getColaborador(globalState.usuario.subject).then((param) => {
            setDados(param)
            getEscalaAtualColaborador(param.usuario.numEmp, param.usuario.tipCol, param.usuario.numCad)
                .then((data) => {
                    if (data.escalas.nomevt) {
                        setOperadoraAtual(data.escalas.nomevt)
                        setState({ ...state, nomevt: data.escalas.nomevt })
                    }
                })
        })
    }, [])

    useEffect(() => {
        getColaborador(globalState.usuario.subject).then((param) => {
            setDados(param)
            getEscalaAtualColaborador(param.usuario.numEmp, param.usuario.tipCol, param.usuario.numCad)
                .then((data) => {
                    if (data.escalas.inievt) {
                        setInclusaoVT(data.escalas.inievt)
                        setState({ ...state, inievt: data.escalas.inievt })
                    }
                    if (data.escalas.escvtr) {
                        setEscalaAtual(data.escalas.escvtr)
                        setState({ ...state, escvtr: data.escalas.escvtr })
                    }
                })
        })
    }, [])

    useEffect(() => {
        getColaborador(globalState.usuario.subject).then((param) => {
            setDependentes(param)
            getDependentesColaborador(param.usuario.numEmp, param.usuario.tipCol, param.usuario.numCad)
                .then((d) => {
                    if (d.dependentes.length > 0) {
                        setDependentes(d.dependentes)
                    }
                })
        })
    }, [])

    useEffect(() => {
        getColaborador(globalState.usuario.subject).then((param) => {
            setNumeroLinha(param)
            getEscalaAtualColaborador(param.usuario.numEmp, param.usuario.tipCol, param.usuario.numCad)
                .then((l) => {
                    if (l.escalas.linhas.length > 0) {
                        // setNumeroLinha(l.escalas.linhas)
                        setTableData(l.escalas.linhas);
                    }
                })
        })
    }, [])

    useEffect(() => {
        getColaborador(globalState.usuario.subject).then((param) => {
            setNomeLinha(param)
            getEscalaAtualColaborador(param.usuario.numEmp, param.usuario.tipCol, param.usuario.numCad)
                .then((n) => {
                    if (n.escalas.linhas.length > 0) {
                        // setNomeLinha(n.escalas.linhas)
                        setTableData(n.escalas.linhas);
                    }
                })
        })
    }, [])

    useEffect(() => {
        getColaborador(globalState.usuario.subject).then((param) => {
            getPlanoSaudeAtualColaborador(param.usuario.numEmp, param.usuario.tipCol, param.usuario.numCad)
                .then((data) => {
                    if (data.colaboradores.length > 0) {
                        setPlanoSaude(data.colaboradores)
                    }
                })
        })
    }, [])

    // useEffect(() => {
    //     getColaborador(globalState.usuario.subject).then((dados) => {
    //         if (dados.usuario.nomFun) {
    //             setDados(dados.usuario.nomFun)
    //             setState({ ...state, solicitante: dados.usuario.nomFun })
    //         }
    //     })
    // }, [])


    // Salvar variaveis do processo
    useEffect(() => {
        GLOBAL.tarefa_1 = state;
        GLOBAL.consultaLinhas = tableData;
        console.log(state)
    }, [state])

    return (
        <div>

            <div className="col-12 field">
                <ContentDivisor content={"COLABORADOR"}
                    icon={"pi pi-user"} />
                <InputText
                    className="w-full"
                    value={dados?.usuario.numCad + " - " + dados?.usuario.nomFun}
                    readonly
                />
            </div>

            <ContentDivisor content={"BENEFICIOS"}
                icon={"pi pi-user"} />

            <div className="col-12 field">
                <label> Escolha o motivo da solicitação</label>
                <Dropdown
                    value={state.motivoSelecionado}
                    options={motivoSolicitacao}
                    className="w-full"
                    onChange={(e) => setState({ ...state, motivoSelecionado: e.value })}
                />
            </div>

            <div className="grid px-2" style={{ display: state.motivoSelecionado ? "" : "none" }}>

                {
                    state.motivoSelecionado?.cod === 1 &&
                    <>
                        <div className="col-12 field">

                            <ContentDivisor content={"Histórico Atual"}
                            />
                            <InputText
                                className="w-full"
                                value={dados?.empresa.datfil + ' | ' + dados?.empresa.numEmp + '-' + dados?.empresa.codFil + '-' + dados?.empresa.nomFil}
                                readonly
                            />
                        </div>
                        <div className="col-12 field">
                            <label> Escolha o beneficio. </label>
                            <Dropdown
                                value={state.beneficioSelecionado}
                                options={beneficio}
                                className="w-full"
                                onChange={(e) => setState({ ...state, beneficioSelecionado: e.value })}
                            />
                        </div>

                        {/* Vale Transporte */}
                        {

                            state.beneficioSelecionado?.cod === 1 &&
                            <>

                                <div className="col-12 field">
                                    <ContentDivisor content={"Vale Transporte"}
                                    />
                                    <label>
                                        Escala Vale Transporte Atual
                                    </label>
                                    <InputText
                                        className="w-full"
                                        value={escalaAtual}
                                    />
                                    <label>
                                        Nome da Operadora de Vale Transporte
                                    </label>
                                    <InputText
                                        className="w-full"
                                        value={operadoraAtual}
                                        onChange={(e) => setState({ ...state, nomevt: e.value })}
                                    />
                                    <Divider align="left" > Linhas </Divider>
                                    <DataTable
                                        value={tableData}
                                        emptyMessage={'Nenhum resultado encontrado'}
                                        loading={tableData == []}
                                        size='small'
                                        accept='application/pdf'
                                        scrollable
                                        scrollHeight='20rem'
                                        header='Linhas de Vale Transporte'
                                        tableClassName='text-700'
                                    >
                                        <Column
                                            header='Linha'
                                            field='codlin'
                                        />
                                        <Column
                                            header='Nome da Linha'
                                            field='nomlin'
                                        />
                                    </DataTable>

                                    {
                                        numerolinha.length > 0 && numerolinha?.map(l => (
                                            <div className="col-4 flex flex-column mb-2">
                                                <InputText className="w-full" value={l.codlin}
                                                    readonly
                                                />
                                            </div>
                                        ))

                                    }

                                    {
                                        nomelinha.length > 0 && nomelinha?.map(n => (
                                            <div className="col-4 flex flex-column mb-2">
                                                <InputText className="w-full" value={n.nomlin}
                                                    readonly
                                                />
                                            </div>
                                        ))

                                    }

                                </div>


                                <div className="col-12 field">
                                    <label>Tipo de operação</label>
                                    <Dropdown
                                        value={state.operacaoSelecionada}
                                        options={operacao}
                                        className="w-full"
                                        onChange={(e) => setState({ ...state, operacaoSelecionada: e.value })}
                                    />
                                </div>

                                {
                                    state.operacaoSelecionada?.cod === 1 &&
                                    <>
                                        <div className="col-12 field">
                                            <FieldName required name='Data Início' />
                                            <Datepicker
                                                className='w-full'
                                                value={state.datainivale}
                                                onChange={(e) => setState({ ...state, datainivale: new Date(e.value).toLocaleDateString() })}
                                                inputClassName='obrigatorio'
                                            />

                                            <label>
                                                Nome da Operadora
                                            </label>
                                            <InputText
                                                className="w-full"
                                                value={state.nomevt}
                                                onChange={(e) => setState({ ...state, nomevt: e.value })}
                                            />
                                            <label>
                                                Numero da Linha
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.codlin}
                                                onChange={(e) => setState({ ...state, codlin: e.value })}
                                            />

                                            <label>
                                                Tipo de Transporte
                                            </label>
                                            <Dropdown
                                                value={state.transporteSelecionado}
                                                options={tipoTransporte}
                                                className="w-full"
                                                onChange={(e) => setState({ ...state, transporteSelecionado: e.value })}
                                            />

                                            <label>
                                                Valor da Tarifa
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.valor}
                                                mode="decimal" minFractionDigits={2}
                                                onChange={(e) => setState({ ...state, valor: e.value })}
                                            />
                                            <label>
                                                Quantidade Utilizada para Ida
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.qtdida}
                                                onChange={(e) => setState({ ...state, qtdida: e.value })}
                                            />
                                            <label>
                                                Quantidade Utilizada para Volta
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.qtdvolta}
                                                onChange={(volta) => setState({ ...state, qtdvolta: volta.value })}
                                            />
                                        </div>

                                        {/* <div className="col-4 field">
                                            <label>
                                                Escala Vale Transporte
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.esc}
                                                onChange={(e) => setState({ ...state, escvtr: e.value })}
                                            />
                                        </div> */}

                                        {/* <ContentDivisor content={"LINHA / CARTÃO"}
                                        />

                                        {
                                            linhasTransporte.map(l => (
                                                <>
                                                    <div className="col-3 field">
                                                        <label>
                                                            Linha 1
                                                        </label>
                                                        <InputNumber
                                                            className="w-full"
                                                            value={l.linha}
                                                            onChange={(e) => setState({ ...state, linha: e.value })}
                                                        />
                                                    </div>
                                                    <div className="col-3 field">
                                                        <label>
                                                            Numero do Cartão
                                                        </label>
                                                        <InputNumber
                                                            className="w-full"
                                                            value={l.cartao}
                                                            onChange={(e) => setState({ ...state, cartao: e.value })}
                                                        />
                                                    </div>
                                                    <div className="col-6 field" />
                                                </>
                                            ))
                                        } */}
                                    </>
                                }

                                {
                                    state.operacaoSelecionada?.cod === 2 &&
                                    <>

                                        <div className="col-12 field">

                                            <FieldName required name='Data Início' />
                                            <Datepicker
                                                className='w-full'
                                                value={state.datainivale}
                                                onChange={(e) => setState({ ...state, datainivale: e.value })}
                                                inputClassName='obrigatorio'
                                            />

                                            <label>
                                                Numero da Linha
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.codlin}
                                                onChange={(e) => setState({ ...state, codlin: e.value })}
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Tipo de Transporte
                                            </label>
                                            <Dropdown
                                                value={state.transporteSelecionado}
                                                options={tipoTransporte}
                                                className="w-full"
                                                onChange={(e) => setState({ ...state, transporteSelecionado: e.value })}
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Valor da Tarifa
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.valor}
                                                mode="decimal" minFractionDigits={2}
                                                onChange={(e) => setState({ ...state, valor: e.value })}
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Ida
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.qtdida}
                                                onChange={(e) => setState({ ...state, qtdida: e.value })}
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Volta
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.qtdvolta}
                                                onChange={(volta) => setState({ ...state, qtdvolta: volta.value })}
                                            />
                                        </div>


                                    </>
                                }
                                {
                                    state.operacaoSelecionada?.cod === 3 &&
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
                                                value={state.fimperiodo}
                                                onChange={(e) => setState({ ...state, fimperiodo: new Date(e.value).toLocaleDateString })}
                                            />
                                        </div>
                                    </>
                                }
                            </>

                        }

                        {/* Plano de saude */}
                        {
                            state.beneficioSelecionado?.cod === 2 &&
                            <>

                                <div className="col-12 field">
                                    <ContentDivisor content={"Plano de Saúde"}
                                    />
                                    {console.log("Plano atual : ", PlanoAtual)}
                                    <label>
                                        Plano Titular Atual + Data Inclusão
                                    </label>

                                    <InputText className="w-full" value={PlanoAtual}
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
                                    operacaoSelecionadaPlano?.cod === 1 &&
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
                                        {
                                            dependente.length > 0 && dependente?.map(dep => (
                                                <div className="col-4 flex flex-column mb-2">
                                                    <InputText className="w-full" value={dep.nomdep}
                                                        readonly
                                                    />
                                                </div>
                                            ))

                                        }
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
                                    operacaoSelecionadaPlano?.cod === 2 &&
                                    <>
                                        <div className="col-12 field">
                                            <label>
                                                Plano Titular
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
                                                readonly
                                            />
                                        </div>

                                        <Divider align="left" > Dependente </Divider>
                                        {
                                            dependente.length > 0 && dependente?.map(dep => (
                                                <div className="col-4 flex flex-column mb-2">
                                                    <InputText className="w-full" value={dep.nomdep}
                                                        readonly
                                                    />
                                                </div>
                                            ))

                                        }
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
                                    operacaoSelecionadaPlano?.cod === 3 &&
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
                                                readonly
                                            />
                                        </div>

                                        <Divider align="left" > Dependente </Divider>
                                        {
                                            dependente.length > 0 && dependente?.map(dep => (
                                                <div className="col-4 flex flex-column mb-2">
                                                    <InputText className="w-full" value={dep.nomdep}
                                                        readonly
                                                    />
                                                </div>
                                            ))

                                        }

                                        <div className="col-3 field">
                                            <input id="Excluir" name="base" type="radio" value="S" />
                                            <label>
                                                Excluir
                                            </label>
                                        </div>
                                    </>
                                }
                                {
                                    operacaoSelecionadaPlano?.cod === 4 &&
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
                                        {
                                            dependente.length > 0 && dependente?.map(dep => (
                                                <div className="col-4 flex flex-column mb-2">
                                                    <InputText className="w-full" value={dep.nomdep}
                                                        readonly
                                                    />
                                                </div>
                                            ))

                                        }

                                        <div className="col-3 field">
                                            <input id="Excluir" name="base" type="radio" value="S" />
                                            <label>
                                                Excluir
                                            </label>
                                        </div>
                                    </>
                                }

                            </>
                        }

                        {/* PLANO ODONTO */}

                        {
                            state.beneficioSelecionado?.cod === 3 &&
                            <>

                                <div className="col-12 field">
                                    <ContentDivisor content={"Odonto"}
                                    />
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
                                {
                                    dependente.length > 0 && dependente?.map(dep => (
                                        <div className="col-4 flex flex-column mb-2">
                                            <InputText className="w-full" value={dep.nomdep}
                                                readonly
                                            />
                                        </div>
                                    ))

                                }

                            </>
                        }

                        {/* VA/VR */}
                        {
                            state.beneficioSelecionado?.cod === 4 &&
                            <>

                                <ContentDivisor content={"VA / VR"}
                                />


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
                    state.motivoSelecionado?.cod === 2 &&
                    <>
                        <div className="col-12 field">

                            <ContentDivisor content={"Histórico Atual"}
                            />
                            <InputText
                                className="w-full"
                                value={dados?.empresa.datfil + ' | ' + dados?.empresa.numEmp + '-' + dados?.empresa.codFil + '-' + dados?.empresa.nomFil}
                                readonly
                            />
                            <label>
                                Para qual Período Deseja Solicitar a Alteração?
                            </label>
                            <InputText className="w-full" value={dados?.empresa.datfil + ' | ' + dados?.usuario.escala}
                                readonly
                            />
                        
                        </div>
                        <div className="col-12 field">
                            <label> Escolha o beneficio. </label>
                            <Dropdown
                                value={state.beneficioSelecionado}
                                options={beneficio}
                                className="w-full"
                                onChange={(e) => setState({ ...state, beneficioSelecionado: e.value })}
                            />
                        </div>
                        {

                            state.beneficioSelecionado?.cod === 1 &&
                            <>

                                <div className="col-12 field">
                                    <ContentDivisor content={"Vale Transporte"}
                                    />
                                    <label>
                                        Escala Vale Transporte Atual
                                    </label>
                                    <InputText
                                        className="w-full"
                                        value={escalaAtual}
                                    />
                                    <label>
                                        Nome da Operadora de Vale Transporte
                                    </label>
                                    <InputText
                                        className="w-full"
                                        value={operadoraAtual}
                                        onChange={(e) => setState({ ...state, nomevt: e.value })}
                                    />
                                    <Divider align="left" > Linhas </Divider>
                                    <DataTable
                                        value={tableData}
                                        emptyMessage={'Nenhum resultado encontrado'}
                                        loading={tableData == []}
                                        size='small'
                                        accept='application/pdf'
                                        scrollable
                                        scrollHeight='20rem'
                                        header='Linhas de Vale Transporte'
                                        tableClassName='text-700'
                                    >
                                        <Column
                                            header='Linha'
                                            field='codlin'
                                        />
                                        <Column
                                            header='Nome da Linha'
                                            field='nomlin'
                                        />
                                    </DataTable>

                                    {
                                        numerolinha.length > 0 && numerolinha?.map(l => (
                                            <div className="col-4 flex flex-column mb-2">
                                                <InputText className="w-full" value={l.codlin}
                                                    readonly
                                                />
                                            </div>
                                        ))

                                    }

                                    {
                                        nomelinha.length > 0 && nomelinha?.map(n => (
                                            <div className="col-4 flex flex-column mb-2">
                                                <InputText className="w-full" value={n.nomlin}
                                                    readonly
                                                />
                                            </div>
                                        ))

                                    }

                                </div>


                                <div className="col-12 field">
                                    <label>Tipo de operação</label>
                                    <Dropdown
                                        value={state.operacaoSelecionada}
                                        options={operacao}
                                        className="w-full"
                                        onChange={(e) => setState({ ...state, operacaoSelecionada: e.value })}
                                    />
                                </div>

                                {
                                    state.operacaoSelecionada?.cod === 1 &&
                                    <>
                                        <div className="col-12 field">
                                            <FieldName required name='Data Início' />
                                            <Datepicker
                                                className='w-full'
                                                value={state.datainivale}
                                                onChange={(e) => setState({ ...state, datainivale: new Date(e.value).toLocaleDateString() })}
                                                inputClassName='obrigatorio'
                                            />

                                            <label>
                                                Nome da Operadora
                                            </label>
                                            <InputText
                                                className="w-full"
                                                value={state.nomevt}
                                                onChange={(e) => setState({ ...state, nomevt: e.value })}
                                            />
                                            <label>
                                                Numero da Linha
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.codlin}
                                                onChange={(e) => setState({ ...state, codlin: e.value })}
                                            />

                                            <label>
                                                Tipo de Transporte
                                            </label>
                                            <Dropdown
                                                value={state.transporteSelecionado}
                                                options={tipoTransporte}
                                                className="w-full"
                                                onChange={(e) => setState({ ...state, transporteSelecionado: e.value })}
                                            />

                                            <label>
                                                Valor da Tarifa
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.valor}
                                                mode="decimal" minFractionDigits={2}
                                                onChange={(e) => setState({ ...state, valor: e.value })}
                                            />
                                            <label>
                                                Quantidade Utilizada para Ida
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.qtdida}
                                                onChange={(e) => setState({ ...state, qtdida: e.value })}
                                            />
                                            <label>
                                                Quantidade Utilizada para Volta
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.qtdvolta}
                                                onChange={(volta) => setState({ ...state, qtdvolta: volta.value })}
                                            />
                                        </div>

                                        {/* <div className="col-4 field">
                <label>
                    Escala Vale Transporte
                </label>
                <InputNumber
                    className="w-full"
                    value={state.esc}
                    onChange={(e) => setState({ ...state, escvtr: e.value })}
                />
            </div> */}

                                        {/* <ContentDivisor content={"LINHA / CARTÃO"}
            />

            {
                linhasTransporte.map(l => (
                    <>
                        <div className="col-3 field">
                            <label>
                                Linha 1
                            </label>
                            <InputNumber
                                className="w-full"
                                value={l.linha}
                                onChange={(e) => setState({ ...state, linha: e.value })}
                            />
                        </div>
                        <div className="col-3 field">
                            <label>
                                Numero do Cartão
                            </label>
                            <InputNumber
                                className="w-full"
                                value={l.cartao}
                                onChange={(e) => setState({ ...state, cartao: e.value })}
                            />
                        </div>
                        <div className="col-6 field" />
                    </>
                ))
            } */}
                                    </>
                                }

                                {
                                    state.operacaoSelecionada?.cod === 2 &&
                                    <>

                                        <div className="col-12 field">

                                            <FieldName required name='Data Início' />
                                            <Datepicker
                                                className='w-full'
                                                value={state.datainivale}
                                                onChange={(e) => setState({ ...state, datainivale: e.value })}
                                                inputClassName='obrigatorio'
                                            />

                                            <label>
                                                Numero da Linha
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.codlin}
                                                onChange={(e) => setState({ ...state, codlin: e.value })}
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Tipo de Transporte
                                            </label>
                                            <Dropdown
                                                value={state.transporteSelecionado}
                                                options={tipoTransporte}
                                                className="w-full"
                                                onChange={(e) => setState({ ...state, transporteSelecionado: e.value })}
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Valor da Tarifa
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.valor}
                                                mode="decimal" minFractionDigits={2}
                                                onChange={(e) => setState({ ...state, valor: e.value })}
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Ida
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.qtdida}
                                                onChange={(e) => setState({ ...state, qtdida: e.value })}
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Volta
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.qtdvolta}
                                                onChange={(volta) => setState({ ...state, qtdvolta: volta.value })}
                                            />
                                        </div>


                                    </>
                                }
                                {
                                    state.operacaoSelecionada?.cod === 3 &&
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
                                                value={state.fimperiodo}
                                                onChange={(e) => setState({ ...state, fimperiodo: new Date(e.value).toLocaleDateString })}
                                            />
                                        </div>
                                    </>
                                }
                            </>

                        }
                    </>
                }


                {
                    state.motivoSelecionado?.cod === 3 &&
                    <>
                        {/* Vale Transporte motivo 3 */}
                        <div className="col-12 field">

                            <ContentDivisor content={"Histórico Atual"}
                            />
                            <InputText
                                className="w-full"
                                value={dados?.empresa.datfil + ' | ' + dados?.empresa.numEmp + '-' + dados?.empresa.codFil + '-' + dados?.empresa.nomFil}
                                readonly
                            />
                        </div>
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
                            <ContentDivisor content={"Vale Transporte"}
                            />
                            <label>
                                Escala Vale de transporte Atual
                            </label>
                            <InputText
                                className="w-full"
                                value={escalaAtual}
                            />
                            <label>
                                Nome da Operadora de Vale Transporte
                            </label>
                            <InputText
                                className="w-full"
                                value={operadoraAtual}
                                onChange={(e) => setState({ ...state, operadoraAtual: e.value })}
                            />
                        </div>

                        <div className="col-12 field">
                            <label>Tipo de operação</label>
                            <Dropdown
                                value={state.operacaoSelecionada}
                                options={operacao}
                                className="w-full"
                                onChange={(e) => setState({ ...state, operacaoSelecionada: e.value })}
                            />
                        </div>


                        {
                            state.operacaoSelecionada?.cod === 1 &&
                            <>
                                <div className="col-12 field">
                                    <FieldName required name='Data Início' />
                                    <Datepicker
                                        className='w-full'
                                        value={state.datainivale}
                                        onChange={(e) => setState({ ...state, datainivale: new Date(e.value).toLocaleDateString() })}
                                        inputClassName='obrigatorio'
                                    />

                                    <label>
                                        Nome da Operadora
                                    </label>
                                    <InputText
                                        className="w-full"
                                        value={state.nomevt}
                                        onChange={(e) => setState({ ...state, nomevt: e.value })}
                                    />
                                    <label>
                                        Numero da Linha
                                    </label>
                                    <InputNumber
                                        className="w-full"
                                        value={state.codlin}
                                        onChange={(e) => setState({ ...state, codlin: e.value })}
                                    />

                                    <label>
                                        Tipo de Transporte
                                    </label>
                                    <Dropdown
                                        value={state.transporteSelecionado}
                                        options={tipoTransporte}
                                        className="w-full"
                                        onChange={(e) => setState({ ...state, transporteSelecionado: e.value })}
                                    />

                                    <label>
                                        Valor da Tarifa
                                    </label>
                                    <InputNumber
                                        className="w-full"
                                        value={state.valor}
                                        mode="decimal" minFractionDigits={2}
                                        onChange={(e) => setState({ ...state, valor: e.value })}
                                    />
                                    <label>
                                        Quantidade Utilizada para Ida
                                    </label>
                                    <InputNumber
                                        className="w-full"
                                        value={state.qtdida}
                                        onChange={(e) => setState({ ...state, qtdida: e.value })}
                                    />
                                    <label>
                                        Quantidade Utilizada para Volta
                                    </label>
                                    <InputNumber
                                        className="w-full"
                                        value={state.qtdvolta}
                                        onChange={(volta) => setState({ ...state, qtdvolta: volta.value })}
                                    />
                                </div>

                                {/* <div className="col-4 field">
                                            <label>
                                                Escala Vale Transporte
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.esc}
                                                onChange={(e) => setState({ ...state, escvtr: e.value })}
                                            />
                                        </div> */}

                                {/* <ContentDivisor content={"LINHA / CARTÃO"}
                                        />

                                        {
                                            linhasTransporte.map(l => (
                                                <>
                                                    <div className="col-3 field">
                                                        <label>
                                                            Linha 1
                                                        </label>
                                                        <InputNumber
                                                            className="w-full"
                                                            value={l.linha}
                                                            onChange={(e) => setState({ ...state, linha: e.value })}
                                                        />
                                                    </div>
                                                    <div className="col-3 field">
                                                        <label>
                                                            Numero do Cartão
                                                        </label>
                                                        <InputNumber
                                                            className="w-full"
                                                            value={l.cartao}
                                                            onChange={(e) => setState({ ...state, cartao: e.value })}
                                                        />
                                                    </div>
                                                    <div className="col-6 field" />
                                                </>
                                            ))
                                        } */}
                            </>
                        }

                        {
                            state.operacaoSelecionada?.cod === 2 &&
                            <>

                                <div className="col-12 field">

                                    <FieldName required name='Data Início' />
                                    <Datepicker
                                        className='w-full'
                                        value={state.datainivale}
                                        onChange={(e) => setState({ ...state, datainivale: e.value })}
                                        inputClassName='obrigatorio'
                                    />

                                    <label>
                                        Numero da Linha
                                    </label>
                                    <InputNumber
                                        className="w-full"
                                        value={state.codlin}
                                        onChange={(e) => setState({ ...state, codlin: e.value })}
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>
                                        Tipo de Transporte
                                    </label>
                                    <Dropdown
                                        value={state.transporteSelecionado}
                                        options={tipoTransporte}
                                        className="w-full"
                                        onChange={(e) => setState({ ...state, transporteSelecionado: e.value })}
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Valor da Tarifa
                                    </label>
                                    <InputNumber
                                        className="w-full"
                                        value={state.valor}
                                        mode="decimal" minFractionDigits={2}
                                        onChange={(e) => setState({ ...state, valor: e.value })}
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Quantidade Utilizada para Ida
                                    </label>
                                    <InputNumber
                                        className="w-full"
                                        value={state.qtdida}
                                        onChange={(e) => setState({ ...state, qtdida: e.value })}
                                    />
                                </div>
                                <div className="col-12 field">
                                    <label>
                                        Quantidade Utilizada para Volta
                                    </label>
                                    <InputNumber
                                        className="w-full"
                                        value={state.qtdvolta}
                                        onChange={(volta) => setState({ ...state, qtdvolta: volta.value })}
                                    />
                                </div>


                            </>
                        }
                        {
                            state.operacaoSelecionada?.cod === 3 &&
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
                                        value={state.fimperiodo}
                                        onChange={(e) => setState({ ...state, fimperiodo: new Date(e.value).toLocaleDateString })}
                                    />
                                </div>
                            </>
                        }
                    </>
                }


                {
                    state.motivoSelecionado?.cod === 4 &&
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
                                value={state.beneficioSelecionado}
                                options={beneficio}
                                className="w-full"
                                onChange={(e) => setState({ ...state, beneficioSelecionado: e.value })}
                            />
                        </div>
                        {
                            state.beneficioSelecionado?.cod === 1 &&
                            <>
                                {/* Vale Transporte */}

                                <div className="col-12 field">
                                    <ContentDivisor content={"Vale Transporte"}
                                    />
                                    <label>
                                        Escala Vale de transporte Atual
                                    </label>
                                    <InputText
                                        className="w-full"
                                        value={escalaAtual}
                                    />
                                    <label>
                                        Nome da Operadora de Vale Transporte
                                    </label>
                                    <InputText
                                        className="w-full"
                                        value={operadoraAtual}
                                        onChange={(e) => setState({ ...state, operadoraAtual: e.value })}
                                    />
                                </div>

                                <div className="col-12 field">
                                    <label>Tipo de operação</label>
                                    <Dropdown
                                        value={state.operacaoSelecionada}
                                        options={operacao}
                                        className="w-full"
                                        onChange={(e) => setState({ ...state, operacaoSelecionada: e.value })}
                                    />
                                </div>


                                {
                                    state.operacaoSelecionada?.cod === 1 &&
                                    <>
                                        <div className="col-12 field">
                                            <FieldName required name='Data Início' />
                                            <Datepicker
                                                className='w-full'
                                                value={state.datainivale}
                                                onChange={(e) => setState({ ...state, datainivale: new Date(e.value).toLocaleDateString() })}
                                                inputClassName='obrigatorio'
                                            />

                                            <label>
                                                Nome da Operadora
                                            </label>
                                            <InputText
                                                className="w-full"
                                                value={state.nomevt}
                                                onChange={(e) => setState({ ...state, nomevt: e.value })}
                                            />
                                            <label>
                                                Numero da Linha
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.codlin}
                                                onChange={(e) => setState({ ...state, codlin: e.value })}
                                            />

                                            <label>
                                                Tipo de Transporte
                                            </label>
                                            <Dropdown
                                                value={state.transporteSelecionado}
                                                options={tipoTransporte}
                                                className="w-full"
                                                onChange={(e) => setState({ ...state, transporteSelecionado: e.value })}
                                            />

                                            <label>
                                                Valor da Tarifa
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.valor}
                                                mode="decimal" minFractionDigits={2}
                                                onChange={(e) => setState({ ...state, valor: e.value })}
                                            />
                                            <label>
                                                Quantidade Utilizada para Ida
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.qtdida}
                                                onChange={(e) => setState({ ...state, qtdida: e.value })}
                                            />
                                            <label>
                                                Quantidade Utilizada para Volta
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.qtdvolta}
                                                onChange={(volta) => setState({ ...state, qtdvolta: volta.value })}
                                            />
                                        </div>

                                        {/* <div className="col-4 field">
                                            <label>
                                                Escala Vale Transporte
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.esc}
                                                onChange={(e) => setState({ ...state, escvtr: e.value })}
                                            />
                                        </div> */}

                                        {/* <ContentDivisor content={"LINHA / CARTÃO"}
                                        />

                                        {
                                            linhasTransporte.map(l => (
                                                <>
                                                    <div className="col-3 field">
                                                        <label>
                                                            Linha 1
                                                        </label>
                                                        <InputNumber
                                                            className="w-full"
                                                            value={l.linha}
                                                            onChange={(e) => setState({ ...state, linha: e.value })}
                                                        />
                                                    </div>
                                                    <div className="col-3 field">
                                                        <label>
                                                            Numero do Cartão
                                                        </label>
                                                        <InputNumber
                                                            className="w-full"
                                                            value={l.cartao}
                                                            onChange={(e) => setState({ ...state, cartao: e.value })}
                                                        />
                                                    </div>
                                                    <div className="col-6 field" />
                                                </>
                                            ))
                                        } */}
                                    </>
                                }

                                {
                                    state.operacaoSelecionada?.cod === 2 &&
                                    <>

                                        <div className="col-12 field">

                                            <FieldName required name='Data Início' />
                                            <Datepicker
                                                className='w-full'
                                                value={state.datainivale}
                                                onChange={(e) => setState({ ...state, datainivale: e.value })}
                                                inputClassName='obrigatorio'
                                            />

                                            <label>
                                                Numero da Linha
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.codlin}
                                                onChange={(e) => setState({ ...state, codlin: e.value })}
                                            />
                                        </div>

                                        <div className="col-12 field">
                                            <label>
                                                Tipo de Transporte
                                            </label>
                                            <Dropdown
                                                value={state.transporteSelecionado}
                                                options={tipoTransporte}
                                                className="w-full"
                                                onChange={(e) => setState({ ...state, transporteSelecionado: e.value })}
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Valor da Tarifa
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.valor}
                                                mode="decimal" minFractionDigits={2}
                                                onChange={(e) => setState({ ...state, valor: e.value })}
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Ida
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.qtdida}
                                                onChange={(e) => setState({ ...state, qtdida: e.value })}
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label>
                                                Quantidade Utilizada para Volta
                                            </label>
                                            <InputNumber
                                                className="w-full"
                                                value={state.qtdvolta}
                                                onChange={(volta) => setState({ ...state, qtdvolta: volta.value })}
                                            />
                                        </div>


                                    </>
                                }
                                {
                                    state.operacaoSelecionada?.cod === 3 &&
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
                                                value={state.fimperiodo}
                                                onChange={(e) => setState({ ...state, fimperiodo: new Date(e.value).toLocaleDateString })}
                                            />
                                        </div>
                                    </>
                                }
                            </>
                        }

                        {
                            state.beneficioSelecionado?.cod === 2 &&
                            <>

                                {/* PLANO DE SAUDE */}

                                <div className="col-12 field">
                                    <ContentDivisor content={"Plano de Saúde"}
                                    />
                                    <label>
                                        Plano Titular Atual + Data Inclusão
                                    </label>
                                    {console.log(state)}
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
                                    operacaoSelecionadaPlano?.cod === 1 &&
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
                                        {
                                            dependente.length > 0 && dependente?.map(dep => (
                                                <div className="col-4 flex flex-column mb-2">
                                                    <InputText className="w-full" value={dep.nomdep}
                                                        readonly
                                                    />
                                                </div>
                                            ))

                                        }

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
                                    operacaoSelecionadaPlano?.cod === 2 &&
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
                                        {
                                            dependente.length > 0 && dependente?.map(dep => (
                                                <div className="col-4 flex flex-column mb-2">
                                                    <InputText className="w-full" value={dep.nomdep}
                                                        readonly
                                                    />
                                                </div>
                                            ))

                                        }

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
                                    operacaoSelecionadaPlano?.cod === 3 &&
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
                                        {
                                            dependente.length > 0 && dependente?.map(dep => (
                                                <div className="col-4 flex flex-column mb-2">
                                                    <InputText className="w-full" value={dep.nomdep}
                                                        readonly
                                                    />
                                                </div>
                                            ))

                                        }

                                        <div className="col-3 field">
                                            <input id="Excluir" name="base" type="radio" value="S" />
                                            <label>
                                                Excluir
                                            </label>
                                        </div>
                                    </>
                                }
                                {
                                    operacaoSelecionadaPlano?.cod === 4 &&
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
                                        {
                                            dependente.length > 0 && dependente?.map(dep => (
                                                <div className="col-4 flex flex-column mb-2">
                                                    <InputText className="w-full" value={dep.nomdep}
                                                        readonly
                                                    />
                                                </div>
                                            ))

                                        }

                                        <div className="col-3 field">
                                            <input id="Excluir" name="base" type="radio" value="S" />
                                            <label>
                                                Excluir
                                            </label>
                                        </div>
                                    </>
                                }

                            </>
                        }

                        {/* PLANO ODONTO */}

                        {
                            state.beneficioSelecionado?.cod === 3 &&
                            <>

                                <div className="col-12 field">
                                    <ContentDivisor content={"Odonto"}
                                    />
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
                                {
                                    dependente.length > 0 && dependente?.map(dep => (
                                        <div className="col-4 flex flex-column mb-2">
                                            <InputText className="w-full" value={dep.nomdep}
                                                readonly
                                            />
                                        </div>
                                    ))

                                }

                            </>
                        }

                        {/* VA/VR */}
                        {
                            state.beneficioSelecionado?.cod === 4 &&
                            <>

                                <ContentDivisor content={"VA / VR"}
                                />


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