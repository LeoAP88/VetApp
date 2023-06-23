import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, updateDoc, doc, getDocs, setDoc, deleteDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase"

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

const horasDisponibles = [  "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30",
"13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30",
"18:00","18:30"               
];
//funciones para converir fecha tradicional (input) a ISOString (formato utilizado en la base) y viceversa.
const deISOStringAFechaInput = ISOString => {
    const date = new Date(ISOString);
    const mes = (date.getMonth()+1).toString();
    return `${date.getFullYear()}-${mes.length<2?"0"+mes:mes}-${date.getDate()}`;
}
const deFechaInputAISOString = fechaInput => {
    const date = new Date(fechaInput+"T00:00:00.000-03:00");
    return date.toISOString();
}

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

const EditarTurno = () => {
    const [fecha, setFecha] = useState("")
    const [hora, setHora] = useState("")
    const [clienteID, setClienteID] = useState("")
    const [clienteNombre, setClienteNombre] = useState("")

    const { fechaTurno, horaTurno } = useParams();

    const navigate = useNavigate();

    const deleteTurno = async ()=>{

        const fechaDocRef = doc(db, `/Turnos/${fechaTurno}`);
        const fechaDoc = await getDoc(fechaDocRef);

        const coleccionHorasTurno = collection(db,`/Turnos/${fechaTurno}/TurnosDelDia`);

        const horaDocRef = doc(db, `/Turnos/${fechaTurno}/TurnosDelDia/${horaTurno}`);

        await deleteDoc(horaDocRef);
        
        const horas = await getDocs(coleccionHorasTurno);
        if(horas.empty){
            await deleteDoc(fechaDocRef);
        }else if(fechaDoc.data().diaOcupado){
             await updateDoc(fechaDocRef,{diaOcupado:false});
        }

    }

    const initNuevaFechaDocRef = async () => {
        const nuevaFechaDocRef = doc(db,`/Turnos/${fecha}`);
        const nuevaFechaDoc = await getDoc(nuevaFechaDocRef);
        if(!nuevaFechaDoc.exists()){
            await setDoc(nuevaFechaDocRef,{diaOcupado: false});
        }
        return nuevaFechaDocRef;
    }

    const update = async (e) => {
        e.preventDefault();

        if((await getDoc(nuevaFechaDocRef)).data().diaOcupado && (fecha!==fechaTurno)){
            console.error("Error! Dia completo!")
            return;
        }

        await deleteTurno();

        const nuevaFechaDocRef = await initNuevaFechaDocRef();
        const nuevaHoraDocRef = doc(db,`Turnos/${fecha}/TurnosDelDia/${hora}`);
        const nuevaFechaTurnosCol = collection(db,`Turnos/${fecha}/TurnosDelDia`);
        
        await setDoc(nuevaHoraDocRef,{
            ClienteID: clienteID,
            ClienteNombre: clienteNombre
        });

        if((await getDocs(nuevaFechaTurnosCol)).size===22){
            await updateDoc(nuevaFechaDocRef, {
                diaOcupado: true
            });
        }
        
        navigate(`/turnos`);
      };
    
      const getTurno = async () => {
    
        const fechaDoc = await getDoc(doc(db, `/Turnos/${fechaTurno}`));
        const horaDoc = await getDoc(doc(db, `/Turnos/${fechaTurno}/TurnosDelDia/${horaTurno}`));
        if (fechaDoc.exists() && horaDoc.exists()) {
          
          setFecha(deISOStringAFechaInput(fechaDoc.id));
          setHora(horaDoc.id);
          setClienteID(horaDoc.data().ClienteID);
          setClienteNombre(horaDoc.data().ClienteNombre);
        } else {
          console.log("El archivo no existe");
        }
      }
    
      useEffect(() => {
        getTurno();
      }, []);



    return(
        <div className="container d-flex flex-column align-items-center mt-4">
            <h1>Editar Turno</h1>
            <form action="" method='POST'>
                <div className="form-group">
                    <label htmlFor="fecha">Fecha</label>
                    <input value={fecha} className="form-control" type="date" name="fecha" id="fecha" required onChange={(e) => setFecha(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="fecha">Hora</label>
                    <SelecccionarHora horaSelec={hora} setHoraSelec={setHora} horasDisponibles={horasDisponibles} className="form-control"/>
                </div>
                <div className="form-group">
                    
                    <label htmlFor="clienteNombre">Nombre Cliente</label>
                    <input value={clienteNombre} className="form-control" type="text" name="clienteNombre" id="clienteNombre" required onChange={(e) => setClienteNombre(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="clienteID">ID Cliente: {clienteID}</label>
                </div>
                <button className="btn" type="submit" onClick={update}>Guardar cambios</button>
                <Link to={`/turnos`}>
                    <button className="btn">Volver</button>
                </Link>
            </form>
        </div>
    )
}

export default EditarTurno;