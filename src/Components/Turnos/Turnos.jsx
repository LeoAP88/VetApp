import "./Turnos.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../AuthProvider"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useState, useEffect, useContext } from "react"
import { db } from "../firebaseConfig/firebase"
import Table from 'react-bootstrap/Table';
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import {FadeLoader} from 'react-spinners';


const mySwal = withReactContent(Swal)

const parsearFecha = date => `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

/*hora en formato n minutos (0 para 00:00, 1439 para 23:59)*/ 
const parsearHora = hora => {
    let h = Math.trunc(hora/60).toString();
    let min = (hora%60).toString();
    
    return `${h.length<2?"0"+h:h}:${min.length<2?"0"+min:min}`;
}

const ControlesAdmin = ({ id, getTurnos }) => {
    
    const User = useContext(AuthContext);
    const user = User.currentUser;


    const deleteTurno = async () => {
        const turnoDoc = doc(db, `/Turnos/${id}`)
        await deleteDoc(turnoDoc)
        getTurnos();
    }

    const confirmDelete = () => {
        Swal.fire({
            title: 'Estas Seguro/a?',
            text: "No podes revertir esta Accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Deseo Borrarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTurno()
                Swal.fire(
                    'Borrado!',
                    'La Entrada ha sido Borrada.',
                    'success'
                )
            }
        })
    }
        return (
            <>
                <Link to={`/editarTurno/${id}`} className="btn btn-primary">
                    <i className="fa-solid fa-pencil"></i>
                </Link>
                <button onClick={() => { confirmDelete() }} className="btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </>
        );
    }

const Turnos = () => {
    const [loading, setLoading] = useState(true);

    const fechaActual = new Date();
    const fechaActualms = fechaActual.getTime();
    
    const User = useContext(AuthContext);
    const currentUser = User.currentUser;
    const isAdmin = currentUser?.email === 'admin@gmail.com'
    
    const turnosCollection = collection(db, "Turnos")

    const [turnos, setTurnos] = useState([])

    const getTurnos = async () => {
        
        if(isAdmin){
            const q = query(turnosCollection, where("Fecha",">=",fechaActualms))
            
            const data = await getDocs(q);
            setTurnos(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            setLoading(false)
        }else if(currentUser!==null){
            const q = query(turnosCollection, where("ClienteID", "==", currentUser.id), where("Fecha",">=",fechaActualms));
            const data = await getDocs(q);
            setTurnos(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            setLoading(false)
        }

    }

    useEffect(()=>{
        getTurnos();
    }
    ,[isAdmin]);

    if (loading) {
        return (
            <div className='loader_container'>
                <FadeLoader />
            </div>)
    }

    return (
        <div className="container">
            <h1>Turnos</h1>
            <Table striped>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Horario</th>
                            <th>Cliente</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {turnos.map(
                            (turno)=>{
                            const fechaTurno = parsearFecha(new Date(turno.Fecha));
                            const horaTurno = parsearHora(turno.Hora);
                            return(
                                <tr key={turno.id}>
                                    <td>{fechaTurno}</td>
                                    <td>{horaTurno}</td>
                                    <td>{turno.ClienteNombre}</td>
                                    {isAdmin?(
                                    <td>
                                        <ControlesAdmin id={turno.id} getTurnos={getTurnos}></ControlesAdmin>
                                    </td>)
                                    :(<></>)
                                    }
                                </tr> 
                                );
                            }
                        )}
                    </tbody>
                </Table>
            
            <button className="boton">Agendar Turno</button>
        </div>
    )
}
export default Turnos