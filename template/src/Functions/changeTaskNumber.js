import findSring from "./findString";
import VARIAVEIS_DO_PROCESSO from '../integration/storage.json'

export default function changeTaskNumber(taskData, setId) {
    const taskName = taskData?.taskName;

    let buscando = true;
    let i = 1;
    while (buscando && i < 50) {
        if (findSring(taskName, `${i}`)) {
            buscando = false;
            VARIAVEIS_DO_PROCESSO.tarefaAtiva = i;
            if (setId) {
                setId(i)
            }
        }
        i++
    }
}