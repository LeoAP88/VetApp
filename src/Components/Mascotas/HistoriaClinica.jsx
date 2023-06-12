import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { db } from "../firebaseConfig/firebase"
import { collection, getDocs } from "firebase/firestore";
import { Mascota } from "./MascotasListado";
import { Link, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
    FadeLoader
} from 'react-spinners'
import "./HistoriaClinica.css"

const HistoriaClinica = () => {
    const [loading, setLoading] = useState(true);
    const [historiaClinica, setHistoriaClinica] = useState([""]);
    const User = useContext(AuthContext);
    const uid = User.currentUser?.uid;
    const auth = getAuth()
    const { idUsuario, id } = useParams();


    useEffect(() => {
        setLoading(true);
        async function getHistoriaClinica() {
            const querySnapshot = await getDocs(collection(db, `/Clientes/${idUsuario}/Mascotas/${id}/HistoriaClinica`));
            if (querySnapshot.size !== 0) {
                console.log(querySnapshot.docs.map(doc => doc.data()))
                setHistoriaClinica(querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } }));
            } else {
                console.log("No se encontró el documento.");
            }
            setLoading(false);
        }
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
            <h1 className="titulo_pagina">Historia Clínica</h1>
            <section className="container_historias">
                <Link to={`/nuevaEntrada/${idUsuario}/${id}`}>
                    <button className="volver">Nueva Entrada</button>
                </Link>
                <div className="historias_grupo">
                    {historiaClinica.length > 0 ? (
                        historiaClinica.map((historia) => (
                            <div key={historia.id} className="historias">
                                <div className="data_grupo">
                                    <span className="Titulo_Campo">Fecha</span>
                                    <p className='Datos_fecha'>{historia.Fecha}</p>
                                </div>
                                <div className="data_grupo">
                                    <span className="Titulo_Campo">Observaciones</span>
                                    <p className='Datos_Obs'>{historia.Consulta}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay datos disponibles.</p>
                    )}
                </div>
            </section>


        </>
    )
}

export default HistoriaClinica;