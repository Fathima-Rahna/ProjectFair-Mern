import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import ProfileImg from '../assets/web.png'
import { SERVER_URL } from '../services/serverUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserAPI } from '../services/allAPI';


function Profile() {
  const [preview, setPreview] = useState("")
  const [existingImg, setExistingImg] = useState("")
  const [userDetails, setUserDetails] = useState({
    username: "", email: "", password: "", github: "", linkedin: "", ProfileImage: ""
  })
  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (sessionStorage.getItem("exstingUser")) {
      const existingUserDetails = JSON.parse(sessionStorage.getItem("exstingUser"))
      setUserDetails({
        ...userDetails, username: existingUserDetails.username, email: existingUserDetails.email, password: existingUserDetails.password, github: existingUserDetails.github,
        linkedin: existingUserDetails.linkedin
      })
      setExistingImg(existingUserDetails.Profile)
    }
  }, [open])


  useEffect(() => {
    if (userDetails.ProfileImage) {
      setPreview(URL.createObjectURL(userDetails.ProfileImage))
    } else {
      setPreview("")
    }
  }, [userDetails.ProfileImage])


  const handleUserProfile = async () => {
    const { username, email, password, github, linkedin, ProfileImage } = userDetails
    if (!github || !linkedin) {
      toast.warning("please fill the form completely")
    } else {
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profileImage", ProfileImage) : reqBody.append("profileImage", existingImg)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "content-Type": preview?"multipart/form-data" : "application/json",
          "Authorization": `Baerer ${token}`
        }

        //api call
        try {
          const result = await updateUserAPI(reqBody, reqHeader)
          if (result.status == 200) {
            setOpen(!open)
            sessionStorage.setItem("exstingUser", JSON.stringify(result.data))
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  return (
    <><div className="d-flex justify-content-center">

      <h3 className='text-warning'>User Profile</h3>
      <button onClick={() => setOpen(!open)} className='btn'><i className="fa-solid fa-chevron-down"></i></button>
    </div>
      <Collapse in={open}>
        <div className='row jusify-content-center mt-3 shadow' id="example-collapse-text">
          <label className='text-center'>
            <input onChange={e => setUserDetails({ ...userDetails, ProfileImage: e.target.files[0] })} type='file' style={{ display: 'none' }} />
            {
              existingImg == "" ?
                <img width={'200px'} height={'200px'} className='rounded-circle' src={preview ? preview : ProfileImg} alt='' />
                :
                <img width={'200px'} height={'200px'} className='rounded-circle'
                  src={preview ? preview : `${SERVER_URL}/uploads/${existingImg}`} alt="" />
            }

          </label>
          <div className="mb-2">
            <input value={userDetails.github} onChange={e => setUserDetails({ ...userDetails, github: e.target.value })} type='text' className='form-control' placeholder='Github URl' />
          </div>
          <div className="mb-2">
            <input value={userDetails.linkedin} onChange={e => setUserDetails({ ...userDetails, linkedin: e.target.value })} type='text' className='form-control' placeholder='Linkedin URl' />
          </div>
          <div className="d-grid mb-2">
            <button onClick={handleUserProfile} className='btn btn-warning'> Update Profile</button>
          </div>
        </div>
       
      </Collapse>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Profile