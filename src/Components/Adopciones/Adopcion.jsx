import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { collection, getDoc, doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2"
import whitReactContent from "sweetalert2-react-content"
import { db } from "../firebaseConfig/firebase";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../firebaseConfig/AuthProvider"
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
                <Link to={`/editar/${id}`} className="boton_editar btn btn-primary">
                    <i className="fa-solid fa-pencil"></i>
                </Link>
                <button onClick={() => { confirmDelete(id) }} className="boton_borrar btn btn-danger">
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
        <div id="container_adopcion">
            <div className="tarjeta_adopcion" key={adopcion.id}>
                <div className="tarjeta_adopcion_titulo">{adopcion.Nombre}</div>
                <div className="tarjeta_adopcion_cuerpo">
                    <div>
                        <img src={`${adopcion.Foto}`} alt=""></img>
                    </div>
                    <div className="tarjeta_adopcion_grupotags">
                    <div className="tarjeta_adopcion_tag tag_violeta"><p>{adopcion.Especie}</p></div>
                    <div className="tarjeta_adopcion_tag tag_rojo"><p>{adopcion.Raza}</p></div>
                    <div className="tarjeta_adopcion_tag"><p>{adopcion.Color}</p></div>
                    <div className="tarjeta_adopcion_tag tag_verde"><p>{adopcion.Sexo}</p></div>
                    <div className="tarjeta_adopcion_tag tag_azul"><p>{adopcion.Edad}</p></div>
                    </div>
                    <p>{adopcion.Caracteristicas}</p>
                </div>
                <div className="tarjeta_adopcion_bot">
                    <LogInLinks isUserLoggedIn={isUserLoggedIn} id={id}></LogInLinks>
                </div>
                <div className="tarjeta_adopcion_pie">
                    <Link to={"/formulario"}>
                        <div>
                            <button type="button" className="botones_seccion_adopcion">¡Quiero adoptar!</button>
                        </div>
                    </Link>
                </div>
            </div>
            <Link to={"/adopciones"}>
                <button className="botones_seccion_adopcion">Volver</button>
            </Link>
        </div>
    )
}
export default Adopcion