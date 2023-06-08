import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./Components/AuthProvider.jsx";
import App from './App.jsx'
import './index.css'
import Inicio from './Components/Inicio.jsx';
import Login from './Components/Login.jsx';
import Registro from './Components/Registro.jsx';
import QuienesSomos from './Components/QuienesSomos.jsx';
import MisMascotas from './Components/MascotasContainer.jsx';
import Tienda from './Components/Tienda.jsx';
import Adopciones from './Components/Adopciones.jsx';
import Turnos from './Components/Turnos.jsx';
import Consultas from './Components/Consultas.jsx';
import FormularioDeAdopciones from './Components/FormularioDeAdopciones.jsx';
import Perfil from './Components/Perfil.jsx';
import SignOut from './Components/SignOut.jsx';
import Crear from './Components/AgregarMascota.jsx';
import Clientes from './Components/Clientes.jsx';
import AgregarAdopcion from './Components/AgregarAdopcion.jsx';


//creamos el router que determina las rutas y que elementos renderizan
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //con children definimos rutas hijo que se renderizaran dentro de las rutas padre.
    children: [
      {
        index: true, // la prop index indica que la ruta se renderiza por default con la url padre ("/")
        element: <Inicio />
      },
      {
        path: "consultas",
        element: <Consultas />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signOut",
        element: <SignOut />
      },
      {
        path: "register",
        element: <Registro />
      },
      {
        path: "quienesSomos",
        element: <QuienesSomos />
      },
      {
        path: "misMascotas",
        element: <MisMascotas />
      },
      {
        path: "perfil",
        element: <Perfil />
      },
      {
        path: "tienda",
        element: <Tienda />
      },
      {
        path: "adopciones",
        element: <Adopciones />
      },
      {
        path: "formulario",
        element: <FormularioDeAdopciones />
      },
      {
        path: "agregarAdopcion",
        element: <AgregarAdopcion />
      },
      {
        path: "turnos",
        element: <Turnos />
      },
      {
        path: "crear",
        element: <Crear />
      },
      {
        path: "clientes",
        element: <Clientes />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // el elemento RouterProvider utiliza el router para renderizar nuestras rutas.

  <AuthProvider><RouterProvider router={router}></RouterProvider> </AuthProvider>
)
