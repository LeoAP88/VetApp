import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where, orderBy, addDoc, getDoc, doc} from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import Calendario from "./Calendario";
import {FadeLoader} from 'react-spinners';
import { AuthContext } from "../AuthProvider"

const AgendarTurno = ()=> {
    const User = useContext(AuthContext);
    const currentUser = User.currentUser;

    const [loading,setLoading] = useState(true);

    const fechaActual = new Date();
    const fechaActualParsed = fechaActual.toISOString();

    const turnosCollection = collection(db, "Turnos")

    const [turnos, setTurnos] = useState([])
    const [cliente, setCliente] = useState({})

    const [diaActivo,setDiaActivo] = useState(fechaActual);
    const [horaSelec,setHoraSelec] = useState("07:30");
    const [horaNoDisp,setHoraNoDisp] = useState(true);

    const getTurnos = async () => {    
        
        const q = query(turnosCollection, where("Fecha",">=",fechaActualParsed), orderBy("Fecha"))
            
        const data = await getDocs(q);
        if(data.docs.length!==0){
            setTurnos(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        }
        

    }

    const getCliente = async()=>{
        if(currentUser!==null){
        const data = await getDoc(doc(db, "/Clientes", currentUser.uid));
        if(data?.exists()){
            setCliente({...data.data(), id: data.id})
        }else{
            console.log("No se encontro el cliente")
        }}
    }

    const setUP = async()=>{
        await getTurnos();
        await getCliente();
        setLoading(false);
    }

    useEffect(
        ()=>{
            setUP();
        } 
    ,[currentUser]);

    const cargarTurno = async ()=> {
        const docRef = await addDoc(turnosCollection, {
            Fecha: diaActivo.toISOString(),
            Hora: horaSelec,
            ClienteID: currentUser.uid,
            ClienteNombre: `${cliente.Nombre} ${cliente.Apellido}`
          }).then(
            res => {alert("success!")}
          ).catch(error => {
            console.log('Algo fallo al agregar el nuevo turno ', error);
        });
    }

    const changeHora = (e) => {
        let horaInput = e.target.value
        setHoraSelec(horaInput);
    }

    //al cambiar cualquiera de las dependencias, checkea si la hora seleccionada está disponible.
    useEffect(
        ()=>{
            if(turnos.find( turno=>{
                return (turno.Fecha === diaActivo.toISOString()) && (turno.Hora === horaSelec)
            })){
                setHoraNoDisp(true);
            }else{
                setHoraNoDisp(false);
        }}
    ,[turnos,diaActivo,horaSelec]);

    
    //función para determinar si el día está inhabilitado, falta testear y mejorar
    const contarTurnos = ()=> {
        let count = 1;
        let diasInh = []
        let fechaAnt = turnos[0]?.Fecha;
        turnos.forEach((turno)=>{
            if(fechaAnt == turno.Fecha){
                count++;
            }else{
                count=1;
            }
            if(count == 25){
                diasInh.push(turno.Fecha);
            }
        }
        );
        return diasInh;
    }

    if(loading){
        return (
            <div className='loader_container'>
                <FadeLoader />
            </div>)
    }

    return (
        <div className="container">
        <div className="container">
        {/*Calendario recibe los dias sin turnos, el dia activo (seleccionado) y el handler para cambiar el dia activo*/}
        <Calendario diasInhabilitados={contarTurnos()} diaActivo={diaActivo} toggleDia={setDiaActivo} ></Calendario>
        </div>
        <div className="mt-2 mb-2">
        <input type="time" step="600" min="07:30" max="19:30" value={horaSelec} onChange={changeHora}/><span className={`${horaNoDisp?"d-inline":"d-none"}`}>Hora no disponible!</span>
        </div>
        <button onClick={cargarTurno} disabled={horaNoDisp}>Agendar Turno</button>
        </div>

    );
}

export default AgendarTurno;