import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { collection, getDoc, doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2"
import whitReactContent from "sweetalert2-react-content"
import { db } from "../firebaseConfig/firebase";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../AuthProvider";
import "./Adopcion.css"
import {
    FadeLoader
} from 'react-spinners'

const mySwal = whitReactContent(Swal)


const LogInLinks = ({ isUserLoggedIn, id }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate()

    const deleteAdopcion = async (id) => {
        const adopcionDoc = doc(db, "Adopciones", id)
        await deleteDoc(adopcionDoc)
        navigate("/adopciones")
    }

    const confirmDelete = (id) => {
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
                deleteAdopcion(id)
                Swal.fire(
                    'Borrado!',
                    'La adopción ha sido Borrada.',
                    'success'
                )
            }
        })
    }

    if (isUserLoggedIn && user.email == 'admin@gmail.com') {
        return (
            <>
                <Link to={`/editar/${id}`} className="btn btn-light">
                    <i className="fa-solid fa-pencil"></i>
                </Link>
                <button onClick={() => { confirmDelete(id) }} className="btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </>
        );
    }
}

const Adopcion = () => {
    const [loading, setLoading] = useState(true);
    const [adopcion, setAdopcion] = useState([]);
    const { id } = useParams();
    console.log("ID de useParams:", id);

    const auth = getAuth();
    const User = useContext(AuthContext);
    let isUserLoggedIn = User.currentUser !== null;

    const getAdopcion = async () => {
        const querySnapshot = await getDoc(doc(db, "Adopciones", id));
        if (querySnapshot.exists()) {
            setAdopcion(querySnapshot.data());
        } else {
            console.log("No se encontró el documento.");
        }
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getAdopcion()
    }, []);

    if (loading) {
        return (
            <div className='loader_container'>
                <FadeLoader />
            </div>)
    }

    return (
        <div className="container_adopcion">
            <div className="tarjeta" key={adopcion.id}>
                <div className="titulo">{adopcion.Nombre}</div>
                <div className="cuerpo">
                    <div>
                        <img src={`${adopcion.Foto}`} alt=""></img>
                    </div>
                    <p>{adopcion.Especie}</p>
                    <p>{adopcion.Raza}</p>
                    <p>{adopcion.Color}</p>
                    <p>{adopcion.Sexo}</p>
                    <p>{adopcion.Edad}</p>
                    <p>{adopcion.Caracteristicas}</p>
                </div>
                <div>
                    <LogInLinks isUserLoggedIn={isUserLoggedIn} id={id}></LogInLinks>
                </div>
                <div className="pieAdopcion">
                    <Link to={"/formulario"}>
                        <div>
                            <button type="button" className="volver">Formulario de Adopción</button>
                        </div>
                    </Link>
                    <Link to={"/adopciones"}>
                        <button className="volver">Volver</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Adopcion