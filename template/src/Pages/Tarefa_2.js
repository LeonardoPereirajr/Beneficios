import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { useState, useEffect } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import React from 'react'
import useGlobalState from '../globalState';
import GLOBAL from '../integration/storage.json'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button';
import getColaborador from '../Services/getColaborador';
import FieldName from '../components/FieldName';
import { Datepicker } from '../components/Datepicker';
import getEscalaAtualColaborador from '../Services/getEscalaAtualColaborador';
import getPlanoSaudeAtualColaborador from '../Services/getPlanoSaudeAtualColaborador';
import getDependentesColaborador from '../Services/getDependentesColaborador';
import ContentDivisor from '../components/ContentDivisor';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import getEscalasLinhas from '../Services/getEscalasLinhas';


export default function Tarefa_2() {

    const { globalState } = useGlobalState()

    console.log(globalState.variaveisProcesso)

    let initialState = {
        solicitante: GLOBAL.tarefa_1.solicitante,
        nomevt: globalState.variaveisProcesso.nomevt,
        codlin: globalState.variaveisProcesso.codlin,
        valor: globalState.variaveisProcesso.valor,
        qtdida: globalState.variaveisProcesso.qtdida,
        qtdvolta: globalState.variaveisProcesso.qtdvolta,
        esc: globalState.variaveisProcesso.esc,
        datainivale: globalState.variaveisProcesso.datainivale,
        linha: globalState.variaveisProcesso.linha,
        cartao: globalState.variaveisProcesso.cartao,
        motivoSelecionado: globalState.variaveisProcesso.motivoSelecionado,
        beneficioSelecionado: globalState.variaveisProcesso.beneficioSelecionado.label,
        operacaoSelecionada: globalState.variaveisProcesso.operacaoSelecionada,
        transporteSelecionado: globalState.variaveisProcesso.transporteSelecionado,
        VTAtual: globalState.variaveisProcesso.VTAtual,
        novoperiodo: globalState.variaveisProcesso.novoperiodo,
        fimperiodo: globalState.variaveisProcesso.fimperiodo,
        escvtr: globalState.variaveisProcesso.escvtr,
        numerolinha: globalState.variaveisProcesso.codlin,
        nomelinha: globalState.variaveisProcesso.nomlin,
        inievt: globalState.variaveisProcesso.inievt
    }

    const [motivoSelecionado, setMotivoSelecionado] = useState(null)
    const [transporteSelecionado, setTransportes] = useState(null)
    const [operacaoSelecionada, setOperacaoSelecionada] = useState(null)

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
    const [dependente, setDependentes] = useState([])
    const [linhasTransporte, setLinhasTransportes] = useState([{ linha: "teste", cartao: "123" }])
    const [state, setState] = useState(initialState);
    const [operadoraAtual, setOperadoraAtual] = useState("")
    const [numerolinha, setNumeroLinha] = useState("")
    const [nomelinha, setNomeLinha] = useState("")
    const [tableData, setTableData] = useState([])
    const [linhasEscala, setLinhasEscala] = useState([])
    const [linhaSelecionada, setLinhaSelecionada] = useState(null)

    // useEffect(() => {
    //     getColaborador(globalState.usuario.subject).then((param) => {
    //         setDados(param)
    //         getEscalaAtualColaborador(param.usuario.numEmp, param.usuario.tipCol, param.usuario.numCad, param.usuario.dependentes)
    //             .then((data) => {
    //                 if (data.escalas.nomevt) {
    //                     setVTAtual(data.escalas.nomevt)
    //                 }
    //                 if (data.escalas.inievt) {
    //                     setInclusaoVT(data.escalas.inievt)
    //                 }
    //             })
    //     })
    // }, [])

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
            setPlanoSaude(param)
            getPlanoSaudeAtualColaborador(param.usuario.numEmp, param.usuario.tipCol, param.usuario.numCad)
                .then((data) => {
                    if (data.colaboradores.nompla) {
                        setPlanoSaude(data.colaboradores.nompla)
                    }
                })
        })
    }, [])

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
            getEscalasLinhas(param.usuario.numEmp, param.usuario.codFil).then((li) => {
                if (li.escalas.length > 0) {
                    li.escalas.map(p => {
                        p.label = `${p.escvtr} - ${p.nomevt}`
                    })
                    setLinhasEscala(li.escalas)
                }
            })
        })
    }, [])


    // Salvar variaveis do processo
    useEffect(() => {
        GLOBAL.tarefa_2 = state;
        GLOBAL.consultaLinhas = tableData;
        console.log(state)
    }, [state])

    return (
        <div>

            <div className="col-12 field">
                <ContentDivisor content={"COLABORADOR"}
                    icon={"pi pi-user"} />
                <InputText className="w-full"
                    value={dados?.usuario.numCad + " - " + dados?.usuario.nomFun}
                    readonly
                />
            </div>

            <div className="col-12 field">

                <ContentDivisor content={"HISTÓRICO"}
                    icon={"pi pi-user"} />
                <InputText className="w-full" value={dados?.empresa.datfil + ' | ' + dados?.empresa.numEmp + '-' + dados?.empresa.codFil + '-' + dados?.empresa.nomFil}
                    readonly
                />
            </div>

            <ContentDivisor content={"MOTIVOS"}
                icon={"pi pi-user"} />



            <div className="col-12 field">
                <div className="col-06 field">
                    <label> Motivo da solicitação</label>
                    <InputText
                        value={globalState.variaveisProcesso.motivoSelecionado}
                        readOnly
                        className="w-full"
                    />
                    <label> Operação. </label>
                    <InputText
                        value={globalState.variaveisProcesso.operacaoSelecionada}
                        readOnly
                        className="w-full"
                    />
                </div>
                {
                    globalState.variaveisProcesso.operacaoSelecionada === "Incluir" &&
                    <>
                        <ContentDivisor content={"BENEFICIOS"}
                            icon={"pi pi-user"} />

                        <label> Beneficio. </label>

                        <InputText
                            value={globalState.variaveisProcesso.beneficioSelecionado}
                            readOnly
                            className="w-full"
                        />
                        <label> Nome da operadora de Vale Transporte. </label>
                        <InputText
                            value={state.nomevt}
                            readOnly
                            className="w-full"
                        />
                        <label> Escala do Vale transporte. </label>
                        <InputText
                            value={state.escvtr}
                            readOnly
                            className="w-full"
                        />
                        <Divider align="left" >  </Divider>
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

                        <label> Tipo de Transporte. </label>
                        <InputText
                            value={state.transporteSelecionado}
                            readOnly
                            className="w-full"
                        />
                        <label> Valor da Tarifa. </label>
                        <InputText
                            value={globalState.variaveisProcesso.valor}
                            readOnly
                            className="w-full"
                        />
                        <label> Quantidade utilizada para Ida. </label>
                        <InputText
                            value={globalState.variaveisProcesso.qtdida}
                            readOnly
                            className="w-full"
                        />
                        <label> Quantidade utilizada para Volta. </label>
                        <InputText
                            value={globalState.variaveisProcesso.qtdvolta}
                            readOnly
                            className="w-full"
                        />
                        <label> Data de inicio. </label>
                        <InputText
                            value={new Date(globalState.variaveisProcesso.novoperiodo).toLocaleDateString()}
                            readOnly
                            className="w-full"
                        />
                        <ContentDivisor content={"Escala Vale Transporte"}
                        />
                        <Dropdown
                            value={linhaSelecionada}
                            options={linhasEscala}
                            className="w-full"
                            onChange={(e) => setLinhaSelecionada(e.value)}
                        />
                        <ContentDivisor content={"Linhas-------------------------------------Cartão"}
                        />
                        {
                            linhaSelecionada?.linhas.length > 0 && linhaSelecionada.linhas?.map((l, i) => (
                                <div className="col-6 flex">
                                    <InputText className="w-full" value={`${l.codlin} - ${l.nomlin}`}
                                        readonly
                                    />
                                    <div className="col-6 flex">
                                        <InputNumber
                                            className="w-full"
                                            value={l?.cartao}
                                            onChange={(e) => {
                                                let linhasCopy = Array.from(linhaSelecionada.linhas)
                                                linhasCopy[i].cartao = e.value
                                                setLinhaSelecionada({ ...linhaSelecionada, linhas: linhasCopy })
                                            }}
                                        />
                                    </div>
                                </div>
                            ))

                        }


                        {/* <label> Linha </label>
                        <InputText
                            value={globalState.variaveisProcesso.linha}
                            readOnly
                            className="w-full"
                        />
                        <label> Cartão </label>
                        <InputText
                            value={globalState.variaveisProcesso.cartao}
                            readOnly
                            className="w-full"
                        /> */}
                    </>
                }

                {
                    globalState.variaveisProcesso.operacaoSelecionada === "Alterar" &&
                    <>
                        <ContentDivisor content={"BENEFICIOS"}
                            icon={"pi pi-user"} />

                        <label> Beneficio. </label>

                        <InputText
                            value={globalState.variaveisProcesso.beneficioSelecionado}
                            readOnly
                            className="w-full"
                        />
                        <label> Nome da operadora de Vale Transporte. </label>
                        <InputText
                            value={globalState.variaveisProcesso.nomevt}
                            readOnly
                            className="w-full"
                        />
                        <Divider align="left" >  </Divider>
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

                        <label> Tipo de Transporte. </label>
                        <InputText
                            value={globalState.variaveisProcesso.transporteSelecionado}
                            readOnly
                            className="w-full"
                        />
                        <label> Valor da Tarifa. </label>
                        <InputText
                            value={globalState.variaveisProcesso.valor}
                            readOnly
                            className="w-full"
                        />
                        <label> Quantidade utilizada para Ida. </label>
                        <InputText
                            value={globalState.variaveisProcesso.qtdida}
                            readOnly
                            className="w-full"
                        />
                        <label> Quantidade utilizada para Volta. </label>
                        <InputText
                            value={globalState.variaveisProcesso.qtdvolta}
                            readOnly
                            className="w-full"
                        />
                        <label> Escala do Vale transporte. </label>
                        <InputText
                            value={globalState.variaveisProcesso.esc}
                            readOnly
                            className="w-full"
                        />
                        <label> Data de inicio. </label>
                        <InputText
                            value={new Date(globalState.variaveisProcesso.novoperiodo).toLocaleDateString()}
                            readOnly
                            className="w-full"
                        />
                        <label> Linha </label>
                        <InputText
                            value={globalState.variaveisProcesso.linha}
                            readOnly
                            className="w-full"
                        />
                        <label> Cartão </label>
                        <InputText
                            value={globalState.variaveisProcesso.cartao}
                            readOnly
                            className="w-full"
                        />
                    </>
                }

                {
                    globalState.variaveisProcesso.operacaoSelecionada === "Excluir" &&
                    <>
                        <ContentDivisor content={"BENEFICIOS"}
                            icon={"pi pi-user"} />

                        <InputText
                            value={globalState.variaveisProcesso.beneficioSelecionado}
                            readOnly
                            className="w-full"
                        />
                        <label> Escala Atual / Data Inclusão. </label>
                        <InputText
                            value={globalState.variaveisProcesso.escvtr + " | " +
                                globalState.variaveisProcesso.inievt}
                            readOnly
                            className="w-full"
                        />

                        <Divider align="left" >  </Divider>
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

                        <label> Data de inicio. </label>
                        <InputText
                            value={new Date(globalState.variaveisProcesso.novoperiodo).toLocaleDateString()}
                            readOnly
                            className="w-full"
                        />
                        <label> Data da Exclusão. </label>
                        <InputText
                            value={new Date(globalState.variaveisProcesso.fimperiodo).toLocaleDateString()}
                            readOnly
                            className="w-full"
                        />

                    </>
                }
            </div>

            <div className="grid px-2" style={{ display: motivoSelecionado ? "" : "none" }}>

                {
                    // globalState.variaveisProcesso.motivoSelecionado?.cod === 1 &&
                    // <>
                    //     <div className="col-12 field">
                    //         <label> Beneficio. </label>
                    //         <InputText
                    //             value={globalState.variaveisProcesso.beneficioSelecionado}
                    //             readOnly
                    //             className="w-full"
                    //         />
                    //     </div>
                    //     {/* Vale Transporte */}
                    //     {
                    //         state.beneficioSelecionado?.cod === 1 &&
                    //         <>

                    //             <div className="col-12 field">
                    //                 <ContentDivisor content={"Vale Transporte"}
                    //                 />
                    //                 <label>
                    //                     Escala Vale de transporte Atual
                    //                 </label>
                    //                 <InputText className="w-full" value={VTAtual}
                    //                     readonly
                    //                 />
                    //             </div>


                    //             <div className="col-12 field">
                    //                 <label>Tipo de operação</label>
                    //                 <Dropdown
                    //                     value={operacaoSelecionada}
                    //                     options={operacao}
                    //                     className="w-full"
                    //                     onChange={(e) => setOperacaoSelecionada(e.value)}
                    //                 />
                    //             </div>


                    //             {
                    //                 state.operacaoSelecionada?.cod === 1 &&
                    //                 <>

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Nome da Operadora de Vale Transporte
                    //                         </label>
                    //                         <InputText
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.nomevt}
                    //                         />
                    //                     </div>

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Numero da Linha
                    //                         </label>
                    //                         <InputNumber
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.codlin}
                    //                         />
                    //                     </div>

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Tipo de Transporte
                    //                         </label>
                    //                         <InputText
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.tipo}
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Valor da Tarifa
                    //                         </label>
                    //                         <InputNumber
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.valor}
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Quantidade Utilizada para Ida
                    //                         </label>
                    //                         <InputNumber
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.qtdida}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Quantidade Utilizada para Volta
                    //                         </label>
                    //                         <InputNumber
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.qtdvolta}
                    //                         />
                    //                     </div>

                    //                     <div className="col-4 field">
                    //                         <label>
                    //                             Escala Vale Transporte
                    //                         </label>
                    //                         <InputNumber
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.esc}
                    //                         />
                    //                     </div>
                    //                     <div className="col-4 field">
                    //                         <FieldName required name='Data Início' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                             value={GLOBAL.tarefa_1.datainivale}
                    //                         />
                    //                     </div>
                    //                     <ContentDivisor content={"LINHA / CARTÃO"}
                    //                     />

                    //                     {
                    //                         linhasTransporte.map(l => (
                    //                             <>
                    //                                 <div className="col-3 field">
                    //                                     <label>
                    //                                         Linha 1
                    //                                     </label>
                    //                                     <InputNumber
                    //                                         className="w-full"
                    //                                         value={l.linha}
                    //                                         placeholder="Numero"
                    //                                     />
                    //                                 </div>
                    //                                 <div className="col-3 field">
                    //                                     <label>
                    //                                         Numero do Cartão
                    //                                     </label>
                    //                                     <InputNumber
                    //                                         className="w-full"
                    //                                         value={l.cartao}
                    //                                         placeholder="Numero"
                    //                                     />
                    //                                 </div>
                    //                                 <div className="col-6 field" />
                    //                             </>
                    //                         ))
                    //                     }
                    //                     <Button >
                    //                         Nova linha
                    //                     </Button>
                    //                 </>
                    //             }
                    //             {
                    //                 state.operacaoSelecionada?.cod === 2 &&
                    //                 <>

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Nome da Operadora de Vale Transporte
                    //                         </label>
                    //                         <InputText
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.nomevt}
                    //                         />
                    //                     </div>

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Numero da Linha
                    //                         </label>
                    //                         <InputNumber
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.codlin}
                    //                         />
                    //                     </div>

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Tipo de Transporte
                    //                         </label>
                    //                         <InputText
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.tipo}
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Valor da Tarifa
                    //                         </label>
                    //                         <InputNumber
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.valor}
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Quantidade Utilizada para Ida
                    //                         </label>
                    //                         <InputNumber
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.qtdida}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Quantidade Utilizada para Volta
                    //                         </label>
                    //                         <InputNumber
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.qtdvolta}
                    //                         />
                    //                     </div>

                    //                     <div className="col-4 field">
                    //                         <label>
                    //                             Escala Vale Transporte
                    //                         </label>
                    //                         <InputNumber
                    //                             className="w-full"
                    //                             value={GLOBAL.tarefa_1.esc}
                    //                         />
                    //                     </div>
                    //                     <div className="col-4 field">
                    //                         <FieldName required name='Data Início' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                             value={GLOBAL.tarefa_1.datainivale}
                    //                         />
                    //                     </div>
                    //                     <ContentDivisor content={"LINHA / CARTÃO"}
                    //                     />

                    //                     {
                    //                         linhasTransporte.map(l => (
                    //                             <>
                    //                                 <div className="col-3 field">
                    //                                     <label>
                    //                                         Linha 1
                    //                                     </label>
                    //                                     <InputNumber
                    //                                         className="w-full"
                    //                                         value={l.linha}
                    //                                         placeholder="Numero"
                    //                                     />
                    //                                 </div>
                    //                                 <div className="col-3 field">
                    //                                     <label>
                    //                                         Numero do Cartão
                    //                                     </label>
                    //                                     <InputNumber
                    //                                         className="w-full"
                    //                                         value={l.cartao}
                    //                                         placeholder="Numero"
                    //                                     />
                    //                                 </div>
                    //                                 <div className="col-6 field" />
                    //                             </>
                    //                         ))
                    //                     }
                    //                 </>
                    //             }
                    //             {
                    //                 state.operacaoSelecionada?.cod === 3 &&
                    //                 <>
                    //                     <div className="col-12 field">
                    //                         <FieldName name='Data Início' />
                    //                         <InputText
                    //                             readOnly
                    //                             className="w-full"
                    //                             value={DataInclusaoVT}
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <FieldName required name='Data Fim' />
                    //                         <InputText
                    //                             value={globalState.variaveisProcesso.fimperiodo}
                    //                             readOnly
                    //                             className="w-full"
                    //                         />
                    //                     </div>
                    //                 </>
                    //             }
                    //         </>

                    //     }

                    //     {/* Plano de saude */}
                    //     {
                    //         beneficioSelecionado?.cod === 2 &&
                    //         <>

                    //             <div className="col-12 field">
                    //                 <ContentDivisor content={"Plano de Saúde"}
                    //                 />
                    //                 <label>
                    //                     Plano Titular Atual + Data Inclusão
                    //                 </label>
                    //                 {console.log(dados)}
                    //                 <InputText className="w-full" value={PlanoAtual}
                    //                     readonly
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Tipo de Operação
                    //                 </label>
                    //                 <Dropdown
                    //                     value={operacaoSelecionadaPlano}
                    //                     options={operacaoPlano}
                    //                     className="w-full"
                    //                     onChange={(e) => setOperacaoSelecionadaPlano(e.value)}
                    //                 />
                    //             </div>

                    //             {
                    //                 operacaoSelecionadaPlano?.cod === 1 &&
                    //                 <>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Plano Titular
                    //                         </label>
                    //                         <InputText className="w-full" value={""}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <FieldName name='Data Inclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <FieldName name='Data Exclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                         />
                    //                     </div>

                    //                     <Divider align="left" > Dependente </Divider>
                    //                     {
                    //                         dependente.length > 0 && dependente?.map(dep => (
                    //                             <div className="col-4 flex flex-column mb-2">
                    //                                 <InputText className="w-full" value={dep.nomdep}
                    //                                     readonly
                    //                                 />
                    //                             </div>
                    //                         ))

                    //                     }
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Marque ou desmarque quem será incluído ou excluído do Plano.
                    //                         </label>
                    //                     </div>
                    //                     <div className="col-3 field">
                    //                         <input id="Manter" name="base" type="radio" value="S" />
                    //                         <label>
                    //                             Manter dependente no Plano
                    //                         </label>
                    //                         <label>
                    //                             <input id="Incluir" name="base" type="radio" value="S" />
                    //                             Esta ação irá incluir dependente no Plano
                    //                         </label>
                    //                         <label>
                    //                             <input id="Excluir" name="base" type="radio" value="S" />
                    //                             Esta ação irá excluir dependente no Plano
                    //                         </label>
                    //                     </div>
                    //                 </>
                    //             }

                    //             {
                    //                 operacaoSelecionadaPlano?.cod === 2 &&
                    //                 <>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Plano Titular
                    //                         </label>
                    //                         <InputText className="w-full" value={PlanoAtual + ' | ' + DataInclusaoPlano}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <FieldName name='Data Inclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <FieldName name='Data Exclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                             readonly
                    //                         />
                    //                     </div>

                    //                     <Divider align="left" > Dependente </Divider>
                    //                     {
                    //                         dependente.length > 0 && dependente?.map(dep => (
                    //                             <div className="col-4 flex flex-column mb-2">
                    //                                 <InputText className="w-full" value={dep.nomdep}
                    //                                     readonly
                    //                                 />
                    //                             </div>
                    //                         ))

                    //                     }
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Marque ou desmarque quem será incluído ou excluído do Plano.
                    //                         </label>
                    //                     </div>
                    //                     <div className="col-3 field">
                    //                         <input id="Manter" name="base" type="radio" value="S" />
                    //                         <label>
                    //                             Manter dependente no Plano
                    //                         </label>
                    //                         <label>
                    //                             <input id="Incluir" name="base" type="radio" value="S" />
                    //                             Esta ação irá incluir dependente no Plano
                    //                         </label>
                    //                         <label>
                    //                             <input id="Excluir" name="base" type="radio" value="S" />
                    //                             Esta ação irá excluir dependente no Plano
                    //                         </label>
                    //                     </div>
                    //                 </>
                    //             }

                    //             {
                    //                 operacaoSelecionadaPlano?.cod === 3 &&
                    //                 <>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Plano Titular Atual
                    //                         </label>
                    //                         <InputText className="w-full" value={PlanoAtual + ' | ' + DataInclusaoPlano}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <FieldName name='Data Inclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <FieldName name='Data Exclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                             readonly
                    //                         />
                    //                     </div>

                    //                     <Divider align="left" > Dependente </Divider>
                    //                     {
                    //                         dependente.length > 0 && dependente?.map(dep => (
                    //                             <div className="col-4 flex flex-column mb-2">
                    //                                 <InputText className="w-full" value={dep.nomdep}
                    //                                     readonly
                    //                                 />
                    //                             </div>
                    //                         ))

                    //                     }

                    //                     <div className="col-3 field">
                    //                         <input id="Excluir" name="base" type="radio" value="S" />
                    //                         <label>
                    //                             Excluir
                    //                         </label>
                    //                     </div>
                    //                 </>
                    //             }
                    //             {
                    //                 operacaoSelecionadaPlano?.cod === 4 &&
                    //                 <>
                    //                     <div className="col-6 field">
                    //                         <label>
                    //                             Plano Titular Atual
                    //                         </label>
                    //                         <InputText className="w-full" value={PlanoAtual + ' | ' + DataInclusaoPlano}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-6 field">
                    //                         <FieldName name='Data Exclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                         />
                    //                     </div>

                    //                     <Divider align="left" > Dependente </Divider>
                    //                     {
                    //                         dependente.length > 0 && dependente?.map(dep => (
                    //                             <div className="col-4 flex flex-column mb-2">
                    //                                 <InputText className="w-full" value={dep.nomdep}
                    //                                     readonly
                    //                                 />
                    //                             </div>
                    //                         ))

                    //                     }

                    //                     <div className="col-3 field">
                    //                         <input id="Excluir" name="base" type="radio" value="S" />
                    //                         <label>
                    //                             Excluir
                    //                         </label>
                    //                     </div>
                    //                 </>
                    //             }

                    //         </>
                    //     }

                    //     {/* PLANO ODONTO */}

                    //     {
                    //         beneficioSelecionado?.cod === 3 &&
                    //         <>

                    //             <div className="col-12 field">
                    //                 <ContentDivisor content={"Odonto"}
                    //                 />
                    //                 <label>
                    //                     Plano Titular Atual
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                     readonly
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Tipo de Operação
                    //                 </label>
                    //                 <Dropdown
                    //                     value={operacaoSelecionadaPlano}
                    //                     options={operacaoPlano}
                    //                     className="w-full"
                    //                     onChange={(e) => setOperacaoSelecionadaPlano(e.value)}
                    //                 />
                    //             </div>
                    //             <div className="col-4 field">
                    //                 <FieldName name='Data Exclusão' />
                    //                 <Datepicker
                    //                     className='w-full'
                    //                 />
                    //             </div>

                    //             <Divider align="left" > Dependente </Divider>
                    //             {
                    //                 dependente.length > 0 && dependente?.map(dep => (
                    //                     <div className="col-4 flex flex-column mb-2">
                    //                         <InputText className="w-full" value={dep.nomdep}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                 ))

                    //             }

                    //         </>
                    //     }

                    //     {/* VA/VR */}
                    //     {
                    //         beneficioSelecionado?.cod === 4 &&
                    //         <>

                    //             <ContentDivisor content={"VA / VR"}
                    //             />


                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Tipo de Operação
                    //                 </label>
                    //                 <Dropdown
                    //                     value={operacaoSelecionadaVale}
                    //                     options={operacaoVale}
                    //                     className="w-full"
                    //                     onChange={(e) => setOperacaoSelecionadaVale(e.value)}
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Codigo do Vale Anterior
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                     readonly
                    //                 />
                    //             </div>
                    //             <div className="col-6 field">
                    //                 <label>
                    //                     Tipo Vale
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-6 field">
                    //                 <label>
                    //                     Quantidade Vales
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Dia útil
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Sábado
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Domingo
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Feriado
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />

                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Codigo do Vale
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                     readonly
                    //                 />
                    //             </div>
                    //             <div className="col-6 field">
                    //                 <label>
                    //                     Tipo Vale
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-6 field">
                    //                 <label>
                    //                     Quantidade Vales
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Dia útil
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Sábado
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Domingo
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Feriado
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //         </>
                    //     }

                    // </>
                }


                {
                    // globalState.variaveisProcesso.motivoSelecionado?.cod === 2 &&
                    // <>
                    //     {/* Vale Transporte motivo 2 */}

                    //     <div className="col-12 field">
                    //         <label>
                    //             Histórico Atual
                    //         </label>
                    //         <InputText className="w-full" value={dados?.empresa.datfil + ' | ' + dados?.usuario.escala}
                    //             readonly
                    //         />
                    //     </div>
                    //     <div className="col-12 field">
                    //         <label>
                    //             Para qual Período Deseja Solicitar a Alteração?
                    //         </label>
                    //         <InputText className="w-full" value={dados?.empresa.datfil + ' | ' + dados?.usuario.escala}
                    //             readonly
                    //         />
                    //     </div>

                    //     <div className="col-12 field">
                    //         <ContentDivisor content={"Vale Transporte"}
                    //         />
                    //         <label>
                    //             Escala Vale de transporte Atual
                    //         </label>
                    //         <InputText className="w-full" value={VTAtual}
                    //             readonly
                    //         />
                    //     </div>


                    //     <div className="col-12 field">
                    //         <label>Tipo de operação</label>
                    //         <Dropdown
                    //             value={operacaoSelecionada}
                    //             options={operacao}
                    //             className="w-full"
                    //             onChange={(e) => setOperacaoSelecionada(e.value)}
                    //         />
                    //     </div>

                    //     {
                    //         operacaoSelecionada?.cod === 1 &&
                    //         <>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Nome da Operadora de Vale Transporte
                    //                 </label>
                    //                 <InputText className="w-full" value={state.nomevt}
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Numero da Linha
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.codlin}
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Tipo de Transporte
                    //                 </label>
                    //                 <InputText className="w-full" value={state.tipo}
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Valor da Tarifa
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.valor}
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Quantidade Utilizada para Ida
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.qtdida}
                    //                     readonly
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Quantidade Utilizada para Volta
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.qtdvolta}
                    //                     readonly
                    //                 />
                    //             </div>

                    //             <div className="col-4 field">
                    //                 <label>
                    //                     Escala Vale Transporte
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.esc}
                    //                     readonly
                    //                 />
                    //             </div>
                    //             <div className="col-4 field">
                    //                 <FieldName required name='Data Início' />
                    //                 <Datepicker
                    //                     className='w-full'
                    //                     inputClassName='obrigatorio'
                    //                 />
                    //             </div>
                    //             <div className="col-4 field">
                    //                 <FieldName required name='Data Fim' />
                    //                 <Datepicker
                    //                     className='w-full'
                    //                     inputClassName='obrigatorio'
                    //                 />
                    //             </div>
                    //             <ContentDivisor content={"LINHA / CARTÃO"}
                    //             />

                    //             {
                    //                 linhasTransporte.map(l => (
                    //                     <>
                    //                         <div className="col-3 field">
                    //                             <label>
                    //                                 Linha 1
                    //                             </label>
                    //                             <InputNumber className="w-full" value={l.linha}
                    //                                 readonly
                    //                             />
                    //                         </div>
                    //                         <div className="col-3 field">
                    //                             <label>
                    //                                 Numero do Cartão
                    //                             </label>
                    //                             <InputNumber className="w-full" value={l.cartao}
                    //                                 readonly
                    //                             />
                    //                         </div>
                    //                         <div className="col-6 field" />
                    //                     </>
                    //                 ))
                    //             }
                    //             <Button> Nova linha

                    //             </Button>
                    //         </>
                    //     }
                    //     {
                    //         operacaoSelecionada?.cod === 2 &&
                    //         <>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Nome da Operadora de Vale Transporte
                    //                 </label>
                    //                 <InputText className="w-full" value={state.nomevt}
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Numero da Linha
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.codlin}
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Tipo de Transporte
                    //                 </label>
                    //                 <InputText className="w-full" value={state.tipo}
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Valor da Tarifa
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.valor}
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Quantidade Utilizada para Ida
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.qtdida}
                    //                     readonly
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Quantidade Utilizada para Volta
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.qtdvolta}
                    //                     readonly
                    //                 />
                    //             </div>

                    //             <div className="col-4 field">
                    //                 <label>
                    //                     Escala Vale Transporte
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.esc}
                    //                     readonly
                    //                 />
                    //             </div>
                    //             <div className="col-4 field">
                    //                 <FieldName required name='Data Início' />
                    //                 <Datepicker
                    //                     className='w-full'
                    //                     inputClassName='obrigatorio'
                    //                 />
                    //             </div>
                    //             <div className="col-4 field">
                    //                 <FieldName required name='Data Fim' />
                    //                 <Datepicker
                    //                     className='w-full'
                    //                     inputClassName='obrigatorio'
                    //                 />
                    //             </div>
                    //             <ContentDivisor content={"LINHA / CARTÃO"}
                    //             />

                    //             {
                    //                 linhasTransporte.map(l => (
                    //                     <>
                    //                         <div className="col-3 field">
                    //                             <label>
                    //                                 Linha 1
                    //                             </label>
                    //                             <InputNumber className="w-full" value={l.linha}
                    //                                 readonly
                    //                             />
                    //                         </div>
                    //                         <div className="col-3 field">
                    //                             <label>
                    //                                 Numero do Cartão
                    //                             </label>
                    //                             <InputNumber className="w-full" value={l.cartao}
                    //                                 readonly
                    //                             />
                    //                         </div>
                    //                         <div className="col-6 field" />
                    //                     </>
                    //                 ))
                    //             }
                    //             <Button> Nova linha

                    //             </Button>
                    //         </>
                    //     }
                    //     {
                    //         operacaoSelecionada?.cod === 3 &&
                    //         <>
                    //             <div className="col-12 field">
                    //                 <FieldName name='Data Início' />
                    //                 <InputText
                    //                     readOnly
                    //                     className="w-full"
                    //                     value={DataInclusaoVT}
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <FieldName required name='Data Fim' />
                    //                 <Datepicker
                    //                     className='w-full'
                    //                     inputClassName='obrigatorio'
                    //                 />
                    //             </div>
                    //         </>
                    //     }
                    // </>
                }


                {
                    // globalState.variaveisProcesso.motivoSelecionado?.cod === 3 &&
                    // <>
                    //     {/* Vale Transporte motivo 3 */}

                    //     <div className="col-12 field">
                    //         <label>
                    //             CEP
                    //         </label>
                    //         <InputText className="w-full" value={dados?.usuario.endcep}
                    //             readonly
                    //         />
                    //     </div>
                    //     <div className="col-12 field">
                    //         <label>
                    //             Tipo/Logradouro/Nº
                    //         </label>
                    //         <InputText className="w-full" value={dados?.usuario.endrua}
                    //             readonly
                    //         />
                    //     </div>
                    //     <div className="col-12 field">
                    //         <label>
                    //             Complemento
                    //         </label>
                    //         <InputText className="w-full" value={dados?.usuario.endcpl}
                    //             readonly
                    //         />
                    //     </div>
                    //     <div className="col-12 field">
                    //         <label>
                    //             Bairro
                    //         </label>
                    //         <InputText className="w-full" value={dados?.usuario.nombai}
                    //             readonly
                    //         />
                    //     </div>
                    //     <div className="col-12 field">
                    //         <label>
                    //             Cidade
                    //         </label>
                    //         <InputText className="w-full" value={dados?.usuario.nomcid}
                    //             readonly
                    //         />
                    //     </div>
                    //     <div className="col-12 flex flex-column mb-2">
                    //         <label>
                    //             Anexos
                    //         </label>
                    //         <InputText className="w-full" value={"Os anexos devem ser inseridos na Aba Anexos"}
                    //             readonly
                    //         />

                    //     </div>

                    //     <div className="col-12 field">
                    //         <ContentDivisor content={"Vale Transporte"}
                    //         />
                    //         <label>
                    //             Escala Vale de transporte Atual
                    //         </label>
                    //         <InputText className="w-full" value={VTAtual}
                    //             readonly
                    //         />
                    //     </div>


                    //     <div className="col-12 field">
                    //         <label>Tipo de operação</label>
                    //         <Dropdown
                    //             value={operacaoSelecionada}
                    //             options={operacao}
                    //             className="w-full"
                    //             onChange={(e) => setOperacaoSelecionada(e.value)}
                    //         />
                    //     </div>

                    //     {
                    //         operacaoSelecionada?.cod === 1 &&
                    //         <>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Nome da Operadora de Vale Transporte
                    //                 </label>
                    //                 <InputText className="w-full" value={state.nomevt}
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Numero da Linha
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.codlin}
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Tipo de Transporte
                    //                 </label>
                    //                 <InputText className="w-full" value={state.tipo}
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Valor da Tarifa
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.valor}
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Quantidade Utilizada para Ida
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.qtdida}
                    //                     readonly
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Quantidade Utilizada para Volta
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.qtdvolta}
                    //                     readonly
                    //                 />
                    //             </div>

                    //             <div className="col-4 field">
                    //                 <label>
                    //                     Escala Vale Transporte
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.esc}
                    //                     readonly
                    //                 />
                    //             </div>
                    //             <div className="col-4 field">
                    //                 <FieldName required name='Data Início' />
                    //                 <Datepicker
                    //                     className='w-full'
                    //                     inputClassName='obrigatorio'
                    //                 />
                    //             </div>
                    //             <div className="col-4 field">
                    //                 <FieldName required name='Data Fim' />
                    //                 <Datepicker
                    //                     className='w-full'
                    //                     inputClassName='obrigatorio'
                    //                 />
                    //             </div>
                    //             <ContentDivisor content={"LINHA / CARTÃO"}
                    //             />

                    //             {
                    //                 linhasTransporte.map(l => (
                    //                     <>
                    //                         <div className="col-3 field">
                    //                             <label>
                    //                                 Linha 1
                    //                             </label>
                    //                             <InputNumber className="w-full" value={l.linha}
                    //                                 readonly
                    //                             />
                    //                         </div>
                    //                         <div className="col-3 field">
                    //                             <label>
                    //                                 Numero do Cartão
                    //                             </label>
                    //                             <InputNumber className="w-full" value={l.cartao}
                    //                                 readonly
                    //                             />
                    //                         </div>
                    //                         <div className="col-6 field" />
                    //                     </>
                    //                 ))
                    //             }
                    //             <Button> Nova linha

                    //             </Button>
                    //         </>
                    //     }
                    //     {
                    //         operacaoSelecionada?.cod === 2 &&
                    //         <>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Nome da Operadora de Vale Transporte
                    //                 </label>
                    //                 <InputText className="w-full" value={state.nomevt}
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Numero da Linha
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.codlin}
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Tipo de Transporte
                    //                 </label>
                    //                 <InputText className="w-full" value={state.tipo}
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Valor da Tarifa
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.valor}
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Quantidade Utilizada para Ida
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.qtdida}
                    //                     readonly
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Quantidade Utilizada para Volta
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.qtdvolta}
                    //                     readonly
                    //                 />
                    //             </div>

                    //             <div className="col-4 field">
                    //                 <label>
                    //                     Escala Vale Transporte
                    //                 </label>
                    //                 <InputNumber className="w-full" value={state.esc}
                    //                     readonly
                    //                 />
                    //             </div>
                    //             <div className="col-4 field">
                    //                 <FieldName required name='Data Início' />
                    //                 <Datepicker
                    //                     className='w-full'
                    //                     inputClassName='obrigatorio'
                    //                 />
                    //             </div>
                    //             <div className="col-4 field">
                    //                 <FieldName required name='Data Fim' />
                    //                 <Datepicker
                    //                     className='w-full'
                    //                     inputClassName='obrigatorio'
                    //                 />
                    //             </div>
                    //             <ContentDivisor content={"LINHA / CARTÃO"}
                    //             />

                    //             {
                    //                 linhasTransporte.map(l => (
                    //                     <>
                    //                         <div className="col-3 field">
                    //                             <label>
                    //                                 Linha 1
                    //                             </label>
                    //                             <InputNumber className="w-full" value={l.linha}
                    //                                 readonly
                    //                             />
                    //                         </div>
                    //                         <div className="col-3 field">
                    //                             <label>
                    //                                 Numero do Cartão
                    //                             </label>
                    //                             <InputNumber className="w-full" value={l.cartao}
                    //                                 readonly
                    //                             />
                    //                         </div>
                    //                         <div className="col-6 field" />
                    //                     </>
                    //                 ))
                    //             }
                    //             <Button> Nova linha

                    //             </Button>
                    //         </>
                    //     }
                    //     {
                    //         operacaoSelecionada?.cod === 3 &&
                    //         <>
                    //             <div className="col-12 field">
                    //                 <FieldName name='Data Início' />
                    //                 <InputText
                    //                     readOnly
                    //                     className="w-full"
                    //                     value={DataInclusaoVT}
                    //                 />
                    //             </div>
                    //             <div className="col-12 field">
                    //                 <FieldName required name='Data Fim' />
                    //                 <Datepicker
                    //                     className='w-full'
                    //                     inputClassName='obrigatorio'
                    //                 />
                    //             </div>
                    //         </>
                    //     }
                    // </>
                }


                {
                    // globalState.variaveisProcesso.motivoSelecionado?.cod === 4 &&
                    // <>
                    //     <div className='field col-12'>
                    //         <FieldName name='Justifique' />
                    //         <InputTextarea
                    //             className='w-full'
                    //         />
                    //     </div>
                    //     <div className="col-12 field">
                    //         <label> Escolha o beneficio. </label>
                    //         <Dropdown
                    //             value={beneficioSelecionado}
                    //             options={beneficio}
                    //             className="w-full"
                    //             onChange={(e) => setBeneficioSelecionado(e.value)}
                    //         />
                    //     </div>
                    //     {
                    //         beneficioSelecionado?.cod === 1 &&
                    //         <>
                    //             {/* Vale Transporte */}

                    //             <div className="col-12 field">
                    //                 <ContentDivisor content={"Vale Transporte"}
                    //                 />
                    //                 <label>
                    //                     Escala Vale de transporte Atual
                    //                 </label>
                    //                 <InputText className="w-full" value={VTAtual}
                    //                     readonly
                    //                 />
                    //             </div>


                    //             <div className="col-12 field">
                    //                 <label>Tipo de operação</label>
                    //                 <Dropdown
                    //                     value={operacaoSelecionada}
                    //                     options={operacao}
                    //                     className="w-full"
                    //                     onChange={(e) => setOperacaoSelecionada(e.value)}
                    //                 />
                    //             </div>

                    //             {
                    //                 operacaoSelecionada?.cod === 1 &&
                    //                 <>

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Nome da Operadora de Vale Transporte
                    //                         </label>
                    //                         <InputText className="w-full" value={state.nomevt}
                    //                         />
                    //                     </div>

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Numero da Linha
                    //                         </label>
                    //                         <InputNumber className="w-full" value={state.codlin}
                    //                         />
                    //                     </div>

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Tipo de Transporte
                    //                         </label>
                    //                         <InputText className="w-full" value={state.tipo}
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Valor da Tarifa
                    //                         </label>
                    //                         <InputNumber className="w-full" value={state.valor}
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Quantidade Utilizada para Ida
                    //                         </label>
                    //                         <InputNumber className="w-full" value={state.qtdida}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Quantidade Utilizada para Volta
                    //                         </label>
                    //                         <InputNumber className="w-full" value={state.qtdvolta}
                    //                             readonly
                    //                         />
                    //                     </div>

                    //                     <div className="col-4 field">
                    //                         <label>
                    //                             Escala Vale Transporte
                    //                         </label>
                    //                         <InputNumber className="w-full" value={state.esc}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-4 field">
                    //                         <FieldName required name='Data Início' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                             inputClassName='obrigatorio'
                    //                         />
                    //                     </div>
                    //                     <div className="col-4 field">
                    //                         <FieldName required name='Data Fim' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                             inputClassName='obrigatorio'
                    //                         />
                    //                     </div>
                    //                     <ContentDivisor content={"LINHA / CARTÃO"}
                    //                     />

                    //                     {
                    //                         linhasTransporte.map(l => (
                    //                             <>
                    //                                 <div className="col-3 field">
                    //                                     <label>
                    //                                         Linha 1
                    //                                     </label>
                    //                                     <InputNumber className="w-full" value={l.linha}
                    //                                         readonly
                    //                                     />
                    //                                 </div>
                    //                                 <div className="col-3 field">
                    //                                     <label>
                    //                                         Numero do Cartão
                    //                                     </label>
                    //                                     <InputNumber className="w-full" value={l.cartao}
                    //                                         readonly
                    //                                     />
                    //                                 </div>
                    //                                 <div className="col-6 field" />
                    //                             </>
                    //                         ))
                    //                     }
                    //                     <Button> Nova linha

                    //                     </Button>                                    </>
                    //             }
                    //             {
                    //                 operacaoSelecionada?.cod === 2 &&
                    //                 <>

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Nome da Operadora de Vale Transporte
                    //                         </label>
                    //                         <InputText className="w-full" value={state.nomevt}
                    //                         />
                    //                     </div>

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Numero da Linha
                    //                         </label>
                    //                         <InputNumber className="w-full" value={state.codlin}
                    //                         />
                    //                     </div>

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Tipo de Transporte
                    //                         </label>
                    //                         <InputText className="w-full" value={state.tipo}
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Valor da Tarifa
                    //                         </label>
                    //                         <InputNumber className="w-full" value={state.valor}
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Quantidade Utilizada para Ida
                    //                         </label>
                    //                         <InputNumber className="w-full" value={state.qtdida}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Quantidade Utilizada para Volta
                    //                         </label>
                    //                         <InputNumber className="w-full" value={state.qtdvolta}
                    //                             readonly
                    //                         />
                    //                     </div>

                    //                     <div className="col-4 field">
                    //                         <label>
                    //                             Escala Vale Transporte
                    //                         </label>
                    //                         <InputNumber className="w-full" value={state.esc}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-4 field">
                    //                         <FieldName required name='Data Início' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                             inputClassName='obrigatorio'
                    //                         />
                    //                     </div>
                    //                     <div className="col-4 field">
                    //                         <FieldName required name='Data Fim' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                             inputClassName='obrigatorio'
                    //                         />
                    //                     </div>
                    //                     <ContentDivisor content={"LINHA / CARTÃO"}
                    //                     />

                    //                     {
                    //                         linhasTransporte.map(l => (
                    //                             <>
                    //                                 <div className="col-3 field">
                    //                                     <label>
                    //                                         Linha 1
                    //                                     </label>
                    //                                     <InputNumber className="w-full" value={l.linha}
                    //                                         readonly
                    //                                     />
                    //                                 </div>
                    //                                 <div className="col-3 field">
                    //                                     <label>
                    //                                         Numero do Cartão
                    //                                     </label>
                    //                                     <InputNumber className="w-full" value={l.cartao}
                    //                                         readonly
                    //                                     />
                    //                                 </div>
                    //                                 <div className="col-6 field" />
                    //                             </>
                    //                         ))
                    //                     }
                    //                     <Button> Nova linha

                    //                     </Button>
                    //                 </>
                    //             }
                    //             {
                    //                 operacaoSelecionada?.cod === 3 &&
                    //                 <>
                    //                     <div className="col-12 field">
                    //                         <FieldName name='Data Início' />
                    //                         <InputText
                    //                             readOnly
                    //                             className="w-full"
                    //                             value={DataInclusaoVT}
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <FieldName required name='Data Fim' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                             inputClassName='obrigatorio'
                    //                         />
                    //                     </div>
                    //                 </>
                    //             }
                    //         </>
                    //     }

                    //     {
                    //         beneficioSelecionado?.cod === 2 &&
                    //         <>

                    //             {/* PLANO DE SAUDE */}

                    //             <div className="col-12 field">
                    //                 <Divider align="left" > Plano de Saude </Divider>
                    //                 <label>
                    //                     Plano Titular Atual + Data Inclusão
                    //                 </label>
                    //                 {console.log(state)}
                    //                 <InputText className="w-full" value={PlanoAtual + ' | ' + DataInclusaoPlano}
                    //                     readonly
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Tipo de Operação
                    //                 </label>
                    //                 <Dropdown
                    //                     value={operacaoSelecionadaPlano}
                    //                     options={operacaoPlano}
                    //                     className="w-full"
                    //                     onChange={(e) => setOperacaoSelecionadaPlano(e.value)}
                    //                 />
                    //             </div>

                    //             {
                    //                 operacaoSelecionadaPlano?.cod === 1 &&
                    //                 <>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Plano Titular
                    //                         </label>
                    //                         <InputText className="w-full" value={""}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <FieldName name='Data Inclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                         />
                    //                     </div>
                    //                     <div className="col-12 field">
                    //                         <FieldName name='Data Exclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                         />
                    //                     </div>

                    //                     <Divider align="left" > Dependente </Divider>
                    //                     {
                    //                         dependente.length > 0 && dependente?.map(dep => (
                    //                             <div className="col-4 flex flex-column mb-2">
                    //                                 <InputText className="w-full" value={dep.nomdep}
                    //                                     readonly
                    //                                 />
                    //                             </div>
                    //                         ))

                    //                     }

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Marque ou desmarque quem será incluído ou excluído do Plano.
                    //                         </label>
                    //                     </div>
                    //                     <div className="col-3 field">
                    //                         <input id="Manter" name="base" type="radio" value="S" />
                    //                         <label>
                    //                             Manter dependente no Plano
                    //                         </label>
                    //                         <label>
                    //                             <input id="Incluir" name="base" type="radio" value="S" />
                    //                             Esta ação irá incluir dependente no Plano
                    //                         </label>
                    //                         <label>
                    //                             <input id="Excluir" name="base" type="radio" value="S" />
                    //                             Esta ação irá excluir dependente no Plano
                    //                         </label>
                    //                     </div>
                    //                 </>
                    //             }

                    //             {
                    //                 operacaoSelecionadaPlano?.cod === 2 &&
                    //                 <>
                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Plano Titular
                    //                         </label>
                    //                         <InputText className="w-full" value={""}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-4 field">
                    //                         <FieldName name='Data Inclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                         />
                    //                     </div>
                    //                     <div className="col-4 field">
                    //                         <FieldName name='Data Exclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                         />
                    //                     </div>

                    //                     <Divider align="left" > Dependente </Divider>
                    //                     {
                    //                         dependente.length > 0 && dependente?.map(dep => (
                    //                             <div className="col-4 flex flex-column mb-2">
                    //                                 <InputText className="w-full" value={dep.nomdep}
                    //                                     readonly
                    //                                 />
                    //                             </div>
                    //                         ))

                    //                     }

                    //                     <div className="col-12 field">
                    //                         <label>
                    //                             Marque ou desmarque quem será incluído ou excluído do Plano.
                    //                         </label>
                    //                     </div>
                    //                     <div className="col-3 field">
                    //                         <input id="Manter" name="base" type="radio" value="S" />
                    //                         <label>
                    //                             Manter dependente no Plano
                    //                         </label>
                    //                         <label>
                    //                             <input id="Incluir" name="base" type="radio" value="S" />
                    //                             Esta ação irá incluir dependente no Plano
                    //                         </label>
                    //                         <label>
                    //                             <input id="Excluir" name="base" type="radio" value="S" />
                    //                             Esta ação irá excluir dependente no Plano
                    //                         </label>
                    //                     </div>
                    //                 </>
                    //             }

                    //             {
                    //                 operacaoSelecionadaPlano?.cod === 3 &&
                    //                 <>
                    //                     <div className="col-6 field">
                    //                         <label>
                    //                             Plano Titular Atual
                    //                         </label>
                    //                         <InputText className="w-full" value={PlanoAtual + ' | ' + DataInclusaoPlano}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-4 field">
                    //                         <FieldName name='Data Inclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                         />
                    //                     </div>
                    //                     <div className="col-6 field">
                    //                         <FieldName name='Data Exclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                         />
                    //                     </div>

                    //                     <Divider align="left" > Dependente </Divider>
                    //                     {
                    //                         dependente.length > 0 && dependente?.map(dep => (
                    //                             <div className="col-4 flex flex-column mb-2">
                    //                                 <InputText className="w-full" value={dep.nomdep}
                    //                                     readonly
                    //                                 />
                    //                             </div>
                    //                         ))

                    //                     }

                    //                     <div className="col-3 field">
                    //                         <input id="Excluir" name="base" type="radio" value="S" />
                    //                         <label>
                    //                             Excluir
                    //                         </label>
                    //                     </div>
                    //                 </>
                    //             }
                    //             {
                    //                 operacaoSelecionadaPlano?.cod === 4 &&
                    //                 <>
                    //                     <div className="col-6 field">
                    //                         <label>
                    //                             Plano Titular Atual
                    //                         </label>
                    //                         <InputText className="w-full" value={PlanoAtual + ' | ' + DataInclusaoPlano}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                     <div className="col-6 field">
                    //                         <FieldName name='Data Exclusão' />
                    //                         <Datepicker
                    //                             className='w-full'
                    //                         />
                    //                     </div>

                    //                     <Divider align="left" > Dependente </Divider>
                    //                     {
                    //                         dependente.length > 0 && dependente?.map(dep => (
                    //                             <div className="col-4 flex flex-column mb-2">
                    //                                 <InputText className="w-full" value={dep.nomdep}
                    //                                     readonly
                    //                                 />
                    //                             </div>
                    //                         ))

                    //                     }

                    //                     <div className="col-3 field">
                    //                         <input id="Excluir" name="base" type="radio" value="S" />
                    //                         <label>
                    //                             Excluir
                    //                         </label>
                    //                     </div>
                    //                 </>
                    //             }

                    //         </>
                    //     }

                    //     {/* PLANO ODONTO */}

                    //     {
                    //         beneficioSelecionado?.cod === 3 &&
                    //         <>

                    //             <div className="col-12 field">
                    //                 <Divider align="left" > Plano Odonto </Divider>
                    //                 <label>
                    //                     Plano Titular Atual
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                     readonly
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Tipo de Operação
                    //                 </label>
                    //                 <Dropdown
                    //                     value={operacaoSelecionadaPlano}
                    //                     options={operacaoPlano}
                    //                     className="w-full"
                    //                     onChange={(e) => setOperacaoSelecionadaPlano(e.value)}
                    //                 />
                    //             </div>
                    //             <div className="col-4 field">
                    //                 <FieldName name='Data Exclusão' />
                    //                 <Datepicker
                    //                     className='w-full'
                    //                 />
                    //             </div>

                    //             <Divider align="left" > Dependente </Divider>
                    //             {
                    //                 dependente.length > 0 && dependente?.map(dep => (
                    //                     <div className="col-4 flex flex-column mb-2">
                    //                         <InputText className="w-full" value={dep.nomdep}
                    //                             readonly
                    //                         />
                    //                     </div>
                    //                 ))

                    //             }

                    //         </>
                    //     }

                    //     {/* VA/VR */}
                    //     {
                    //         beneficioSelecionado?.cod === 4 &&
                    //         <>

                    //             <Divider align="left" > VA / VR </Divider>


                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Tipo de Operação
                    //                 </label>
                    //                 <Dropdown
                    //                     value={operacaoSelecionadaVale}
                    //                     options={operacaoVale}
                    //                     className="w-full"
                    //                     onChange={(e) => setOperacaoSelecionadaVale(e.value)}
                    //                 />
                    //             </div>

                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Codigo do Vale Anterior
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                     readonly
                    //                 />
                    //             </div>
                    //             <div className="col-6 field">
                    //                 <label>
                    //                     Tipo Vale
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-6 field">
                    //                 <label>
                    //                     Quantidade Vales
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Dia útil
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Sábado
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Domingo
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Feriado
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />

                    //             </div>
                    //             <div className="col-12 field">
                    //                 <label>
                    //                     Codigo do Vale
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                     readonly
                    //                 />
                    //             </div>
                    //             <div className="col-6 field">
                    //                 <label>
                    //                     Tipo Vale
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-6 field">
                    //                 <label>
                    //                     Quantidade Vales
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Dia útil
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Sábado
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Domingo
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //             <div className="col-3 field">
                    //                 <label>
                    //                     Quantidade Feriado
                    //                 </label>
                    //                 <InputText className="w-full" value={""}
                    //                 />
                    //             </div>
                    //         </>
                    //     }

                    // </>
                }

            </div>
        </div>
    )
}