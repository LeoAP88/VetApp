import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase"

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

    const { idTurno } = useParams();

    const navigate = useNavigate();

    const update = async (e) => {
        e.preventDefault();
        
        const turnoDoc = doc(db, `/Turnos/${idTurno}`);
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
    
        const turnoDoc = await getDoc(doc(db, `/Turnos/${idTurno}`));
        if (turnoDoc.exists()) {
          
          setFecha(deISOStringAFechaInput(turnoDoc.data().Fecha));
          setHora(turnoDoc.data().Hora);
          setClienteID(turnoDoc.data().ClienteID);
          setClienteNombre(turnoDoc.data().ClienteNombre);
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
                    <label htmlFor="clienteID">ID Cliente</label>
                    <input value={clienteID} className="form-control" type="text" name="clienteID" id="clienteID" required onChange={(e) => setClienteID(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="clienteNombre">Nombre Cliente</label>
                    <input value={clienteNombre} className="form-control" type="text" name="clienteNombre" id="clienteNombre" required onChange={(e) => setClienteNombre(e.target.value)}></input>
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