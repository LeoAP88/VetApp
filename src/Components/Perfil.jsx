import { getAuth } from "firebase/auth";
import { useState, useEffect,useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { collection, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig/firebase";
import { AuthContext } from "./AuthProvider";

const Perfil = () => {
    const [Perfil, setPerfil] = useState("")
    const [Nombre, setNombre] = useState("")
    const [Email, setEmail] = useState("")
    const [Apellido, setApellido] = useState("")

    const User = useContext(AuthContext);
    const navigate = useNavigate()
    const { uid } = useParams();

    const getPerfil = async () => {
        const perfilDoc = await getDoc(doc(db, "Clientes", uid));
        if (perfilDoc.exists()) {
            setNombre(perfilDoc.data().Nombre);
            setApellido(perfilDoc.data().Apellido);
            setEmail(perfilDoc.data().Email);
        } else {
            console.log("No se encontró al usuario");
        }
    }

    useEffect(() => {
        getPerfil();
    }, []);

    return (
        <>
            <h1>Editar Perfil</h1>
            <div className="container_crearMascota">
                <form action="">
                    <div className="container_campo">
                        <label htmlFor="id">Id Cliente: {uid}</label>
                    </div>
                    <div className="container_campo campo_edit">
                        <label htmlFor="nombre">Nombre: {Nombre}</label>
                    </div>
                    <div className="container_campo campo_edit">
                        <label htmlFor="nombre">Apellido: {Apellido}</label>
                    </div>
                    <div className="container_campo">
                        <label value={Email} htmlFor="email">Email: {Email}</label>
                    </div>
                    <Link to={`/editarPerfil/${uid}`}>
                        <button className="volver">Editar</button>
                    </Link>
                    <Link to={`/`}>
                        <button className="volver">Volver</button>
                    </Link>
                </form>
            </div>
        </>
    )
}

export default Perfil;