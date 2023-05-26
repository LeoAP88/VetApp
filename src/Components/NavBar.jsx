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
            </div>
            <ToggleSwitch onToggle={onThemeChange}></ToggleSwitch>
        </nav>
    );
}

export default NavBar;