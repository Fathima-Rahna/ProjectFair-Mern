import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import ProfileImage from '../assets/web.png'


const Profile = () => {
    const [open,setOpen] = useState(false);
  return (
    <><div className="d-flex justify-content-center">

        <h3 className='text-warning'>User Profile</h3>
        <button onClick={()=>setOpen(!open)} className='btn'><i className="fa-solid fa-chevron-down"></i></button>
        </div>
        <Collapse in={open}>
        <div className='row jusify-content-center mt-3 shadow' id="example-collapse-text">
        <label className='text-center'>
          <input type='file' style={{display:'none'}}/>
          <img width={'200px'} height={'200px'} className='rounded-circle' src={ProfileImage} />
            
        </label>
        <div className="mb-2">
          <input type='text' className='form-control' placeholder='Github URl'/>
        </div>
        <div className="mb-2">
          <input type='text' className='form-control' placeholder='Linkedin URl'/>
        </div>
        <div className="d-grid mb-2">
          <button className='btn btn-warning'> Update Profile</button>
        </div>
        </div>
      </Collapse>
        </>
  )
}

export default Profile