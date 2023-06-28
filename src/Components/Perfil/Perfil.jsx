import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { AuthContext } from "../firebaseConfig/AuthProvider"
import "./Perfil.css";
import { BsFillFilePersonFill } from "react-icons/bs";

const Perfil = () => {
  const [Nombre, setNombre] = useState("");
  const [Email, setEmail] = useState("");
  const [Apellido, setApellido] = useState("");

  const { uid } = useParams();

  const getPerfil = async () => {
    const perfilDoc = await getDoc(doc(db, "Clientes", uid));
    if (perfilDoc.exists()) {
      setNombre(perfilDoc.data().Nombre);
      setApellido(perfilDoc.data().Apellido);
      setEmail(perfilDoc.data().Email);
    } else {
      console.log("No se encontró al usuario");
    }
  };

  useEffect(() => {
    getPerfil();
  }, []);

  return (
    <>
      <h1 className="titulo_pagina">Perfil</h1>
      <div className="container_perfil">
        <BsFillFilePersonFill size={"10rem"} />
        <form action="">
          {/* <div className="container_campo">
            <label htmlFor="id">Id Cliente: {uid}</label>
          </div> */}
          <div className="container_campo campo_edit">
            <label htmlFor="nombre">Nombre: {Nombre}</label>
          </div>
          <div className="container_campo campo_edit">
            <label htmlFor="nombre">Apellido: {Apellido}</label>
          </div>
          <div className="container_campo">
            <label value={Email} htmlFor="email">
              Email: {Email}
            </label>
          </div>
          <Link to={`/editarPerfil/${uid}`}>
            <button className="volver">Editar</button>
          </Link>
          <Link to={`/`}>
            <button className="volver">Volver</button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Perfil;
