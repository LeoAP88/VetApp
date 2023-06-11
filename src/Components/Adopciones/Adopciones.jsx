import {Link} from "react-router-dom";
import FormularioDeAdopciones from "./FormularioDeAdopciones"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import{useState,useEffect, useContext} from "react"
import { AuthContext } from "../AuthProvider";
import { getAuth } from "firebase/auth";
import "./Adopciones.css"
import {
    FadeLoader
} from 'react-spinners'


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
    const [loading, setLoading] = useState(true);

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
      setLoading(false)
    }


    useEffect(()=>{
        setLoading(true)
        getAdopciones();
        
    },[])
   
    if(loading){
        return (
            <div className='loader_container'>
                <FadeLoader />
            </div>)
    }

    return(
        <>
        <div>Adopciones</div>

        {adopciones.map((adopcion)=>(
            <div className="tarjeta" key={adopcion.id}>
                <div className="titulo">{adopcion.Nombre}</div>
                <div className="cuerpo">
                    <div>
                        <img src={`${adopcion.Foto}`} alt=""></img>
                    </div>
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