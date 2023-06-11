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
import HistoriaClinica from "./HistoriaClinica";


const LogInLinks = ({ isUserLoggedIn }) => {

    const auth = getAuth();
    const user = auth.currentUser;
    const { id } = useParams();

   if (isUserLoggedIn && user.email == 'admin@gmail.com') {
        return (
            <>
                <Link to={`/crear/${id}`}>
                    <button id="boton-administrador">Agregar nueva mascota</button>
                </Link>
            </>
        );
    }
}

const MisMascotas = () => {
    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const User = useContext(AuthContext);
    const uid = User.currentUser?.uid;
    const auth = getAuth()
    const { id } = useParams();
    
    let isUserLoggedIn = User.currentUser !== null;


    useEffect(() => {
        setLoading(true)
        async function getMascotas() {
            const querySnapshot = await getDocs(collection(db, `/Clientes/${id}/Mascotas`));//le paso id, porque 
                                                                                            //si le pasara el uid 
                                                                                            //del administrador, 
                                                                                            //me va a llevar a 
                                                                                            //misMascotas del administrador
                                                                                            //(quien no tiene mascotas, 
                                                                                            //asi que va a decir que no 
                                                                                            //encontro mascotas asociadas 
                                                                                            //a ese usuario).Lo que yo quiero, 
                                                                                            //es que me lleve al misMascotas 
                                                                                            //del cliente, por eso capturo el 
                                                                                            //id del cliente que esta viajando por la url.
            if (querySnapshot.size !== 0) {
                console.log(querySnapshot.docs.map(doc => doc.data()))
                setMascotas(querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } }));
            }
            setLoading(false)
        }
        if (User.currentUser !== null) {
            getMascotas();
        }
    },
        [uid]);

    if(loading){
        return (
            <div className='loader_container'>
                <FadeLoader />
            </div>)
    }

    return (
        <>
            <Mascota mascotas={mascotas} idUsuario={id}/>
            <div><LogInLinks isUserLoggedIn={isUserLoggedIn}></LogInLinks></div>

        </>
    )
}

export default MisMascotas