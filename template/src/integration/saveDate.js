import GLOBAL from './storage.json'
import findSring from '../Functions/findString';

export function saveData(data) {
    let invalidForm = false;


    const saveStop = () => {
        // throw new Error('Formulario Invalido')
        console.log(GLOBAL.tarefa_1)
    }


    function tarefa_1() {
        const taskData = GLOBAL.tarefa_1;
        console.log(taskData)

        let retorno = {
            nomevt: taskData.nomevt,
            codlin: taskData.codlin,
            tipo: taskData.tipo,
            valor: taskData.valor,
            qtdida: taskData.qtdida,
            qtdvolta: taskData.qtdvolta,
            novoperiodo: taskData.novoperiodo,
            esc: taskData.esc,
            datafimvale: taskData.datafimvale,
            linha: taskData.linha,
            cartao: taskData.cartao,
            motivoSelecionado: taskData.motivoSelecionado.label,
            operacaoSelecionada: taskData.operacaoSelecionada.label,
            beneficioSelecionado:taskData.beneficioSelecionado.label,
            transporteSelecionado: taskData.transporteSelecionado.label,
        }
        return {
            formData: { ...retorno }
        }
    }
    saveStop()


function tarefa_2() {
    const decisaoUsuario = data.nextAction.name;
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
}
return { tarefa_1, tarefa_2 }
}