import "./Inicio.css"
import { IoCalendarSharp, CgLogIn, MdAppRegistration, AiFillQuestionCircle, MdPets, GiFlexibleLamp, ImEye, TbDog } from 'react-icons/all';
import {Link} from "react-router-dom"

const Inicio = () => {
    return(
        <>
        <div id='inicio'>
            YOU ARE HOME
            Info basica de la empresa(el tipico quienes somos).
            Derivacion a otras secciones:sacar turnos, hacer consultas, 
            registrarse/logearse, comprar productos,contacto/sucursales
        </div>
        <div>
            <Link to={"/turnos"}>
            <div>
                <h2> <IoCalendarSharp/> Turnos</h2>
            </div>
            </Link>

            <Link to={"/login"}>
            <div>
                <h2> <CgLogIn/> LogIn</h2>
            </div>
            </Link>

            <Link to={"/register"}>
            <div>
                <h2> <MdAppRegistration/> Registrarse</h2>
            </div>
            </Link>

            <Link to={"/consultas"}>
            <div>
                <h2> <AiFillQuestionCircle/> Consultas </h2>
            </div>
            </Link>

            <Link to={"/quienesSomos"}>
            <div>
                <h2> <GiFlexibleLamp/> Quienes Somos </h2>
            </div>
            </Link>

            <Link to={"/misMascotas"}>
            <div>
                <h2> <MdPets/> Mis Mascotas </h2>
            </div>
            </Link>

            <Link to={"/tienda"}>
            <div>
                <h2> <ImEye/> Tienda </h2>
            </div>
            </Link>

            <Link to={"/adopciones"}>
            <div>
                <h2> <TbDog/> Adopciones </h2>
            </div>
            </Link>
        </div>
        </>
    );
}

export default Inicio;