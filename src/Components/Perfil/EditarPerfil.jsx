import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { AuthContext } from "../firebaseConfig/AuthProvider"
import { BsFillFilePersonFill } from "react-icons/bs";

const EditarPerfil = () => {
  const [Nombre, setNombre] = useState("");
  const [Email, setEmail] = useState("");
  const [Apellido, setApellido] = useState("");

  const User = useContext(AuthContext);
  const user = User.currentUser;
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const perfilDoc = doc(db, "Clientes", id);
    const data = {
      Nombre: Nombre,
      Apellido: Apellido,
    };
    await updateDoc(perfilDoc, data);
    user.email == "admin@gmail.com"
      ? navigate(`/clientes`)
      : navigate(`/perfil/${id}`);
  };

  const getPerfil = async () => {
    const perfilDoc = await getDoc(doc(db, "Clientes", id));
    if (perfilDoc.exists()) {
      setNombre(perfilDoc.data().Nombre);
      setApellido(perfilDoc.data().Apellido);
      setEmail(perfilDoc.data().Email);
    } else {
      console.log("El usuario no existe");
    }
  };

  useEffect(() => {
    getPerfil();
  }, []);

  return (
    <>
      <h1 className="titulo_pagina">Editar Perfil</h1>
      <div className="container_perfil">
        <BsFillFilePersonFill size={"10rem"} />
        <form
          className="editarMascota_form"
          action=""
          method="POST"
          onSubmit={update}
        >
          {/* <div className="container_campo">
            <label htmlFor="id">Id Cliente: {id}</label>
          </div> */}
          <div className="container_campo campo_edit">
            <label htmlFor="nombre">Nombre</label>
            <input
              value={Nombre}
              type="text"
              name="nombre"
              required
              onChange={(e) => setNombre(e.target.value)}
            ></input>
          </div>
          <div className="container_campo campo_edit">
            <label htmlFor="nombre">Apellido</label>
            <input
              value={Apellido}
              type="text"
              name="nombre"
              required
              onChange={(e) => setApellido(e.target.value)}
            ></input>
          </div>
          <div className="container_campo">
            <label value={Email} htmlFor="email">
              Email: {Email}
            </label>
          </div>
          <button className="volver" type="submit">
            Guardar
          </button>
          {user.email == "admin@gmail.com" ? (
            <Link to={`/clientes`}>
              <button className="volver">Volver</button>
            </Link>
          ) : (
            <Link to={`/perfil/${id}`}>
              <button className="volver">Volver</button>
            </Link>
          )}
        </form>
      </div>
    </>
  );
};

export default EditarPerfil;
