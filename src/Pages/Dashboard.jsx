import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import View from '../Components/View'
import Profile from '../Components/Profile'


function Dashboard() {
  const [displayName,setDisplayName]=useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("exstingUser")){
      const {username} = JSON.parse(sessionStorage.getItem("exstingUser"))
      setDisplayName(username)
    }else{
      setDisplayName("")
    }
  },[])
  return (
    <>
    <Header   insideDashBoard={true}/>
   <div style={{marginTop:'100px'}} className='container-fluid'>
 <h1>Welcome <span className='text-warning'>{displayName?.split(" ")[0]}</span>,</h1>
 <div className="row mt-3 m-5">
  <div className="col-lg-8">
    <View/>
  </div>
  <div className="col-lg-4">
    <Profile />
  </div>
 </div>
   </div>
    </>
  )
}

export default Dashboard