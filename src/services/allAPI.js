//register api-called by component Auth

import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverUrl"

export  const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}



//login-api called by component auth
export  const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}


export  const addprojectAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

//get all projects

export const getAllProjectsAPI= async (searchkey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchkey}`,"",reqHeader)
}

//user projects

export const getUserProjectsAPI= async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,"",reqHeader)
}

//home projects

export const getHomeProjectsAPI= async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-projects`,"")
}

//edit project

export const editprojectAPI = async (projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-project/${projectId}`,reqBody,reqHeader)
}