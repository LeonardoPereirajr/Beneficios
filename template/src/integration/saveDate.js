import GLOBAL from './storage.json'
import validation from '../Functions/functions.js'
import findSring from '../Functions/findString';

export function saveData(data) {
    let invalidForm = false;
    

    const saveStop = () => {
        throw new Error('Formulario Invalido')
    }


    function tarefa_1() {
        const taskData = GLOBAL.tarefa_1;
        console.log(taskData)

        let retorno = {
            solicitante: ` ${taskData.usuario.numCad} - ${taskData.usuario.nomFun} `,
            empresa: `${taskData.empresa.numEmp} - ${taskData.empresa.nomFil}`,
            filial: `${taskData.empresa.numEmp} - ${taskData.empresa.nomFil}`,
            data: new Date(),
            cargo: taskData.usuario.cargo,
            escala: taskData.usuario.escala,
            beneficios_JSON: JSON.stringify(taskData),
            dados: `Empresa ${taskData.empresa.nomFil} - ${taskData.empresa.numEmp} - ${taskData.empresa.nomFil} - Colaborador ${taskData.usuario?.nomFun} - ${taskData.usuario?.nomFun}`,
           descricao: taskData.descricao
        }
        return {
            formData: retorno
        }
    }
    function tarefa_2(){
        const decisaoUsuario = data.nextAction.name;
        if(findSring(decisaoUsuario,'Ajustar' )||findSring(decisaoUsuario,'Reprovar')){
            if(!GLOBAL.tarefa_2?.observacao){
                alert("Campo observação é obrigatório")
                saveStop()
            }
            console.log(GLOBAL.tarefa_2.observacao)
            return {
                formData: {
                    observacao: GLOBAL.tarefa_2.observacao,
                    decisao: decisaoUsuario
                }
             
            }
        }else{
            return{
                formData: {decisao: decisaoUsuario}
            }
        }
    }
    return {tarefa_1,tarefa_2}
}