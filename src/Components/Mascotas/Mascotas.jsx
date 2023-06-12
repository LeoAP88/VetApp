import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { db } from "../firebaseConfig/firebase"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Swal from "sweetalert2"
import whitReactContent from "sweetalert2-react-content"
import { Mascota } from "./MascotasListado";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./Mascotas.css"
import { FaDog, FaCat } from 'react-icons/all';

const mySwal = whitReactContent(Swal)

const LogInLinks = ({ isUserLoggedIn, idUsuario, idMascota, getMascotas }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate()


    const deleteMascota = async () => {
        const mascotaDoc = doc(db, `/Clientes/${idUsuario}/Mascotas/${idMascota}`)
        await deleteDoc(mascotaDoc)
        getMascotas()
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
                deleteMascota(id)
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
                <Link to={`/editarMascota/${idUsuario}/${idMascota}`} className="btn btn-light">
                    <i className="fa-solid fa-pencil"></i>
                </Link>
                <button onClick={() => { confirmDelete() }} className="btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </>
        );
    }
}


export const Mascotas = ({ mascotas, idUsuario, getMascotas }) => {
    const User = useContext(AuthContext);
    const uid = User.currentUser?.uid;
    const auth = getAuth()
    let isUserLoggedIn = User.currentUser !== null;

    const { Nombre, Especie, Raza, Color, Sexo, Edad } = mascotas;

    return (
        <>
            <div className='Mascota_Container'>

                <div className="Container_Foto_Mascota">
                    {Especie === 'Perro' ? <FaDog /> : <FaCat />}
                </div>
                <div className="Container_DatosMascota">
                    <div className="Campo_Container">
                        <span className="Titulo_Campo">Nombre</span>
                        <p className='Datos_Campo'>{Nombre}</p>
                    </div>
                    <div className="Campo_Container">
                        <span className="Titulo_Campo">Especie</span>
                        <p className='Datos_Campo'>{Especie}</p>
                    </div>
                    <div className="Campo_Container">
                        <span className="Titulo_Campo">Raza</span>
                        <p className='Datos_Campo'>{Raza}</p>
                    </div>
                    <div className="Campo_Container">
                        <span className="Titulo_Campo">Color</span>
                        <p className='Datos_Campo'>{Color}</p>
                    </div>
                    <div className="Campo_Container">
                        <span className="Titulo_Campo">Sexo</span>
                        <p className='Datos_Campo'>{Sexo}</p>
                    </div>
                    <div className="Campo_Container">
                        <span className="Titulo_Campo">Edad(años)</span>
                        <p className='Datos_Campo'>{Edad}</p>
                    </div>
                    <div>
                        <LogInLinks isUserLoggedIn={isUserLoggedIn} idUsuario={idUsuario} idMascota={mascotas.id} getMascotas={getMascotas}></LogInLinks>
                    </div>
                    <div>
                        <Link to={`/historiaClinica/${idUsuario}/${mascotas.id}`}>
                            <button className="HC">Ver Historia Clínica</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}