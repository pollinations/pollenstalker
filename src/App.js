import IPFSTemp from './IpfsTemp'
import { Suspense, useEffect } from 'react'
import { BrowserRouter } from "react-router-dom"

import { Router } from "react-router";
import { Route, Routes } from 'react-router'
import { ButtonStyle, Container, NavStyle } from './styles';
import moment from 'moment';

const getMinuteDifference = (start, end)=> parseInt(Math.abs(end.getTime() - start.getTime()) / (1000) % 60)



const App = () => {

const initialDate = moment()


return <BrowserRouter>
  {/* <Nav/> */}
  <Container>
    <Suspense fallback={<div style={{width: '100vw', height: '100vh', backgroundColor: 'red'}}> Loading </div>}>
      <IPFSTemp elapsed={initialDate}/>
    </Suspense>
  </Container>
</BrowserRouter>
}
const Nav = props => {
  
  return <NavStyle>
    <h2 children='Unreal News Network'/>
    <MenuButton>
      Menu
    </MenuButton>
  </NavStyle>
}

const MenuButton = ({ children }) => {
  function handleClick(e){
    e.preventDefault()
    console.log('click')
  }
  return <ButtonStyle onClick={handleClick}>
      {children}
  </ButtonStyle>
}


export default App;