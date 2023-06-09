import React from 'react'
import {
    FadeLoader
} from 'react-spinners'
import { Mascotas } from './Mascotas';
import "./MascotasListado.css"
import { Link } from "react-router-dom";

export const Mascota = ({ mascotas }) => {

    return (
        <>
            <h1>Mis Mascotas</h1>

            <div className="Listado_Container">
                {mascotas.length>0 ? mascotas.map((mascota) =>
                    <Mascotas key={mascota.id} mascotas={mascota} />)
                    : !mascotas.exists ?
                    <div>No se encontraron mascotas asociadas a su usuario</div>
                    :
                    (<div className='loader_container'>
                        <FadeLoader />
                    </div>)
                }
            </div>
        </>

    )
}