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

//convierte la fecha desde un objeto Date al formato tradicional "dd/mm/aaaa"
const parsearFecha = date => `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

// Componente que se renderiza si el usuario es admin, con los controles de edicion y borrado
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

    //La base utiliza el formato ISO de Date para las fechas, y el formato "hh:mm" para la hora.
    const fechaActual = new Date();
    const fechaActualParsed = fechaActual.toISOString();
    
    const User = useContext(AuthContext);
    const currentUser = User.currentUser;
    const isAdmin = currentUser?.email === 'admin@gmail.com'
    
    const turnosCollection = collection(db, "Turnos")

    const [turnos, setTurnos] = useState([])

    const getTurnos = async () => {
        // si es admin, trae TODOS los turnos. Si no, solo los del usuario
        if(isAdmin){

            //query utilizando como limite inferior la fecha actual, de esta manera trae solo los turnos futuros
            const q = query(turnosCollection, where("Fecha",">=",fechaActualParsed))
            
            const data = await getDocs(q);
            if(data.docs.length!==0){
            setTurnos(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            }
            setLoading(false);
        }else if(currentUser!==null){
            //igual que arriba, pero se le añade otra condicion para que matchee el cliente logeado con sus turnos
            const q = query(turnosCollection, where("ClienteID", "==", currentUser.uid), where("Fecha",">=",fechaActualParsed));
            const data = await getDocs(q);
            if(data.docs.length!==0){
            setTurnos(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            }
            setLoading(false);
        }

    }

    useEffect(()=>{
        getTurnos();
    }
    ,[currentUser]);

    if (loading) {
        return (
            <div className='loader_container'>
                <FadeLoader />
            </div>)
    }

    //renderizado condicional para el caso de que no existan turnos
    if(!loading && turnos.length===0){
        return(
            <div className="container">
            <h1>Turnos</h1>
            <h3>No se registran turnos.</h3>
            <button className="boton">Agendar Turno</button>
            </div>
        );
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
                            const horaTurno = turno.Hora;
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
            <Link to={"/agendarTurno"}>
            <button className="boton">Agendar Turno</button>
            </Link>
        </div>
    )
}
export default Turnos