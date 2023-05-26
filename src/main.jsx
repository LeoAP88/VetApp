import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Inicio from './Components/Inicio.jsx';
import Login from './Components/Login.jsx';
import Registro from './Components/Registro.jsx';
import QuienesSomos from './Components/QuienesSomos.jsx';
import MisMascotas from './Components/MisMascotas.jsx';
import Tienda from './Components/Tienda.jsx';
import Adopciones from './Components/Adopciones.jsx';
import Turnos from './Components/Turnos.jsx';
import Consultas from './Components/Consultas.jsx';


//creamos el router que determina las rutas y que elementos renderizan
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    //con children definimos rutas hijo que se renderizaran dentro de las rutas padre.
    children:[
      {
        index:true, // la prop index indica que la ruta se renderiza por default con la url padre ("/")
        element: <Inicio/>
      },
      {
        path: "consultas",
        element: <Consultas/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path:"register",
        element: <Registro/>
      },
      {
        path: "quienesSomos",
        element: <QuienesSomos/>
      },
      {
        path: "misMascotas",
        element: <MisMascotas/>
      },
      {
        path: "tienda",
        element: <Tienda/>
      },
      {
        path: "adopciones",
        element: <Adopciones/>
      },
      {
        path: "turnos",
        element: <Turnos/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
// el elemento RouterProvider utiliza el router para renderizar nuestras rutas.
  
    <RouterProvider router={router}></RouterProvider>
  ,
)
