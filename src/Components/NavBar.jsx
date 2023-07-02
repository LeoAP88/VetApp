import { Link, NavLink } from "react-router-dom";
import "./NavBar.css"
import { BsInstagram, BsFacebook, CgProfile, MdOutlineLocalGroceryStore, GiHospitalCross } from 'react-icons/all';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./firebaseConfig/AuthProvider"
import { getAuth } from "firebase/auth";

const LogInLinks = () => {

    const User = useContext(AuthContext);
    const user = User.currentUser;
    const uid = user?.uid;
    const isUserLoggedIn = user !== null;

    if (!isUserLoggedIn) {
        return (
            <>
                <NavLink to="/login" className="nav-link nav-item"><button id="botonIngresar" className="botonNavNoLogin">Ingresar</button></NavLink>
                <NavLink to="/register" className="nav-link nav-item"><button id="botonRegistrate" className="botonNavNoLogin">Registrate</button></NavLink>
            </>
        );
    }

    else if (isUserLoggedIn && user.email == 'admin@gmail.com') {
        return (
            <>
                <NavLink to="/clientes" className="nav-link nav-item">Clientes</NavLink>
                <NavLink to="/turnos" className="nav-link nav-item">Turnos</NavLink>
                <NavLink to="/signOut" className="nav-link nav-item"><button id="botonCerrarSesion" className="botonNavLogin">Cerrar Sesión</button></NavLink>
            </>
        );
    }

    else {
        return (
            <>
                <NavLink to={`/misMascotas/${uid}`} className="nav-link nav-item">Mis Mascotas</NavLink>
                <NavLink to="/turnos" className="nav-link nav-item">Turnos</NavLink>      
                <NavLink to="/signOut" className="nav-link nav-item"><button id="botonCerrarSesion" className="botonNavLogin">Cerrar Sesión</button></NavLink>
                <NavLink to={`/perfil/${uid}`} className="nav-link nav-item"><CgProfile /></NavLink>
            </>
        );
    }
}

const NavBar = () => {

    return (
        <nav className="navbar" id="navbar">
            <div className="nav-link-section">
                {/* NavLink agrega por defecto la clase active cuando el path esta activo. 
            Con la prop end le indicamos que matchee solo el path especificado, y no los paths hijos*/}
                <NavLink to="/" className="nav-link nav-item huellitas">
                    <figure>
                        <img src="/logoBlanco.jpg" alt="" className="logoBlanco" />
                    </figure>
                    Huellitas
                </NavLink>
                {/* <NavLink to="/" className="nav-link nav-item" end><GiHospitalCross className="logo" /></NavLink> */}
                <NavLink to="/quienesSomos" className="nav-link nav-item">Quiénes Somos</NavLink>
                <NavLink to="/adopciones" className="nav-link nav-item">Adopciones</NavLink>
                {/* <Link to="/" className="nav-link nav-item">Inicio</Link> */}
                <NavLink to="/consultas" className="nav-link nav-item">Consultas</NavLink>
                <LogInLinks></LogInLinks>
                <a href="https://www.instagram.com/" target="_blank" style={{ color: "black", paddingRight: "10px" }}><BsInstagram /></a>
                <a href="https://es-la.facebook.com/" target="_blank" style={{ color: "black", paddingRight: "10px" }}><BsFacebook /></a>

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
        </nav >
    )
}

export default NavBar;