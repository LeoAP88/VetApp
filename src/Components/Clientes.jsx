import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { AuthContext } from "./firebaseConfig/AuthProvider";
import { db } from "./firebaseConfig/firebase";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import Table from 'react-bootstrap/Table';
import "./Clientes.css"
import {
    FadeLoader
} from 'react-spinners';


const mySwal = withReactContent(Swal)

const LogInLinks = ({ id, getClientes }) => {
    
    const User = useContext(AuthContext);
    const user = User.currentUser;
    let isUserLoggedIn = User.currentUser !== null;


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
                <Link to={`/editarPerfil/${id}`}>
                    <button className="boton_editar btn btn-primary"><i className="fa-solid fa-pencil"></i></button>
                </Link>
                <button onClick={() => { confirmDelete() }} className="boton_borrar btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </>
        );
    }
}


const Clientes = () => {
    const [loading, setLoading] = useState(true);


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
            <div className="container">
                <h1 className="titulo_pagina">Clientes</h1>
                <Table striped>
                    <thead>
                        <tr>
                            {/* <th>Id</th> */}
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Mascotas</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                {/* <td>{cliente.id}</td> */}
                                <td className="align-middle">{cliente.Nombre}</td>
                                <td className="align-middle">{cliente.Apellido}</td>
                                <td className="align-middle">{cliente.Email}</td>
                                <td className="align-middle">
                                    <Link to={`/misMascotas/${cliente.id}`}><button className="boton_ver_mascotas_btn btn-success">Ver Mascotas</button></Link>
                                </td>
                                <td className="align-middle">
                                    <LogInLinks id={cliente.id} getClientes={getClientes}></LogInLinks>
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
