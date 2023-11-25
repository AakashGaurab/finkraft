import React,{useEffect,useState} from 'react'
import Navbar from '../../component/Navbar'
import Swal from 'sweetalert2';
import Style from './home.module.css';
import Loader from "../../component/Loader"
import Card from '../../component/Card'

function Home() {
  let id = sessionStorage.getItem("token");
  if (!id){
    window.location.href="/login";
  }
  let [flag,setFlag] = useState(false);
  let [uploaded,setUploaded] = useState([]);
  const [trigger, setTrigger] = useState(0);

  useEffect(()=>{                 //getting all uploaded files on mounting 
    async function getallfiles(){
        try {
          let response = await fetch('http://localhost:3501/files',{
            method:"GET",
            headers:{
              token:sessionStorage.getItem("token")
            }
          });
          let data = await response.json();
          setUploaded(data);

          
        } catch (error) {
          Swal.fire({
            icon:"info",
            title:error
          })
        }
    }


    getallfiles();
  },[trigger])

  let uploadFile = async ()=>{            // on click upload file to s3
    setFlag(true);    // loader activated
    const file = document.getElementById("inputGroupFile04").files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3501/files/upload', {
        method: 'POST',
        headers:{
           token:sessionStorage.getItem("token")
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
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


    setFlag(false);   //loader deactivated
  }
  return (
    <>
    <Navbar/>
    {flag?<Loader/>:
    <div className={Style.upload}>
      <div className="input-group">
        <input type="file" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
        <button className="btn btn-outline-success" type="button" id="inputGroupFileAddon04" onClick={uploadFile}>Upload</button>
      </div>
    </div>}

    <div>
    {uploaded.map((element)=>{
      return (
      <Card filename = {element.filename} id = {element.id} uploadDate = {element.uploadDate} setTrigger={setTrigger}/>
      )
    })}
    </div>
    
    
    </>
  )
}

export default Home