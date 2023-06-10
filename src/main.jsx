import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./Components/AuthProvider.jsx";
import App from './App.jsx'
import './index.css'
import Inicio from './Components/Publico/Inicio.jsx';
import Login from './Components/ManejoUsuarios/Login.jsx';
import Registro from './Components/ManejoUsuarios/Registro.jsx';
import QuienesSomos from './Components/Publico/QuienesSomos.jsx';
import MisMascotas from './Components/Mascotas/MascotasContainer.jsx';
import Tienda from './Components/Publico/Tienda.jsx';
import Adopciones from './Components/Adopciones/Adopciones.jsx';
import Turnos from './Components/Turnos/Turnos.jsx';
import Consultas from './Components/Publico/Consultas.jsx';
import FormularioDeAdopciones from './Components/Adopciones/FormularioDeAdopciones.jsx';
import Perfil from './Components/Perfil.jsx';
import SignOut from './Components/ManejoUsuarios/SignOut.jsx';
import Crear from './Components/Mascotas/AgregarMascota.jsx';
import Clientes from './Components/Clientes.jsx';
import AgregarAdopcion from './Components/Adopciones/AgregarAdopcion.jsx';
import Adopcion from './Components/Adopciones/Adopcion.jsx';


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
        path: "misMascotas/:id",
        element: <MisMascotas />
      },
      {
        path: "perfil/:id",
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
        path: "adopcion/:id",
        element: <Adopcion />
      },
      {
        path: "turnos",
        element: <Turnos />
      },
      {
        path: "crear/:id",
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
