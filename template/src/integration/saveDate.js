import GLOBAL from './storage.json'
import findSring from '../Functions/findString';
import postValeTransporte from '../Services/postValeTransporte'
import { setMessage } from '../globalState';

export function saveData(data) {
    let invalidForm = false;


    const saveStop = () => {
        // throw new Error('Formulario Invalido')
        console.log(GLOBAL.tarefa_1)
    }


    function tarefa_1() {
        const taskData = GLOBAL.tarefa_1;
        console.log(taskData)
        // throw new Error()
        let retorno = {
            motivoSelecionado: taskData.motivoSelecionado.label,
            operacaoSelecionada: taskData.operacaoSelecionada.label,
            beneficioSelecionado: taskData.beneficioSelecionado.label,
            transporteSelecionado: taskData.transporteSelecionado.label,
            codlin: taskData.codlin,
            tipo: taskData.tipo,
            valor: taskData.valor,
            qtdida: taskData.qtdida,
            qtdvolta: taskData.qtdvolta,
            datainivale: taskData.datainivale,
            fimperiodo: taskData.fimperiodo,
            esc: taskData.esc,
            datafimvale: taskData.datafimvale,
            linha: taskData.linha,
            cartao: taskData.cartao,
            escvtr: taskData.escvtr,
            inievt: taskData.inievt,
            nomevt: taskData.nomevt,
            datainiescala: taskData.datainiescala,
            tarefa1_JSON: JSON.stringify(taskData)
        }
        return {
            formData: { ...retorno }
        }
    }
    saveStop()


    async function  tarefa_2() {
        const taskData = GLOBAL.tarefa_2;
        const decisaoUsuario = data.nextAction.name;
        const proximaTarefa = data.nextAction;
        let erroIntegracao = 0;
        let integracao;
        console.log(GLOBAL)
        if (findSring(decisaoUsuario, 'Ajustar') || findSring(decisaoUsuario, 'Reprovar')) {
            return {
                formData: {
                    decisao: decisaoUsuario
                }
            }
        } else {
            return {
                formData: { decisao: decisaoUsuario }
            }
        }
        // eslint-disable-next-line no-unreachable
        if (!invalidForm) {
            if (findSring(proximaTarefa.name, 'Aprova')) {
                let beneficios = [{
                        motivoSelecionado: GLOBAL.state.variaveisProcesso.empresaSolicitante,
                        operacaoSelecionada: GLOBAL.state.variaveisProcesso.operacaoSelecionada.label,
                        beneficioSelecionado: GLOBAL.state.variaveisProcesso.beneficioSelecionado.label,
                        transporteSelecionado: GLOBAL.state.variaveisProcesso.transporteSelecionado.label,
                        codlin: GLOBAL.state.variaveisProcesso.codlin,
                        tipo: GLOBAL.state.variaveisProcesso.tipo,
                        valor: GLOBAL.state.variaveisProcesso.valor,
                        qtdida: GLOBAL.state.variaveisProcesso.qtdida,
                        qtdvolta: GLOBAL.state.variaveisProcesso.qtdvolta,
                        novoperiodo: GLOBAL.state.variaveisProcesso.novoperiodo,
                        fimperiodo: GLOBAL.state.variaveisProcesso.fimperiodo,
                        esc: GLOBAL.state.variaveisProcesso.esc,
                        datafimvale: GLOBAL.state.variaveisProcesso.datafimvale,
                        linha: GLOBAL.state.variaveisProcesso.linha,
                        cartao: GLOBAL.state.variaveisProcesso.cartao,
                        escvtr: GLOBAL.state.variaveisProcesso.escvtr,
                        inievt: GLOBAL.state.variaveisProcesso.inievt,
                        nomevt: GLOBAL.state.variaveisProcesso.nomevt,
                    }];
                    let { retorno } = await postValeTransporte(beneficios);
                if (retorno != 'Sucesso') {
                    erroIntegracao = 1;
                    console.log("Retorno != Sucesso")
                    setMessage({ severity: 'error', detail: retorno, sticky: true, life: 10000 });
                    integracao = 'Erro na integração'
                    throw new Error('Erro na integração.');
                } else if (retorno == 'Sucesso') {
                    console.log("retorno = Sucesso")
                    // eslint-disable-next-line no-unused-vars
                    integracao = 'Integrado com sucesso'
                    // eslint-disable-next-line no-unused-vars
                    erroIntegracao = 0;
                    setMessage({ severity: 'success', 
                    summary: 'Gravado com Sucesso!', detail: 'Beneficio gravado com sucesso!', sticky: true })
                }
            }
            let retorno = {
            codlin: taskData.codlin,
            tipo: taskData.tipo,
            valor: taskData.valor,
            qtdida: taskData.qtdida,
            qtdvolta: taskData.qtdvolta,
            novoperiodo: taskData.datainivale,
            fimperiodo: taskData.fimperiodo,
            esc: taskData.esc,
            datafimvale: taskData.datafimvale,
            linha: taskData.linha,
            cartao: taskData.cartao,
            motivoSelecionado: taskData.motivoSelecionado.label,
            operacaoSelecionada: taskData.operacaoSelecionada.label,
            beneficioSelecionado: taskData.beneficioSelecionado.label,
            transporteSelecionado: taskData.transporteSelecionado.label,
            escvtr: taskData.escvtr,
            inievt: taskData.inievt,
            nomevt: taskData.nomevt
            }
            console.log("FormData Retorno", retorno)
            return {
                formData: { ...retorno }
            }
        } else {
            saveStop()
        }
    }
    return { tarefa_1, tarefa_2 }
}