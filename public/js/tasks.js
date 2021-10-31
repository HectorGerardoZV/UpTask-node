
import Swal from "sweetalert2";
import axios from "axios";

const tasks =  document.querySelector(".tasks-list");
import {calculateAdvance} from "./functions/calculateAdvance";

if(tasks){
    tasks.addEventListener("click",e=>{
        const action  = e.target.id;
        const idTask =(e.target.dataset.idtask);
        const singleTask = e.target;
        //const urlProject = (tasks.dataset.urlproject);
        
        if(action==="delete"){
           const taskHTML = (e.target.parentElement.parentElement);
            Swal.fire({
                title: 'Do you want to delete this task?',
                text: "Once deleted it can never be recovered!",
                showCancelButton: true,
                icon: "warning",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: "No",
              }).then((result) => {
                if (!result.dismiss) {
                  const url  = `${location.origin}/deleteTask/${idTask}`;
                   axios.delete(url,{params:{idTask}}).then(respueta=>{
                       Swal.fire(
                        'Project deleted!',
                        'Project was deleted',
                        'success',
                      )
                      taskHTML.remove();
                      calculateAdvance();
                   });
                   
                }
              }).catch(()=>{
                Swal.fire(
                    {
                        type:"error",
                        title:"Error",
                        text: "Task couldn't be deleted"
                    }
                  )
              })
        }
        else if(action ==="change"){
            const url = `${location.origin}/updateTask/${idTask}`;
            
            axios.patch(url,{idTask})
            .then(response=>{
                if(response.status===200){
                   let src = singleTask.src;
                   
                   if(src ==`${location.origin}/img/Success-no.svg`){
                      src = `${location.origin}/img/Success-yes.svg`;
                        singleTask.classList.remove("no");
                        singleTask.classList.add("yes");
                   }
                   else if(src == `${location.origin}/img/Success-yes.svg`){
                    src = `${location.origin}/img/Success-no.svg`;
                    singleTask.classList.remove("yes");
                        singleTask.classList.add("no");
                   }

                   singleTask.src =src;
                    
                   calculateAdvance();
                }
            })
        }
    })
}


export default tasks;