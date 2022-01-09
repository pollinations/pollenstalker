import styled from '@emotion/styled'
import IPFSTemp from './IpfsTemp'
import { useEffect } from 'react'
import { BrowserRouter } from "react-router-dom"

import { Router } from "react-router";
import { Route, Routes } from 'react-router'

const Container = styled.div`
  min-width: 100vw;
  max-width: 1100px;

  min-height: 100vh;
  margin: 0;

  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  );
  grid-gap: 0.1em;
  grid-auto-flow: dense;

  color: black;
`


const App = () => {

return <BrowserRouter>
<Layout>
<IPFSTemp/>

  <p >2</p>

  
  <p >3</p>

  <p >3</p>
  <p >3</p>



  <p >2</p>
  <p >3</p>
  <p >3</p>
  <p >3</p>

  <p >3</p>
  <p >3</p>

</Layout>
</BrowserRouter>
}

// Grabs each children and place into a certain box
let Layout = ({ children }) => <Container>
  {children.map( children => <article class='article'>
    {children}
  </article>)}
    
</Container>


export default App;