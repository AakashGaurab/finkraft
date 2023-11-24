import React,{useEffect,useState} from 'react'
import Navbar from '../../component/Navbar'
import Swal from 'sweetalert2';
import Style from './home.module.css';
import Loader from "../../component/Loader"

function Home() {
  let [flag,setFlag] = useState(false);

  useEffect(()=>{
    async function getallfiles(){
        try {
          let response = await fetch('http://localhost:3501/files');
          let data = await response.json();
          console.log(data);
          
        } catch (error) {
          Swal.fire({
            icon:"info",
            title:error
          })
        }
    }


    getallfiles();
  },[])

  let uploadFile = async ()=>{
    setFlag(true);
    const file = document.getElementById("inputGroupFile04").files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3501/files/upload', {
        method: 'POST',
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


    setFlag(false);
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


    
    </>
  )
}

export default Home