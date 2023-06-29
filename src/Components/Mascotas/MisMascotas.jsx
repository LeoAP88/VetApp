import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../firebaseConfig/AuthProvider"
import { db } from "../firebaseConfig/firebase"
import { collection, getDocs ,doc, deleteDoc} from "firebase/firestore";
import {Link, useParams, useNavigate} from "react-router-dom";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2"
import whitReactContent from "sweetalert2-react-content"
import {
    FadeLoader
} from 'react-spinners'
import { FaDog, FaCat } from 'react-icons/all';
import "./MisMascotas.css"

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
                    'La Mascota ha sido Borrada.',
                    'success'
                )
            }
        })
    }

    if (isUserLoggedIn && user.email == 'admin@gmail.com') {
        return (
            <>
                <Link to={`/editarMascota/${idUsuario}/${idMascota}`} className="boton_editar btn btn-light">
                    <i className="fa-solid fa-pencil"></i>
                </Link>
                <button onClick={() => { confirmDelete() }} className="boton_borrar btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </>
        );
    }
}


const MisMascotas = () => {
    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const User = useContext(AuthContext);
    const uid = User.currentUser?.uid;
    const auth = getAuth()
    const { idUsuario } = useParams();
    
    let isUserLoggedIn = User.currentUser !== null;
    const isAdmin = User.currentUser && User.currentUser.email === 'admin@gmail.com';

    const getMascotas = async () => {
        const querySnapshot = await getDocs(collection(db, `/Clientes/${idUsuario}/Mascotas`));
        if (querySnapshot.size !== 0) {
            console.log(querySnapshot.docs.map(doc => doc.data()))
            setMascotas(querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } }));
        }
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        if (User.currentUser !== null) {
            getMascotas();
        }
    },[uid]);

    if(loading){
        return (
            <div className='loader_container'>
                <FadeLoader />
            </div>)
    }

    return (
        <>
        <div className="container_mascotas">
            <h1 className="titulo_misMascotas">Mis Mascotas</h1>
            <div className="Listado_Container">
                {mascotas.length>0 ? mascotas.map((mascota) =>(
                    <div className='Mascota_Container' key={mascota.id}>
                        
                        <div className="Container_Foto_Mascota">
                            {mascota.Especie === 'Perro' ? <FaDog /> : <FaCat />}
                        </div>
                        <div className="Container_DatosMascota">
                            <div className="Campo_Container_mascotas">
                                <span className="Titulo_Campo_mascotas">Nombre:</span>
                                <p className='Datos_Campo_mascotas'>{mascota.Nombre}</p>
                            </div>
                            <div className="Campo_Container_mascotas">
                                <span className="Titulo_Campo_mascotas">Especie:</span>
                                <p className='Datos_Campo_mascotas'>{mascota.Especie}</p>
                            </div>
                            <div className="Campo_Container_mascotas">
                                <span className="Titulo_Campo_mascotas">Raza:</span>
                                <p className='Datos_Campo_mascotas'>{mascota.Raza}</p>
                            </div>
                            <div className="Campo_Container_mascotas">
                                <span className="Titulo_Campo_mascotas">Color:</span>
                                <p className='Datos_Campo_mascotas'>{mascota.Color}</p>
                            </div>
                            <div className="Campo_Container_mascotas">
                                <span className="Titulo_Campo_mascotas">Sexo:</span>
                                <p className='Datos_Campo_mascotas'>{mascota.Sexo}</p>
                            </div>
                            <div className="Campo_Container_mascotas">
                                <span className="Titulo_Campo_mascotas">Edad(años):</span>
                                <p className='Datos_Campo_mascotas'>{mascota.Edad}</p>
                            </div>
                            <div className="bot">
                                <LogInLinks isUserLoggedIn={isUserLoggedIn} idUsuario={idUsuario} idMascota={mascota.id} getMascotas={getMascotas}></LogInLinks>
                            </div>
                            <div>
                                <Link to={`/historiaClinica/${idUsuario}/${mascota.id}`}>
                                    <button className="HC">Ver Historia Clínica</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    ))
                    : 
                    <div>No se encontraron mascotas asociadas a este usuario</div>
                }
            </div>

            {isAdmin && (
                <Link to={`/crear/${idUsuario}`}>
                    <button id="boton-administrador">Agregar nueva mascota</button>
                </Link>
            )}

        </div>
        </>
    )
}

export default MisMascotas;