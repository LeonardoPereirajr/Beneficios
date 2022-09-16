import { useEffect, useState } from "react"
import useGlobalState from "./globalState"
import Tarefa_1 from "./Pages/Tarefa_1";
import changeTaskNumber from "./Functions/changeTaskNumber";
import Tarefa_2 from "./Pages/Tarefa_2";

export default function App({ data,info }) {
  const { globalState, setGlobalState } = useGlobalState();
  const[tarefaAtiva,setTarefaAtiva]=useState(null);

  useEffect(() => {
    setGlobalState(data);
  }, [data])

  useEffect(()=>{
    info.getTaskData().then(task=> changeTaskNumber(task,setTarefaAtiva));
  },[])



  function renderPage() {
    console.log(tarefaAtiva)
    if (tarefaAtiva==1) {
      console.log("Entrou")
      return <Tarefa_1 />
    }else if(tarefaAtiva==2){
      return <Tarefa_2/>
    }else if (tarefaAtiva==3){
      return <Tarefa_1/>
    }
     else{
      return <Tarefa_1/>
    }
  }
  if (globalState) {
    return (
      <div className="px-1">
        {renderPage()}
      </div>
    )
  }
}