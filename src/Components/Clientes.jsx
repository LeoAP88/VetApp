import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { AuthContext } from "./AuthProvider";
import { db } from "./firebaseConfig/firebase";
import {
    FadeLoader
} from 'react-spinners';
import "./Clientes.css"
import Table from 'react-bootstrap/Table';

const Clientes = () => {
    const [loading, setLoading] = useState(true);

    const User = useContext(AuthContext);

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
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>
        </>
    )
}

export default Clientes;
