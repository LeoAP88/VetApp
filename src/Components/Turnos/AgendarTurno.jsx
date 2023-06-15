import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import Calendario from "./Calendario";
import {FadeLoader} from 'react-spinners';
import HoraInput from "./HoraInput";

const AgendarTurno = ()=> {
    const [loading,setLoading] = useState(true);

    const fechaActual = new Date();
    const fechaActualms = fechaActual.getTime();

    const turnosCollection = collection(db, "Turnos")

    const [turnos, setTurnos] = useState([])

    const [diaActivo,setDiaActivo] = useState(fechaActual);
    const [horaSelec,setHoraSelec] = useState("")

    const getTurnos = async () => {    
        
        const q = query(turnosCollection, where("Fecha",">=",fechaActualms))
            
        const data = await getDocs(q);
        if(data.docs.length!==0){
            setTurnos(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        }
        setLoading(false);
        

    }

    useEffect(
        ()=>{
            getTurnos();
        } 
    ,[]);

    if(loading){
        return (
            <div className='loader_container'>
                <FadeLoader />
            </div>)
    }

    return (
        <div className="container">
        <div className="container">
        <Calendario diasInhabilitados={turnos.map(turno=>turno.Fecha)} diaActivo={diaActivo} toggleDia={setDiaActivo} ></Calendario>
        </div>
        <HoraInput horasInhabilitadas={[]} horaActiva={horaSelec} selecHora={setHoraSelec}/>
        </div>
    );
}

export default AgendarTurno;