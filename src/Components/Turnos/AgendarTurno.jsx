import { useState, useEffect, useContext } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Calendario from "./Calendario";
import { AuthContext } from "../firebaseConfig/AuthProvider"
import {useNavigate, Link} from "react-router-dom";
import "./AgendarTurno.css"
import FechaDia from "./FechaDia";
import SelecccionarHora from "./SeleccionarHora";
import { horasDisponiblesParaTurno, getHorasReservadas } from "./utilidadesTurnos";

/*

    Estructura de la base de turnos
    
Turnos  (col)-
             "YYYY-MM-DD"  (doc)-
                                            | - TurnosDelDia (col)- 
                                            |                      |- 08:00(doc): ClienteID(string), ClienteNombre(string)
                                            |                      |- 08:30(doc)
                                            |                      |- 10:30(doc)
                                            |                          ...
                                            |                                
                                             -   diaocupado(bool)

*/



const AgendarTurno = ()=> {
    const User = useContext(AuthContext);
    const currentUser = User.currentUser;

    const navigate = useNavigate();

    const [loading,setLoading] = useState(true);

    const fechaActual = new FechaDia();


    const [turnos, setTurnos] = useState([]);
    const [cliente, setCliente] = useState({});
    const [horasOcupadas,setHorasOcupadas] = useState([]);

    const [diaActivo,setDiaActivo] = useState(fechaActual);
    const [horaSelec,setHoraSelec] = useState("08:00");
    

    const getTurnos = async () => {    
        
        //buscamos los turnos a partir del dia de la fecha (usamos __name__ como parametro de query porque la fecha esta en el id del doc)
        const q = query(collection(db,"Turnos"), where('__name__',">=",fechaActual.getFecha()))
        
        const data = await getDocs(q);
        
        if(data.docs.length!==0){
            
            //guardamos los turnos como pares key:value en un objeto de la siguiente estructura:
            //{
            // "string fecha"(key) : OCUPADO/DISP (value)    
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

    //handler para la seleccion de dia
    const cambiarDiaActivo = async (nuevoDia) => {
        setDiaActivo(nuevoDia);
        setHorasOcupadas(await getHorasReservadas(nuevoDia));
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
        setHorasOcupadas(await getHorasReservadas(diaActivo));
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
        
        const diaTurno = diaActivo.getFecha();
        
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
            if(horasDisponiblesParaTurno(horasOcupadas).length===1){
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
                navigate("/turnos");
            }
          ).catch(error => {
            console.log('Algo fallo al agregar el nuevo turno - setdoc hora', error);
            return;
        });

    }
    

    const arrayDiasOcupados = ()=> {
        let diasInh = [];
        for (let [fechaTurno, estaOcupado] of Object.entries(turnos)){
            
            if(estaOcupado === "OCUPADO"){
                diasInh.push(fechaTurno);
            }
        }
        
        return diasInh;
    }

  if (loading) {
    return (
        <div className="container_agendarTurno">
            <h1 className="titulo_agendar">¡Agenda tu turno!</h1>
            <div className="container_agendar">
                {/*Calendario recibe los dias sin turnos, el dia activo (seleccionado) y el handler para cambiar el dia activo*/}
                <Calendario diasInhabilitados={[]} diaActivo={diaActivo} toggleDia={cambiarDiaActivo}></Calendario>
            </div>
            <div className="mt-2 mb-2">
                <SelecccionarHora horaSelec={horaSelec} setHoraSelec={setHoraSelec} horasDisponibles={[]} className="form-control container_horario"/>
            </div>
            
            <button onClick={cargarTurno} className="boton_agendar btn btn-outline-success">Agendar Turno</button>
            
        </div>

    );
  }

  return (
    <div className="container_agendarTurno">
      <h1 className="titulo_agendar">¡Agenda tu turno!</h1>
      <div className="container_agendar">
        {/*Calendario recibe los dias sin turnos, el dia activo (seleccionado) y el handler para cambiar el dia activo*/}
        <Calendario
          diasInhabilitados={arrayDiasOcupados()}
          diaActivo={diaActivo}
          toggleDia={cambiarDiaActivo}
        ></Calendario>
        <SelecccionarHora
          horaSelec={horaSelec}
          setHoraSelec={setHoraSelec}
          horasDisponibles={horasDisponiblesParaTurno(horasOcupadas)}
          className="container_horario form-control"
        />
      </div>

        <button
          onClick={cargarTurno}
          className="volver btn btn-outline-success"
        >
          Agendar Turno
        </button>
        <Link to={"/turnos"}>
            <button className="volver btn">Volver</button>
        </Link>
    </div>
  );
};

export default AgendarTurno;
