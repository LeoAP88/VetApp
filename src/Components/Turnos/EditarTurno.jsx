import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, updateDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
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

const EditarTurno = () => {
    const [fecha, setFecha] = useState("")
    const [hora, setHora] = useState("")
    const [clienteID, setClienteID] = useState("")
    const [clienteNombre, setClienteNombre] = useState("")

    const { fechaTurno, horaTurno } = useParams();

    const navigate = useNavigate();

    const deleteTurno = async ()=>{
        if(fechaTurno!==fecha){
            const fechaDoc = await getDoc(doc(db, `/Turnos/${fechaTurno}`));
            const coleccionHorasTurno = collection(db,`/Turnos/${fechaTurno}/TurnosDelDia`);
            const horaDoc = await getDoc(doc(db, `/Turnos/${fechaTurno}/TurnosDelDia/${horaTurno}`));
            await deleteDoc(horaDoc);
            const horas = await getDocs(coleccionHorasTurno);
            if(horas.empty){
                const 
            }

        }
    }

    const update = async (e) => {
        e.preventDefault();
        
        await deleteTurno();

        const turnoDoc = doc(db, `/Turnos/${fechaTurno}/TurnosDelDia/${horaTurno}`);
        const data = {
            Fecha: deFechaInputAISOString(fecha),
            Hora: hora,
            ClienteID: clienteID,
            ClienteNombre: clienteNombre,
        };
        await updateDoc(turnoDoc, data);
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
                    <input value={hora} className="form-control" type="time" name="hora" id="hora" required onChange={(e) => setHora(e.target.value)}></input>
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