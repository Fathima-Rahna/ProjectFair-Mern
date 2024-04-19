import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ProjectCard from '../Components/ProjectCard'
import { getAllProjectsAPI } from '../services/allAPI';
import { Col, Row } from 'react-bootstrap';

function Projects() {
  const [searchkey,setSearchKey] = useState("")

  const [allProjects,setAllProjects] =useState([])
  console.log(allProjects);
  console.log(searchkey);

  useEffect(()=>{
    getAllProjects()
  },[searchkey])

  const getAllProjects = async ()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Authorization" :`Bearer ${token}`
    }
    try{
      const result = await getAllProjectsAPI(searchkey,reqHeader)
       console.log(result);
       if(result.status==200){
        setAllProjects(result.data)
       }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
    <Header/>
    <div style={{marginTop:'150px'}} className='container-fluid'>
      <div className="d-flex justify-content-between">
        <h1>All projects</h1>
        <input onChange={e=>setSearchKey(e.target.value)} className='form-control w-25' type='text' placeholder='search project by languaged used' />
        </div>
        <Row className="mt-5">
          {
            allProjects?.length>0?
            allProjects?.map(project=>(
              <Col key={project} className='mb-3' sm={12} md={6} lg={4}>
                <ProjectCard displayData={project}/>
              </Col>
            ))
            :
            <div className='fw-bolder text-danger m-5 text-center'>project not found</div>
}

        </Row>
          
    
    
    </div>
    </>
  )
}

export default Projects