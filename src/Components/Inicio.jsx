import "./Inicio.css"
import { IoCalendarSharp, CgLogIn, MdAppRegistration, AiFillQuestionCircle } from 'react-icons/all';
import {Link} from "react-router-dom"

const Home = () => {
    return(
        <>
        <div id='inicio'>
            YOU ARE HOME
            Info basica de la empresa(el tipico quienes somos).
            Derivacion a otras secciones:sacar turnos, hacer consultas, 
            registrarse/logearse, comprar productos,contacto/sucursales
        </div>
        <div>
            <Link to={"/"}>
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

            <Link to={"/section"}>
            <div>
                <h2> <AiFillQuestionCircle/> Consultas </h2>
            </div>
            </Link>
        </div>
        </>
    );
}

export default Home;