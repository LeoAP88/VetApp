import { Link } from "react-router-dom";
import "./NavBar.css"
import ToggleSwitch from "./ToggleSwitch";

const NavBar = ({onThemeChange}) => {
    return(
        <nav className="navbar" id="navbar">
            <div className="nav-link-section">
            <Link to="/" className="nav-link nav-item">Inicio</Link>
            <Link to="/section" className="nav-link nav-item">Consultas</Link>
            <Link to="/login" className="nav-link nav-item">Log In</Link>
            <Link to="/register" className="nav-link nav-item">Registro</Link>
            <Link to="/quienesSomos" className="nav-link nav-item">Quienes Somos</Link>
            <Link to="/misMascotas" className="nav-link nav-item">Mis Mascotas</Link>
            <Link to="/tienda" className="nav-link nav-item">Tienda</Link>
            <Link to="/adopciones" className="nav-link nav-item">Adopciones</Link>
            <Link to="/turnos" className="nav-link nav-item">Turnos</Link>
            </div>
            <ToggleSwitch onToggle={onThemeChange}></ToggleSwitch>
        </nav>
    );
}

export default NavBar;