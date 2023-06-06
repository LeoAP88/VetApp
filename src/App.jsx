import { useContext, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'

function App() {

  const [isUserLoggedIn,setLoggedIn] = useState(false);

  const outletContext = {
    onSuccessfulLogin: () => {
      console.log('bieeeeeeeeen')
      setLoggedIn(true);
      },
    onSuccessfulLogout: () => {
        setLoggedIn(false);
    } 
  }

  return (
    //El componente Outlet le dice a react router en donde se renderizan las rutas hijo.
    <div id="app">
      <NavBar isUserLoggedIn={isUserLoggedIn}/>
      <Outlet context={[outletContext]}/>
      <Footer/>
    </div>
  )
}

export default App
