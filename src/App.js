import { BrowserRouter } from "react-router-dom"

import { Router } from "react-router";
import { Route, Routes } from 'react-router'
import { ButtonStyle, Container, NavStyle } from './styles';
import moment from 'moment';
import Home from "./pages/home";
import { useState } from "react";

const getMinuteDifference = (start, end)=> parseInt(Math.abs(end.getTime() - start.getTime()) / (1000) % 60)



const App = () => {

const isDark = useState(true)
const [ isDarkMode, setDarkMode ] = isDark

const initialDate = moment()


return <BrowserRouter>
  {/* <Nav/> */}
  <Container isDark={isDarkMode}>
      <Home elapsed={initialDate} isDark={isDark} />
  </Container>
</BrowserRouter>
}





export default App;