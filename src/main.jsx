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
        path: "section",
        element: <h1>Section</h1>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path:"register",
        element: <Registro/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
// el elemento RouterProvider utiliza el router para renderizar nuestras rutas.
  
    <RouterProvider router={router}></RouterProvider>
  ,
)
