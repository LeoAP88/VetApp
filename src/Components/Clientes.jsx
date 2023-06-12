import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { AuthContext } from "./AuthProvider";
import { getAuth } from "firebase/auth";
import { db } from "./firebaseConfig/firebase";
import Swal from "sweetalert2"
import whitReactContent from "sweetalert2-react-content"
import Table from 'react-bootstrap/Table';
import "./Clientes.css"
import {
    FadeLoader
} from 'react-spinners';


const mySwal = whitReactContent(Swal)

const LogInLinks = ({ isUserLoggedIn, id, getClientes }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate()


    const deleteCliente = async () => {
        const clienteDoc = doc(db, `/Clientes/${id}`)
        await deleteDoc(clienteDoc)
        getClientes()
    }

    const confirmDelete = () => {
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
                deleteCliente()
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
                <Link to={`/editarPerfil/${id}`} className="btn btn-light">
                    <i className="fa-solid fa-pencil"></i>
                </Link>
                <button onClick={() => { confirmDelete() }} className="btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </>
        );
    }
}


const Clientes = () => {
    const [loading, setLoading] = useState(true);

    const User = useContext(AuthContext);
    const uid = User.currentUser?.uid;
    const auth = getAuth()
    let isUserLoggedIn = User.currentUser !== null;

    const [clientes, setClientes] = useState([])
    const clientesCollection = collection(db, "Clientes")

    const getClientes = async () => {
        const data = await getDocs(clientesCollection)
        /*  console.log(data.docs); */
        setClientes(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getClientes()
    }, [])

    if (loading) {
        return (
            <div className='loader_container'>
                <FadeLoader />
            </div>)
    }

    return (

        <>
            <div className="container_clientes">
                <h1 className="titulo_pagina">Clientes</h1>
                <Table striped>
                    <thead>
                        <tr>
                            {/* <th>Id</th> */}
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Mascotas</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                {/* <td>{cliente.id}</td> */}
                                <td>{cliente.Nombre}</td>
                                <td>{cliente.Apellido}</td>
                                <td>{cliente.Email}</td>
                                <td>
                                    <Link to={`/misMascotas/${cliente.id}`}><button className="btn btn-success">Ver Mascotas</button></Link>
                                </td>
                                <td>
                                    <LogInLinks isUserLoggedIn={isUserLoggedIn} id={cliente.id} getClientes={getClientes}></LogInLinks>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>
        </>
    )
}

export default Clientes;
