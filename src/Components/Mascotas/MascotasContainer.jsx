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

    const getMascotas = async () => {
        const querySnapshot = await getDocs(collection(db, `/Clientes/${id}/Mascotas`));
        if (querySnapshot.size !== 0) {
            console.log(querySnapshot.docs.map(doc => doc.data()))
            setMascotas(querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } }));
        }
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
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
            <div><LogInLinks isUserLoggedIn={isUserLoggedIn}></LogInLinks></div>
            <Mascota mascotas={mascotas} idUsuario={id} getMascotas={getMascotas}/>
        </>
    )
}

export default MisMascotas