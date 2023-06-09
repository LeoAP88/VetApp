import {Link} from "react-router-dom";
import FormularioDeAdopciones from "./FormularioDeAdopciones"
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig/firebase";
import{useState,useEffect, useContext} from "react"
import { AuthContext } from "./AuthProvider";
import { getAuth } from "firebase/auth";
import "./Adopciones.css"


const LogInLinks = ({ isUserLoggedIn }) => {

    const auth = getAuth();
    const user = auth.currentUser;

   if (isUserLoggedIn && user.email == 'admin@gmail.com') {
        return (
            <>
                <Link to={"/agregarAdopcion"}>
                    <button id="boton-administrador">Agregar nueva Adopcion</button>
                </Link>
            </>
        );
    }
}

const Adopciones=() =>{
    const auth = getAuth();
    const User = useContext(AuthContext);
    let isUserLoggedIn = User.currentUser !== null;
    
    const [adopciones,setAdopciones] = useState([]);
    const adopcionesCollection = collection(db, `/Adopciones`)

    const getAdopciones = async() =>{
        const data = await getDocs(adopcionesCollection)
    /*  console.log(data.docs); */
      setAdopciones(
        data.docs.map((doc)=>({...doc.data(),id:doc.id}))
      )
    }


    useEffect(()=>{
        getAdopciones();
    },[])
   
    

    return(
        <>
        <div>Adopciones</div>

        {adopciones.map((adopcion)=>(
            <div className="tarjeta" key={adopcion.id}>
                <div className="titulo">{adopcion.Nombre}</div>
                <div className="cuerpo">
                    <img src="data:image/jpeg;base64,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" alt=""/>
                    <p>{adopcion.Caracteristicas}</p>
                </div>
                <div className="pie">
                    <Link to={`/adopcion/${adopcion.id}`}>Más información</Link>
                </div>
            </div> ))}

       
        <div className="botones">
            <Link to={"/formulario"}>
                <div>
                    <button type="button">Formulario de Adopción</button>
                </div>
            </Link>
            <div>
            <LogInLinks isUserLoggedIn={isUserLoggedIn}></LogInLinks>
            </div>
        </div>
        </>
    )
}
export default Adopciones;