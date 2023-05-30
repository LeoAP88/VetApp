import "./Inicio.css"
import { IoCalendarSharp, CgLogIn, MdAppRegistration, AiFillQuestionCircle, MdPets, GiFlexibleLamp, ImEye, TbDog } from 'react-icons/all';
import { Link } from "react-router-dom"

const Inicio = () => {
    return (
        <>
            <div id='inicio'>
                YOU ARE HOME
                Info basica de la empresa(el tipico quienes somos).
                Derivacion a otras secciones:sacar turnos, hacer consultas,
                registrarse/logearse, comprar productos,contacto/sucursales
            </div>
            <div className="PanelesInicio">
                <Link to={"/turnos"} className="Link">
                    <div className="LinksContainer">
                        <h2> <IoCalendarSharp /> Turnos</h2>
                    </div>
                </Link>

                <Link to={"/login"} className="Link">
                    <div className="LinksContainer">
                        <h2> <CgLogIn /> LogIn</h2>
                    </div>
                </Link>

                <Link to={"/register"} className="Link">
                    <div className="LinksContainer">
                        <h2> <MdAppRegistration /> Registrarse</h2>
                    </div>
                </Link>

                <Link to={"/consultas"} className="Link">
                    <div className="LinksContainer">
                        <h2> <AiFillQuestionCircle /> Consultas </h2>
                    </div>
                </Link>

                <Link to={"/quienesSomos"} className="Link">
                    <div className="LinksContainer">
                        <h2> <GiFlexibleLamp /> Quienes Somos </h2>
                    </div>
                </Link>

                <Link to={"/misMascotas"} className="Link">
                    <div className="LinksContainer">
                        <h2> <MdPets /> Mis Mascotas </h2>
                    </div>
                </Link>

                <Link to={"/tienda"} className="Link">
                    <div className="LinksContainer">
                        <h2> <ImEye /> Tienda </h2>
                    </div>
                </Link>

                <Link to={"/adopciones"} className="Link">
                    <div className="LinksContainer">
                        <h2> <TbDog /> Adopciones </h2>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default Inicio;