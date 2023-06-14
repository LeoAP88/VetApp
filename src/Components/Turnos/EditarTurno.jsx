import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase"

const deMSAFechaInput = miliseg => {
    const date = new Date(miliseg);
    const mes = (date.getMonth()+1).toString();
    return `${date.getFullYear()}-${mes.length<2?"0"+mes:mes}-${date.getDate()}`;
}
const deFechaInputAMS = fechaInput => {
    const date = Date.parse(fechaInput+"T00:00:00.000-03:00");
    return date;
}
const deMinsAHoraInput = mins => {
    let h = Math.trunc(mins/60).toString();
    let m = (mins%60).toString();
    
    return `${h.length<2?"0"+h:h}:${m.length<2?"0"+m:m}`;
}
const deHoraInputAMins = horaInput => {
    const [horas,mins]= horaInput.split(":").map(n=>Number(n));
    return horas*60+mins;
}

const EditarTurno = () => {
    const [fecha, setFecha] = useState("")
    const [hora, setHora] = useState("Perro")
    const [clienteID, setClienteID] = useState("")
    const [clienteNombre, setClienteNombre] = useState("")

    const { idTurno } = useParams();

    const navigate = useNavigate();

    const update = async (e) => {
        e.preventDefault();
        
        const turnoDoc = doc(db, `/Turnos/${idTurno}`);
        const data = {
            Fecha: deFechaInputAMS(fecha),
            Hora: deHoraInputAMins(hora),
            ClienteID: clienteID,
            ClienteNombre: clienteNombre,
        };
        await updateDoc(turnoDoc, data);
        navigate(`/turnos`);
      };
    
      const getTurno = async () => {
    
        const turnoDoc = await getDoc(doc(db, `/Turnos/${idTurno}`));
        if (turnoDoc.exists()) {
          
          setFecha(deMSAFechaInput(turnoDoc.data().Fecha));
          setHora(deMinsAHoraInput(turnoDoc.data().Hora));
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