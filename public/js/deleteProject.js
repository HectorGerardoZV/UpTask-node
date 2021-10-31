import Swal from "sweetalert2";
import axios from "axios";

const deleteBTN = document.querySelector("#deleteProject");

if(deleteBTN){
    deleteBTN.addEventListener("click",e=>{
        const projectURL = e.target.dataset.projectUrl;
        Swal.fire({
            title: 'Do you want to delete this project?',
            text: "Once deleted it can never be recovered!",
            showCancelButton: true,
            icon: "warning",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar',
            cancelButtonText: "No, Borrar!",
          }).then((result) => {
            if (!result.dismiss) {
              const url  = `${location.origin}/deleteProject/${projectURL}`;
               axios.delete(url,{params:{projectURL}}).then(respueta=>{
                   Swal.fire(
                    'Project deleted!',
                    'Project was deleted',
                    'success',
                  )
                 setTimeout(() => {
                    window.location.href="/";
                 }, 2000);
               });
            }
          }).catch(()=>{
            Swal.fire(
                {
                    type:"error",
                    title:"Error",
                    text: "Project couldn't be deleted"
                }
              )
          })
        
    })
}

export default deleteBTN;