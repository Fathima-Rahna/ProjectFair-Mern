import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../contexts/TokenAuth';

function Header({insideDashBoard}) {

const{isAuthorised,setIsAuthorised} =useContext(TokenAuthContext)
  const navigate = useNavigate()
const logout =()=>{
  sessionStorage.clear()
  setIsAuthorised(false)
  navigate('/')

}

  return (
    <>
       <Navbar className="bg-primary shadow">
        <Container>
          <Navbar.Brand href="#home">
          <i class="fa-brands fa-pagelines"></i>
           {' '}
            project Fair
          </Navbar.Brand>
          { insideDashBoard &&
          <div className='ms-auto'>
            <button onClick={logout} className='btn btn-link'>Logout<i className='fa-solid fa-arrow-right'></i></button>

          </div>

          }
        </Container>
      </Navbar>
    </>
  )
}

export default Header