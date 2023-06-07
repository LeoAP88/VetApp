import React from 'react'
import {
    FadeLoader
} from 'react-spinners'
import { Mascotas } from './Mascotas';
import "./MascotasListado.css"

export const Mascota = ({ mascotas }) => {

    return (
        <>
            <h1>Mis Mascotas</h1>

            <div className="Listado_Container">
                {mascotas.length ? mascotas.map((mascota) =>
                    <Mascotas key={mascota.id} mascotas={mascota} />)
                    :
                    (<div className='loader_container'>
                        <FadeLoader />
                    </div>)
                }
            </div>
        </>

    )
}