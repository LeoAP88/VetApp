import { useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { AuthContext } from "../firebaseConfig/AuthProvider"
import "./NuevaEntrada.css"

const NuevaEntrada = () => {
    const fechaActual = new Date().toLocaleString();

    const [Consulta, setConsulta] = useState("")

    const User = useContext(AuthContext);

    const uid = User.currentUser?.uid;
    const { idUsuario, id } = useParams();

    const navigate = useNavigate()

    const historiasCollection = collection(db, `/Clientes/${idUsuario}/Mascotas/${id}/HistoriaClinica`)

    const agregarEntrada = async (e) => {
        e.preventDefault()
        await addDoc(historiasCollection, {
            Fecha: fechaActual,
            Consulta: Consulta
        })
        navigate(`/historiaClinica/${idUsuario}/${id}`)
    }

    return (
        <>
        <div className="container_nuevaEntrada">
            <h1 className="titulo_consulta">Nueva consulta</h1>
            <div className="container_consulta">
                <span>{fechaActual}</span>
                <textarea className="texto_consulta" name="" id="" cols="30" rows="10" onChange={(e) => setConsulta(e.target.value)}></textarea>
                <button className="volver" onClick={agregarEntrada}>Guardar</button>
            </div>
            <Link to={`/historiaClinica/${idUsuario}/${id}`}>
                <button className="volver">Volver</button>
            </Link>
        </div>
        </>
    )
}
export default NuevaEntrada;