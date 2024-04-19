



import React, { useContext, useEffect, useState } from 'react';
import Edit from './Edit';
import Add from './Add';
import {getUserProjectsAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextAPI';


function View() {
    const {addResponse,setAddResponse}= useContext(addResponseContext)
    const [userProjects, setUserProjects] = useState([]);
    console.log(userProjects);

    useEffect(() => {
        getUserProjects();
    }, [addResponse]);

    const getUserProjects = async () => {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        };
        try {
            const result = await getUserProjectsAPI(reqHeader);

            console.log(result);
            if (result.status === 200) {
                setUserProjects(result.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
  
    return (
        <div>
            <div className="d-flex justify-content-between w-100">
                <h2 className='text-warning'>All Projects</h2>
                <div><Add /></div>
            </div>
            <div className="mt-4">
                {userProjects?.length > 0 ? (
                    userProjects?.map(project => (
                        <div key={project.id} className='d-flex justify-content-between border p-2 rounded '>
                            <h3>{project?.title}</h3>
                            <div className='icons d-flex'>
                                <div ><Edit project={project} /></div>
                                <div className='btn'><a href={project?.github} target='_blank'><i className='fa-brands fa-github'></i></a></div>
                                <button className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='fw-bolder text-warning'>No projects uploaded yet</div>
                )}
            </div>
        </div>
    );
}

export default View;
