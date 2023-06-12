import { Link } from "react-router-dom";
import Swal from "sweetalert2"
import whitReactContent from "sweetalert2-react-content"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../AuthProvider";
import { getAuth } from "firebase/auth";
import "./Adopciones.css"
import {
    FadeLoader
} from 'react-spinners'


const mySwal = whitReactContent(Swal)


const LogInLinks = ({ isUserLoggedIn, id, getAdopciones }) => {

    const auth = getAuth();
    const user = auth.currentUser;

    const deleteAdopcion = async (id) => {
        const adopcionDoc = doc(db, "Adopciones", id)
        await deleteDoc(adopcionDoc)
        getAdopciones()
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

const Adopciones = () => {
    const [loading, setLoading] = useState(true);
    const [adopciones, setAdopciones] = useState([]);

    const auth = getAuth();
    const User = useContext(AuthContext);
    let isUserLoggedIn = User.currentUser !== null;

    const isAdmin = User.currentUser && User.currentUser.email === 'admin@gmail.com';

    const adopcionesCollection = collection(db, `/Adopciones`)

    const getAdopciones = async () => {
        const data = await getDocs(adopcionesCollection)
        /*  console.log(data.docs); */
        setAdopciones(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        setLoading(false)
    }


    useEffect(() => {
        setLoading(true)
        getAdopciones();

    }, [])

    if (loading) {
        return (
            <div className='loader_container'>
                <FadeLoader />
            </div>)
    }

    return (
        <>
            <h1 className="titulo_pagina">Adopciones</h1>

            <div className="contenedor_adopciones">
                {adopciones.map((adopcion) => (
                    <div className="tarjeta" key={adopcion.id}>
                        <div className="titulo">{adopcion.Nombre}</div>
                        <div className="cuerpo">
                            <div>
                                <img src={`${adopcion.Foto}`} alt=""></img>
                            </div>
                        </div>
                        <div className="pie">
                            <Link to={`/adopcion/${adopcion.id}`}>Más información</Link>
                        </div>
                        <div>
                            <LogInLinks isUserLoggedIn={isUserLoggedIn} id={adopcion.id} getAdopciones={getAdopciones}></LogInLinks>
                        </div>
                    </div>))}

                {isAdmin && (
                    <Link to={"/agregarAdopcion"}>
                        <button id="boton-administrador">Agregar nueva Adopción</button>
                    </Link>
                )}

            </div>
            <div className="botones">
                <Link to={"/formulario"}>
                    <div>
                        <button className="volver">Formulario de Adopción</button>
                    </div>
                </Link>
            </div>
        </>
    )
}
export default Adopciones;