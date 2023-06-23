import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where, updateDoc, getDoc, doc, setDoc} from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import Calendario from "./Calendario";
import {FadeLoader} from 'react-spinners';
import { AuthContext } from "../AuthProvider"


/*
    Estructura de la base de turnos
    
Turnos  (col)-
             "ISOString fechadeturno"  (doc)-
                                            | - TurnosDelDia (col)- 
                                            |                      |- 08:00(doc): ClienteID(string), ClienteNombre(string)
                                            |                      |- 08:30(doc)
                                            |                      |- 10:30(doc)
                                            |                          ...
                                            |                                
                                             -   diaocupado(bool)

*/

const SelecccionarHora = ({horasDisponibles, className, horaSelec, setHoraSelec}) => {
    
    const changeHora = (e) => {
        setHoraSelec(e.target.value);
    }
    console.log(horaSelec)
    return(<select className={className} onChange={changeHora} value={horaSelec}>
        {horasDisponibles.map(
            (hora) => {
                return(
                    <option key={hora} value={hora}>{hora}</option>
                );
            }
        )}
    </select>);
}

const AgendarTurno = ()=> {
    const User = useContext(AuthContext);
    const currentUser = User.currentUser;

    const [loading,setLoading] = useState(true);

    const fechaActual = new Date();
    const fechaActualParsed = fechaActual.toISOString();


    const [turnos, setTurnos] = useState([]);
    const [cliente, setCliente] = useState({});
    const [horasOcupadas,setHorasOcupadas] = useState([]);

    const [diaActivo,setDiaActivo] = useState(fechaActual);
    const [horaSelec,setHoraSelec] = useState("08:00");

    const horasDisponiblesParaTurno = (horasOcupadas) => {
        console.log(horasOcupadas)
        //array con total de turnos para seleccionar
        const horasTotales = [  "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30",
                                "13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30",
                                "18:00","18:30"               
                            ];
        const conjuntoHorasOcupadas = new Set(horasOcupadas); // creamos conjunto con Set
        
        //conseguimos las horas disponibles para seleccionar, segun los turnos ocupados
        const horasDisponibles = horasTotales.filter(hora => !conjuntoHorasOcupadas.has(hora)); //filtramos el array segun los elementos que NO estan en el conjunto
        
        return horasDisponibles;
    }
    

    const getTurnos = async () => {    
        
        //buscamos los turnos a partir del dia de la fecha (usamos __name__ como parametro de query porque la fecha esta en el id del doc)
        const q = query(collection(db,"Turnos"), where('__name__',">=",fechaActualParsed))
        
        const data = await getDocs(q);
        if(data.docs.length!==0){
            
            //guardamos los turnos como pares key:value en un objeto de la siguiente estructura:
            //{
            // "ISOString fecha"(key) : OCUPADO/DISP (value)    
            //}
            //de esta manera facilmente tenemos los dias con turnos y si estan completos o no
            let turnos = {}
            data.docs.forEach(
                doc => {turnos[doc.id] = doc.data().diaOcupado?"OCUPADO":"DISP"}
            );

            setTurnos(
                turnos
            );
        }
        

    }

    //funcion para actualizar el estado de horasOcupadas para el diaActivo
    const getHorasReservadas = async (dia) => {
        const diaTurno = dia.toISOString();

        console.log(diaTurno)

        const turnosDelDia = await getDocs(collection(db,`Turnos/${diaTurno}/TurnosDelDia`));
        if(!turnosDelDia.empty){
            setHorasOcupadas(
                turnosDelDia.docs.map(
                    doc=>doc.id
                    )
            );
        }else{
            setHorasOcupadas([]);
            console.log("No se encontraron horas agendadas en la fecha seleccionada")
        }
    }

    //handler para la seleccion de dia
    const cambiarDiaActivo = async (nuevoDia) => {
        setDiaActivo(nuevoDia);
        await getHorasReservadas(nuevoDia);
    }

    //getter para el cliente logueado
    const getCliente = async()=>{
        if(currentUser!==null){
        const data = await getDoc(doc(db, "/Clientes", currentUser.uid));
        if(data?.exists()){
            setCliente({...data.data(), id: data.id})
        }else{
            console.log("No se encontro el cliente")
        }}
    }

    //inicializacion del componente
    const setUP = async()=>{
        //trae los turnos e inicializa el estado
        await getTurnos();
        //trae el cliente logueado
        await getCliente();
        //trae las horas reservadas para el dia activo, que inicialmente es el dia de la fecha
        await getHorasReservadas(diaActivo);
        setLoading(false);
    }

    useEffect(
        ()=>{
            setUP();
        } 
    ,[currentUser]);

    useEffect(()=>{
        setHoraSelec(horasDisponiblesParaTurno(horasOcupadas)[0]);
    },[horasOcupadas]); 

    //handler para la carga de turnos
    const cargarTurno = async ()=> {
        //fecha del turno
        console.log(horaSelec)
        const diaTurno = diaActivo.toISOString();
        
        //en el state turnos tenemos todas las fechas con turnos reservados, checkeamos existencia del doc aprovechando eso
        if(turnos[diaTurno] !== undefined){
            if(turnos[diaTurno] === "OCUPADO"){
                console.error("Error: no se puede cargar turno, dia ocupado")
                return;
            }
            
            //checkeo de dia lleno: 
            //ya que las horas son unicas debido a la funcionalidad de carga, 
            //y que la totalidad de turnos para un mismo dia son 21 turnos, una vez llegado a los 21 turnos
            //en una misma fecha, se cambia diaOcupado a true en el doc.
            if(horasDisponiblesParaTurno(horasOcupadas).length===0){
                const turnoRef = doc(db, "Turnos", diaTurno);
                await updateDoc(turnoRef, {
                    diaOcupado: true
                    }).catch(
                        error => {
                            console.log('Algo fallo al agregar el nuevo turno - update dia ocupado ', error);
                            return;
                        });
            }
                      
        }else{
            //si no habian turnos reservados para la fecha, creamos el doc

            await setDoc(doc(db, "Turnos", `${diaTurno}`), {
                diaOcupado: false
            }).catch(error => {
                console.log('Algo fallo al agregar el nuevo turno - creacion de doc dia', error);
                return;
            });

        }

        //subimos el turno
        const docRef = doc(db, `Turnos/${diaTurno}/TurnosDelDia`, `${horaSelec}`);
        
        await setDoc(docRef, {
            ClienteNombre: `${cliente.Nombre} ${cliente.Apellido}`,
            ClienteID: currentUser.uid
        }).then(
            () => {
                alert("success!");
                getHorasReservadas(diaActivo);
            }
          ).catch(error => {
            console.log('Algo fallo al agregar el nuevo turno - setdoc hora', error);
            return;
        });

    }
    

    //función para determinar si el día está inhabilitado, falta testear y mejorar
    const arrayDiasOcupados = ()=> {
        let diasInh = [];
        for (let [fechaTurno, estaOcupado] of Object.entries(turnos)){
            
            if(estaOcupado === "OCUPADO"){
                diasInh.push(fechaTurno);
            }
        }
        
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
        <Calendario diasInhabilitados={arrayDiasOcupados()} diaActivo={diaActivo} toggleDia={cambiarDiaActivo}></Calendario>
        </div>
        <div className="mt-2 mb-2">
        <SelecccionarHora horaSelec={horaSelec} setHoraSelec={setHoraSelec} horasDisponibles={horasDisponiblesParaTurno(horasOcupadas)} className="form-control"/>
        </div>
        <button onClick={cargarTurno}>Agendar Turno</button>
        </div>

    );
}

export default AgendarTurno;