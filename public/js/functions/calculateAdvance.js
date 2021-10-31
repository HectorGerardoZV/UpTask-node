import Swal from "sweetalert2";
export const calculateAdvance=()=>{
    //Seleccionar las tareas pendientes
    const tasksList = document.querySelectorAll("li.task");
    if(tasksList.length){
    //Seleccioanr las tareas completadas
    const completeTasks = document.querySelectorAll("img.yes");

    //Calcular el advanceProject
    const advanceProject = Math.round((completeTasks.length/tasksList.length)*100);

    //Mostrar el advanceProject
    const porcentaje= document.querySelector("#percentage");
    porcentaje.style.width = advanceProject+"%";

    if(advanceProject ==100){
        Swal.fire(
            'Project completed',
            'You have already finished this project',
            'success'
          )
    }
    }
}
