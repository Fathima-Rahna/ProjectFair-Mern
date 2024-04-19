import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Idea from '../assets/upload.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addprojectAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';
function Add() {
 const {addResponse,setAddResponse}= useContext(addResponseContext)
  const [preview,setPreview] = useState("")
  const [imageFileStatus,setImageFileStatus]= useState(false)

  const [projectDetails,setprojectDetails] = useState({
    title:"",language:"",overview:"",github:"",website:"",projectImage:""
  })
    const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setprojectDetails({title:"",language:"",overview:"",github:"",website:"",projectImage:""})
  }
  const handleShow = () => setShow(true);
  console.log(projectDetails);

  useEffect(()=>{
    if(projectDetails.projectImage.type=="image/png" || projectDetails.projectImagetype=="image/jpg" || projectDetails.projectImagetype=="image/jpeg"){
    setImageFileStatus(true)
    setPreview(URL.createObjectURL(projectDetails.projectImage))
   
    }else{
      setPreview(Idea)
      setImageFileStatus(false)
      setprojectDetails({...projectDetails,projectImage:""})
    }

  },[projectDetails.projectImage])



   const handleUploadProject =async ()=>{
    const {title,language,overview,github,website,projectImage}=projectDetails
    if(!title ||!language || !overview || !github || !website || !projectImage ){
      toast.warning("please fill the form completely")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization" :`Bearer ${token}`
        }

        //api call
        try{
        const result = await addprojectAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          setAddResponse(result)
          handleClose()
        }else{
           toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
   }
  }

  return (
    <>

    <button onClick={handleShow} className='btn'><i className='fa-solid fa-plus me-1'></i>Add New</button>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="row">
            <div className="col-lg-4">
                <label>
                    <input type='file' style={{display:'none'}} onChange={e=>setprojectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                    <img height={'200px'} className='Img-fluid' src={preview} alt=''/>
                </label>
                {!imageFileStatus&&
                <div className='text-danger my-2'>*upload only following types (png,jpg,jpeg) here!!!</div>}
            </div>
            <div className="col-lg-8">
                <div className="mb-2">
                    <input type='text' className='form-control' placeholder='project Title'value={projectDetails.title} onChange={(e)=>setprojectDetails({...projectDetails,title:e.target.value})} />
                </div>
                <div className="mb-2">
                    <input type='text' className='form-control' placeholder='Language used in his project'value={projectDetails.language} onChange={(e)=>setprojectDetails({...projectDetails,language:e.target.value})} />
                </div>
                <div className="mb-2">
                    <input type='text' className='form-control' placeholder='Project Git-hub link' value={projectDetails.github} onChange={(e)=>setprojectDetails({...projectDetails,github:e.target.value})} />
                </div>
                <div className="mb-2">
                    <input type='text' className='form-control' placeholder='Project Website-link'value={projectDetails.website} onChange={(e)=>setprojectDetails({...projectDetails,website:e.target.value})} />
                </div>
              
            </div>
            <div className="mb-2">
                    <input type='text' className='form-control' placeholder='Project overview'value={projectDetails.overview} onChange={(e)=>setprojectDetails({...projectDetails,overview:e.target.value})} />
                </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUploadProject}>Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Add