import "./Mascotas.css"
import {Link} from "react-router-dom";

import { FaDog, FaCat } from 'react-icons/all';

export const Mascotas = ({ mascotas }) => {

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
                        <Link to={"/historiaClinica"}>
                            <button className="HC">Ver Historia Clínica</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}