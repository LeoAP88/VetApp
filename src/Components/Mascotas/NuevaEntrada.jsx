import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { AuthContext } from "../AuthProvider";

const NuevaEntrada = () => {
    const fechaActual = new Date().toLocaleDateString();

    const[Consulta, setConsulta] = useState("")

    const User = useContext(AuthContext);

    const uid = User.currentUser?.uid;
    const { id } = useParams();

    const navigate = useNavigate()

    const historiasCollection = collection(db, `/Clientes/0Fi0FTD1UEej4Ovn3FjC/Mascotas/9cJ9lDS1Aw0eA5lAYobA/HistoriaClinica`)

    const agregarEntrada = async (e) => {
        e.preventDefault()
        await addDoc(historiasCollection, {
            Fecha: fechaActual,
            Consulta: Consulta
        })
        navigate(`/historiaClinica`)
    }

    return (
        <>
        <p>Nueva Entrada</p>
        <span>{fechaActual}</span>
        <textarea name="" id="" cols="30" rows="10" onChange={(e) => setConsulta(e.target.value)}></textarea>
        <button onClick={agregarEntrada}>Guardar</button>
        </>
    )
}
export default NuevaEntrada;