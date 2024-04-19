import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import LandingImages from '../assets/profle.png'
import ProjectCard from '../Components/ProjectCard'
// import { useNavigate } from 'react-router-dom'

import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectsAPI } from '../services/allAPI';






function Home() {


    const [homeProjects,setHomeProjects] = useState([])

    const navigate =useNavigate()
    const [loginStatus,setLoginStatus]=useState(false)
    console.log(homeProjects);

    useEffect(()=>{
        getHomePojects()
        if(sessionStorage.getItem("token")){
            setLoginStatus(true)
        }else{
            setLoginStatus(false)
        }
    },[])


    const handleProjects = ()=>{
        if(loginStatus){
            navigate('/projects')
        }else{
            toast.warning("please login to get full access to our projects")
        }
    }
    // const navigate = useNavigate()

    // const handleNavigate = () => {
       
    //   navigate('/login')
    // }


    const getHomePojects = async ()=>{
        try{
            const result = await getHomeProjectsAPI()
            console.log(result);
             if(result.status==200){
                setHomeProjects(result.data)
             }
        }catch(err){
            console.log(err);
        }
    }
    return (
    <>
            <div style={{ height: '100vh' }} className='w-100 d-flex justify-content-center align-items-center rounded border shadow'>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 style={{ fontSize: '80px' }}><i class="fa-brands fa-pagelines"></i>Project Fair</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam sunt at facilis assumenda vero non quasi sapiente veniam exercitationem totam temporibus rem nisi numquam facere sint, quas delectus? Atque, reiciendis?</p>
                            {
                                loginStatus?
                            <Link to={'/dashboard'} className='btn btn-warning'>Manage Your Projects<i class="fa-solid fa-right-long ms-2"></i></Link>
                            :
                            <Link to={'/login'} className='btn btn-warning'>Start to Explore<i class="fa-solid fa-right-long ms-2"></i></Link>
                          }
                        </div>
                        <div className="col-lg-6">
                            <img style={{ height: '800px' }} src={LandingImages} />
                        </div>
                    </div>
                </div>
                </div>




                <div className="mt-5 mb-5 text-center ">
                    <h1 className=' '>Explore Our Projects</h1>
                    <marquee>
                        <div className="d-flex">
                            { homeProjects?.length>0 &&
                            homeProjects?.map(project=>(

                            
                            <div key={project} className="me-5">
                                <ProjectCard  displayData={project}/>
                            </div>
                            ))
                            }
                        </div>
                    </marquee>
                    <button onClick={handleProjects} className='btn btn-link mt-3 '>Click here to View More Projects</button>
                </div>
                {/* testimony */}

                <div className="d-flex justify-content-evenly align-items-center flex-column mb-5">
                    <h1>Our Testimonials</h1>
                    <div className="d-flex justify-content-evenly align-items-center mt-3 w-100  ">
                    <Card style={{ width: '28rem' }}>
     
      <Card.Body>
      <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
        <Card.Img style={{height:'60px',width:'60px'}} className='rounded-circle img-fluid' variant="top" src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png" />
        <h3>max Miller</h3>
        </Card.Title>
        <Card.Text>
         <div className="d-flex justify-content-center">
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            <i className='fa-solid fa-star text-warning'></i>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi non saepe ea consequuntur modi et asperiores fugit repellat qui commodi earum quaerat corrupti iusto, officia sequi distinctio! Cupiditate, quas mollitia?</p>
        </Card.Text>
       
      </Card.Body>
    </Card>

    <Card style={{ width: '28rem' }}>
     
     <Card.Body>
     <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
       <Card.Img style={{height:'60px',width:'60px'}} className='rounded-circle img-fluid' variant="top" src="https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/64-512.png" />
       <h3>Aleena</h3>
       </Card.Title>
       <Card.Text>
        <div className="d-flex justify-content-center">
           <i className='fa-solid fa-star text-warning'></i>
           <i className='fa-solid fa-star text-warning'></i>
           <i className='fa-solid fa-star text-warning'></i>
           <i className='fa-solid fa-star text-warning'></i>
           <i className='fa-regular fa-star'></i>
           </div>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi non saepe ea consequuntur modi et asperiores fugit repellat qui commodi earum quaerat corrupti iusto, officia sequi distinctio! Cupiditate, quas mollitia?</p>
       </Card.Text>
      
     </Card.Body>
   </Card>

   <Card style={{ width: '28rem' }}>
     
     <Card.Body>
     <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
       <Card.Img style={{height:'60px',width:'60px'}} className='rounded-circle img-fluid' variant="top" src="https://th.bing.com/th/id/OIP.XczAIdO8BGJDtoQEvIwA9QHaHa?w=512&h=512&rs=1&pid=ImgDetMain" />
       <h3>Jhon</h3>
       </Card.Title>
       <Card.Text>
        <div className="d-flex justify-content-center">
           <i className='fa-solid fa-star text-warning'></i>
           <i className='fa-solid fa-star text-warning'></i>
           <i className='fa-solid fa-star text-warning'></i>
           <i className='fa-regular fa-star'></i>
           <i className='fa-regular fa-star'></i>
           </div>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi non saepe ea consequuntur modi et asperiores fugit repellat qui commodi earum quaerat corrupti iusto, officia sequi distinctio! Cupiditate, quas mollitia?</p>
       </Card.Text>
      
     </Card.Body>
   </Card>
                        </div>
                        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
                </div>
            </>


            )
}

            export default Home