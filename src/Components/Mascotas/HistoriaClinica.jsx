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
    const { id } = useParams();

    
    useEffect(() => {
        setLoading(true);
        async function getHistoriaClinica() {
            const querySnapshot = await getDocs(collection(db, `/Clientes/0Fi0FTD1UEej4Ovn3FjC/Mascotas/9cJ9lDS1Aw0eA5lAYobA/HistoriaClinica`));
            //hay que caputar los id del cliente y la mascota, por ahora deje estos solo para probar
            if (querySnapshot.size !== 0) {
                const historias = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        Fecha: data.Fecha.toDate(), // Convertir a objeto Date
                        Consulta: data.Consulta
                    };
                });
                setHistoriaClinica(historias);
                console.log(historias);
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
                                <p className='Datos_Campo'>{historia.Fecha.toString()}</p>
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
                <Link to={"/nuevaEntrada"}>
                    <button>Nueva Entrada</button>
                </Link>
            </div>
        
        </>
    )
}

export default HistoriaClinica;