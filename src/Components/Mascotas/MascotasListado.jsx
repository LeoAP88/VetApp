import React from 'react'
import {
    FadeLoader
} from 'react-spinners'
import { Mascotas } from './Mascotas';
import "./MascotasListado.css"
import { Link } from "react-router-dom";

export const Mascota = ({ mascotas , idUsuario}) => {

    return (
        <>
            <h1>Mis Mascotas</h1>

            <div className="Listado_Container">
                {mascotas.length>0 ? mascotas.map((mascota) =>
                    <Mascotas key={mascota.id} mascotas={mascota} idUsuario={idUsuario}/>)
                    : 
                    <div>No se encontraron mascotas asociadas a este usuario</div>
                }
            </div>
        </>

    )
}