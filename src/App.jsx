import { useContext, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import './themes/dark.css'


function App() {
  const [theme,setTheme] = useState(true);

  const themeHandler = ()=>{
    setTheme(!theme);
  }

  return (
    //El componente Outlet le dice a react router en donde se renderizan las rutas hijo.
    <div id="app" className={theme?"dark":"light"}>
      <NavBar onThemeChange={themeHandler}/>
      <Outlet/>
      <Footer/>    
    </div>
  )
}

export default App
