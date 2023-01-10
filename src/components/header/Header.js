import React from 'react'
import { AppBar, Toolbar, styled } from '@mui/material'
import { Link } from 'react-router-dom';

const Component = styled(AppBar)`
    background: #FFFFFF;
    color: #000;
`;

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
      padding: 20px;
      color: #000;
      text-decoration: none;
    }
`

function Header() {
  return (
    <Component>
      <Container>
        <Link to='/'>HOME</Link>
        <Link to='/api/about'>ABOUT</Link>
        <Link to='/api/contact'>CONTACT</Link>
        <Link to='/api/login'>LOGOUT</Link>
      </Container>
    </Component>
  )
}

export default Header
