import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { db } from "../firebaseConfig/firebase"
import { collection, getDocs } from "firebase/firestore";
import { Mascota } from "./MascotasListado";
import {Link, useParams} from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
    FadeLoader
} from 'react-spinners'

const HistoriaClinica = () => {
    const [loading, setLoading] = useState(true);
    const [historiaClinica, setHistoriaClinica] = useState([""]);
    const User = useContext(AuthContext);
    const uid = User.currentUser?.uid;
    const auth = getAuth()
    const { idUsuario , id } = useParams();

    
    useEffect(() => {
        setLoading(true);
        async function getHistoriaClinica() {
            const querySnapshot = await getDocs(collection(db, `/Clientes/${idUsuario}/Mascotas/${id}/HistoriaClinica`));
            if (querySnapshot.size !== 0) {
                console.log(querySnapshot.docs.map(doc => doc.data()))
                setHistoriaClinica(querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } }));
            } else {
                console.log("No se encontró el documento.");
            }
            setLoading(false);
            }
            if (User.currentUser !== null) {
                getHistoriaClinica();
            }
    },[]);

    if(loading){
        return (
            <div className='loader_container'>
               <FadeLoader />
            </div>)
    }
    

    return(
        <>
         <div>Historia Clinica</div>
            <div>
                {historiaClinica.length > 0 ? (
                    historiaClinica.map((historia) => (
                        <div key={historia.id}>
                            <div>
                                <span className="Titulo_Campo">Fecha</span>
                                <p className='Datos_Campo'>{historia.Fecha}</p>
                            </div>
                            <div>
                                <span className="Titulo_Campo">Consulta:</span>
                                <p className='Datos_Campo'>{historia.Consulta}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay datos disponibles.</p>
                )}
            </div>
            <div>
                <Link to={`/nuevaEntrada/${idUsuario}/${id}`}>
                    <button>Nueva Entrada</button>
                </Link>
            </div>
        
        </>
    )
}

export default HistoriaClinica;