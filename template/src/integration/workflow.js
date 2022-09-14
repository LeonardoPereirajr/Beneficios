/* eslint-disable */

import { saveData } from "./saveDate";
import GLOBAL from './storage.json'
import processVariableMapper from "../Functions/processVariablesMapper";

export default function workflowStart(renderApp) {
    workflowCockpit({
        init,
        onSubmit,
        onError
    });


    async function init(data, info) {
        let dadosDoProcesso = {};
        dadosDoProcesso.variaveisProcesso = processVariableMapper(await info.getInfoFromProcessVariables());
        dadosDoProcesso.dadosPlataforma = await info.getPlatformData();
        dadosDoProcesso.usuario = await info.getUserData();
        dadosDoProcesso.novaSolicitacao = info.isRequestNew();

        renderApp(dadosDoProcesso, info);
    }

    function onSubmit(data, info) {
        const {tarefaAtiva} = GLOBAL;
        if(tarefaAtiva==1 || tarefaAtiva==3){
            return saveData().tarefa_1()
        } else if(tarefaAtiva==2){
            return saveData(data).tarefa_2()
        } 
    }

    function onError() {
    }
}