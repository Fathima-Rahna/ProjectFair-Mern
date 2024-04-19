import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header({insideDashBoard}) {
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
            <button className='btn btn-link'>Logout<i className='fa-solid fa-arrow-right'></i></button>

          </div>

          }
        </Container>
      </Navbar>
    </>
  )
}

export default Header