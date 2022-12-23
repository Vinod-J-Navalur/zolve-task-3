import { useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Webcam from "react-webcam";
import Avatar from 'react-avatar-edit';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
//import { func } from 'prop-types';
//import { func } from 'prop-types';

function App(){
  
  const webref = useRef(null)
  const [imgg,setImgg] = useState("")
  const [capture,setCapture] = useState(false)
  const [preview,setPreview] = useState(false)

  function detectWebcam(callback) {
    let md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) return callback(false);
    md.enumerateDevices().then(devices => {
      callback(devices.some(device => 'videoinput' === device.kind));
    })
  }
  

  function call(){
    window.location.reload()
  }


   function begin (){
   
    detectWebcam(async function (hasWebcam) {
      if(hasWebcam){
        const bool =  await navigator.mediaDevices.getUserMedia({video: true}).then(actualBegin()).catch(function con(){toast.error('User Denied the Permission!', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });; setTimeout(call,5000)})
        //console.log(bool)
      }
      else{
        toast.error('No Camera Found !', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setTimeout(call,5000)
      }
    })
    
  }

  

  function actualBegin() {

    

     setCapture(prev => !prev)
      setPreview(false)
  }
  function onClose(){
    setPreview(null)
  }

  function onCrop(view){
    setPreview(view )
  }

  function stopVideo(){
    setCapture(false)
  }

  function handleClick(){
      setImgg(webref.current.getScreenshot())
      setPreview(pre => !pre)
      stopVideo()
  }

  function upload(){
    toast.success('Photo Successfully Uploaded !', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });

      setTimeout(call,5000)
    
  }

  return (
    <div className="App">
      <h1>Zolve Task 3 </h1>
      
      {capture && < Webcam ref={webref}/>}
      <div className="card">
        <button onClick={begin}>{capture ? `Stop`: `Start`}</button>
        <br/><br/>
        {capture && <button onClick={handleClick}>   Click Photo  </button>}
        </div>
      {preview && <Avatar width={200}
      height={300}
      src={imgg} 
      onCrop={onCrop}
      onClose={onClose}  />}   
      <br/><br/>
      {preview && <img  className='preview' src={preview} alt=""/>}
      <br/><br/>
      {preview && <button className='upload' onClick={upload}>Upload </button>}
      <ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      
    </div>
  )
}

export default App
