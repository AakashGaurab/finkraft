import React from 'react'
import Style from "./Card.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faDownload,faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

function Card(props) {

    let  deleteFile= async (name)=>{                //deleting a file
        try {
            let response = await fetch(`http://65.0.106.33:3501/files/delete/${name}`,{
                method:"DELETE",
                headers:{
                    "Content-type":"application/json"
                }
            })

            let data = await response.json();
            Swal.fire({
                icon:"success",
                title:data
            })
        } catch (error) {
            Swal.fire({
                icon:"error",
                title:error
            })
        }
    }

  return (
      <div key={props.id} className={Style.card}>
        <h3>{props.filename}</h3>
        <p>{props.uploadDate}</p>
        <div>
        <FontAwesomeIcon icon={faDownload} beat size="2xl"/>
        <FontAwesomeIcon icon={faTrash} beat size='2xl' onClick={()=>{props.setTrigger(prev => prev + 1); deleteFile(props.filename)}}/>
        </div>
      </div>
  )
}

export default Card