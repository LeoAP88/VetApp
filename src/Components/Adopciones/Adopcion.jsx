import { useParams } from "react-router-dom";
import{useState,useEffect} from "react";
import{collection,getDoc, doc} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import {Link} from "react-router-dom";
import "./Adopcion.css"
import {
    FadeLoader
} from 'react-spinners'

const Adopcion = () =>{
    const [loading, setLoading] = useState(true);
    const [adopcion,setAdopcion] = useState([]);
    const { id } = useParams();
    const adopcionesCollection = collection(db, `/Adopciones`)

    useEffect(() => {
        setLoading(true)
        async function getAdopcion() {
            const querySnapshot = await getDoc(doc(db,"Adopciones", id));
            if (querySnapshot.exists()) {
                setAdopcion(querySnapshot.data());
              } else {
                console.log("No se encontró el documento.");
              }
            setLoading(false)
            }
            getAdopcion()
    },[]);
    
    if(loading){
        return (
            <div className='loader_container'>
                <FadeLoader />
            </div>)
    }

    return(
        <div className="tarjeta" key={adopcion.id}>
                <div className="titulo">{adopcion.Nombre}</div>
                <div className="cuerpo">
                    <div>
                        <img src={`${adopcion.Foto}`} alt=""></img>
                    </div>
                    <p>{adopcion.Especie}</p>
                    <p>{adopcion.Raza}</p>
                    <p>{adopcion.Color}</p>
                    <p>{adopcion.Sexo}</p>
                    <p>{adopcion.Edad}</p>
                    <p>{adopcion.Caracteristicas}</p>
                </div>
                <div className="pie">
                    <Link to={"/formulario"}>
                        <div>
                            <button type="button" className="volver">Formulario de Adopción</button>
                        </div>
                    </Link>
                    <Link to={"/adopciones"}>
                        <button className="volver">Volver</button>
                    </Link>
                </div>
            </div>
    )
}
export default Adopcion