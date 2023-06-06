import { Link } from "react-router-dom";
import "./NavBar.css"
import { BsInstagram, BsFacebook, CgProfile, MdOutlineLocalGroceryStore, GiHospitalCross } from 'react-icons/all';

const NavBar = () => {

    return (
        <nav className="navbar" id="navbar">
            <div className="nav-link-section">
                <Link to="/" className="nav-link nav-item"><GiHospitalCross className="logo" /></Link>
                <Link to="/quienesSomos" className="nav-link nav-item">Quiénes Somos</Link>
                {/* <Link to="/" className="nav-link nav-item">Inicio</Link> */}
                <Link to="/consultas" className="nav-link nav-item">Consultas</Link>
                <Link to="/login" className="nav-link nav-item">Ingresar</Link>
                <Link to="/register" className="nav-link nav-item"><button className="registrate">Registrate</button></Link>

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