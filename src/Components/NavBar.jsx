import { Link, NavLink } from "react-router-dom";
import "./NavBar.css"
import { BsInstagram, BsFacebook, CgProfile, MdOutlineLocalGroceryStore, GiHospitalCross } from 'react-icons/all';

const LogInLinks = ({isUserLoggedIn}) => {
    if(!isUserLoggedIn){
        return(
            <>
                <NavLink to="/login" className="nav-link nav-item">Ingresar</NavLink>
                <NavLink to="/register" className="nav-link nav-item"><button className="registrate">Registrate</button></NavLink>
            </>
        );
    }else{
        return(
            <NavLink to="/signOut" className="nav-link nav-item">SignOut</NavLink>
        );
    }
}

const NavBar = ({isUserLoggedIn}) => {

    return (
        <nav className="navbar" id="navbar">
            <div className="nav-link-section">
            {/* NavLink agrega por defecto la clase active cuando el path esta activo. 
            Con la prop end le indicamos que matchee solo el path especificado, y no los paths hijos*/}
                <NavLink to="/" className="nav-link nav-item" end><GiHospitalCross className="logo"/></NavLink>
                <NavLink to="/quienesSomos" className="nav-link nav-item">Quiénes Somos</NavLink>
                {/* <Link to="/" className="nav-link nav-item">Inicio</Link> */}
                <NavLink to="/consultas" className="nav-link nav-item">Consultas</NavLink>

                <LogInLinks isUserLoggedIn={isUserLoggedIn}></LogInLinks>

                {/* <Link to="/misMascotas" className="nav-link nav-item">Mis Mascotas</Link>
                <Link to="/tienda" className="nav-link nav-item">Tienda</Link>
                <Link to="/adopciones" className="nav-link nav-item">Adopciones</Link>
                <Link to="/turnos" className="nav-link nav-item">Turnos</Link>
                <Link to="/perfil" className="nav-link nav-item"><CgProfile /></Link>
                <Link to="/" className="nav-link nav-item"><MdOutlineLocalGroceryStore /></Link>
                <Link to="/signOut" className="nav-link nav-item">Cerrar Sesión</Link>
                <a href="https://www.instagram.com/" target="_blank" style={{ color: "white", paddingRight: "10px" }}><BsInstagram /></a>
                <a href="https://es-la.facebook.com/" target="_blank" style={{ color: "white", paddingRight: "10px" }}><BsFacebook /></a> */}
            </div>
        </nav>
    )
}

export default NavBar;