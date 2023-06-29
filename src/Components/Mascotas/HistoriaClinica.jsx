import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../firebaseConfig/AuthProvider"
import { db } from "../firebaseConfig/firebase"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2"
import whitReactContent from "sweetalert2-react-content";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
    FadeLoader
} from 'react-spinners'
import "./HistoriaClinica.css"

const mySwal = whitReactContent(Swal)

const LogInLinks = ({ isUserLoggedIn, idUsuario, id, idHistoria, getHistoriaClinica }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate()

    const deleteEntrada = async () => {
        const entradaDoc = doc(db, `/Clientes/${idUsuario}/Mascotas/${id}/HistoriaClinica/${idHistoria}`)
        await deleteDoc(entradaDoc)
        getHistoriaClinica()
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
                deleteEntrada(id)
                Swal.fire(
                    'Borrado!',
                    'La Entrada ha sido Borrada.',
                    'success'
                )
            }
        })
    }

    if (isUserLoggedIn && user.email == 'admin@gmail.com') {
        return (
            <>
                <Link to={`/editarHistoria/${idUsuario}/${id}/${idHistoria}`} className="boton_editar btn btn-light">
                    <i className="fa-solid fa-pencil"></i>
                </Link>
                <button onClick={() => { confirmDelete() }} className="boton_borrar btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </>
        );
    }
}

const HistoriaClinica = () => {
    const [loading, setLoading] = useState(true);
    const [historiaClinica, setHistoriaClinica] = useState([""]);
    const User = useContext(AuthContext);
    const uid = User.currentUser?.uid;
    const auth = getAuth()
    let isUserLoggedIn = User.currentUser !== null;
    const { idUsuario, id } = useParams();

    const isAdmin = User.currentUser && User.currentUser.email === 'admin@gmail.com';

    const getHistoriaClinica = async () => {
        const querySnapshot = await getDocs(collection(db, `/Clientes/${idUsuario}/Mascotas/${id}/HistoriaClinica`));
        if (querySnapshot.size >= 0) {
            const historias = querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });
            // Ordenar las historias por fecha de creación en forma descendente
            historias.sort((a, b) => b.Fecha.localeCompare(a.Fecha));

            setHistoriaClinica(historias);
        } else {
            console.log("No se encontró el documento.");
        }
        setLoading(false);
    }


    useEffect(() => {
        setLoading(true);
        if (User.currentUser !== null) {
            getHistoriaClinica();
        }
    }, []);

    if (loading) {
        return (
            <div className='loader_container'>
                <FadeLoader />
            </div>)
    }


    return (
        <>
        <div className="container_historiaClinica">
            <h1 className="titulo_pagina">Historia Clínica</h1>
            <section className="container_historias">
                {isAdmin && (
                    <Link to={`/nuevaEntrada/${idUsuario}/${id}`}>
                        <button className="volver">Nueva Entrada</button>
                    </Link>
                )}
                <div className="historias_grupo">
                    {historiaClinica.length > 0 ? (
                        historiaClinica.map((historia) => (
                            <div key={historia.id} className="historias">
                                <div className="data_grupo">
                                    <span className="Titulo_Campo">Fecha</span>
                                    <p className='Datos_fecha'>{historia.Fecha}</p>
                                </div>
                                <div className="data_grupo">
                                    <span className="Titulo_Campo">Observaciones:</span>
                                    <p className='Datos_Obs'>{historia.Consulta}</p>
                                </div>
                                <div className="bot">
                                    <LogInLinks isUserLoggedIn={isUserLoggedIn} idUsuario={idUsuario} id={id} idHistoria={historia.id} getHistoriaClinica={getHistoriaClinica}></LogInLinks>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay datos disponibles aún.</p>
                    )}
                </div>
            </section>
            <div>
                <Link to={`/misMascotas/${idUsuario}`}>
                    <button className="volver">Volver</button>
                </Link>
            </div>
        </div>
        </>
    )
}

export default HistoriaClinica;