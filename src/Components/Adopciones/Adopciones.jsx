import { Link } from "react-router-dom";
import Swal from "sweetalert2"
import whitReactContent from "sweetalert2-react-content"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../firebaseConfig/AuthProvider"
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
        <div id="div_seccion_adopciones">
            <div id="intro_adopciones">
                <h1 className="titulo_pagina">¡Suma a un nuevo integrante a tu familia!</h1>
                <p>
                    Adoptando estas salvando la vida de un animal rescatado. 
                    Adoptar es un acto de increíble amor y responsabilidad, 
                    por eso es necesario estar completamente seguros de que 
                    estamos listos para tener una mascota. 
                    Un animal de compañía dependerá toda su vida de nosotros. 
                    <br />
                    Si ya lo decidiste y te sentís capacitado es momento 
                    de comenzar con el proceso de adopcion. 
                    ¡Completá el formulario y nos contactaremos!
                </p>
                <Link to={"/formulario"}>
                    <div>
                        <button className="botones_adoptar" id="form_adop1">¡Quiero adoptar!</button>
                    </div>
                </Link>
            </div>
            <div id="contenedor_adopciones">
                {adopciones.map((adopcion) => (
                    <div className="tarjeta_adopciones" key={adopcion.id}>
                        <div className="tarjeta_adopciones_cuerpo">
                            <div>
                                <img src={`${adopcion.Foto}`} alt=""></img>
                            </div>
                        </div>
                        <div className="tarjeta_adopciones_titulo">{adopcion.Nombre}</div>
                        <div className="tarjeta_adopciones_pie">
                            <Link to={`/adopcion/${adopcion.id}`}><button>Más información</button></Link>
                        </div>
                        <div className="tarjeta_adopciones_bot">
                            <LogInLinks isUserLoggedIn={isUserLoggedIn} id={adopcion.id} getAdopciones={getAdopciones}></LogInLinks>
                        </div>
                    </div>))}
            </div>
            
            {isAdmin && (
                <Link to={"/agregarAdopcion"}>
                    <button id="boton-agregar-adopcion">Agregar nueva Adopción</button>
                </Link>
            )}

            <div>
                <Link to={"/formulario"}>
                    <div>
                        <button className="botones_adoptar" id="form_adop2">¡Quiero adoptar!</button>
                    </div>
                </Link>
            </div>
        </div>
        </>
    )
}
export default Adopciones;