import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { AuthContext } from "../firebaseConfig/AuthProvider"
import { Col } from "react-bootstrap";
import "./EditarMascota.css";

const EditarMascota = () => {
  const [Nombre, setNombre] = useState("");
  const [Especie, setEspecie] = useState("Perro");
  const [Raza, setRaza] = useState("");
  const [Color, setColor] = useState("");
  const [Sexo, setSexo] = useState("Macho");
  const [Edad, setEdad] = useState(0);

  const { idUsuario, idMascota } = useParams();

  const User = useContext(AuthContext);

  const navigate = useNavigate();

  const update = async (e) => {
    e.preventDefault();
    const mascotaDoc = doc(db, `/Clientes/${idUsuario}/Mascotas/${idMascota}`);
    const data = {
      Nombre: Nombre,
      Especie: Especie,
      Raza: Raza,
      Color: Color,
      Sexo: Sexo,
      Edad: Edad,
    };
    await updateDoc(mascotaDoc, data);
    navigate(`/misMascotas/${idUsuario}`);
  };

  const getMascota = async () => {
    const mascotaDoc = await getDoc(
      doc(db, `/Clientes/${idUsuario}/Mascotas/${idMascota}`)
    );
    if (mascotaDoc.exists()) {
      setNombre(mascotaDoc.data().Nombre);
      setEspecie(mascotaDoc.data().Especie);
      setRaza(mascotaDoc.data().Raza);
      setColor(mascotaDoc.data().Color);
      setSexo(mascotaDoc.data().Sexo);
      setEdad(mascotaDoc.data().Edad);
    } else {
      console.log("El archivo no existe");
    }
  };

  useEffect(() => {
    getMascota();
  }, []);

  return (
    <>
      <h1 className="titulo_pagina">Editar Mascota</h1>
      <div className="container_crearMascota">
        <form className="crearMascota_form" action="" method="POST">
          <div className="container_campo" id="campos">
            <label htmlFor="nombre">Nombre</label>
            <input
              value={Nombre}
              type="text"
              name="nombre"
              required
              onChange={(e) => setNombre(e.target.value)}
            ></input>
          </div>
          <div className="container_campo_select" id="campos">
            <p className="Especie_tag">Especie</p>
            <select
              value={Especie}
              className="select_especie"
              required
              name="especie"
              id="especie"
              onChange={(e) => setEspecie(e.target.value)}
            >
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>
          <div className="container_campo" id="campos">
            <label htmlFor="raza">Raza</label>
            <input
              value={Raza}
              type="text"
              name="raza"
              required
              onChange={(e) => setRaza(e.target.value)}
            ></input>
          </div>
          <div className="container_campo" id="campos">
            <label htmlFor="raza">Color</label>
            <input
              value={Color}
              type="text"
              name="color"
              required
              onChange={(e) => setColor(e.target.value)}
            ></input>
          </div>
          <div className="container_campo_select" id="campos">
            <p className="Especie_tag">Sexo</p>
            <select
              value={Sexo}
              className="select_especie"
              required
              name="sexo"
              id="sexo"
              onChange={(e) => setSexo(e.target.value)}
            >
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>
          <div className="container_campo" id="campos">
            <label htmlFor="edad">Edad (años)</label>
            <input
              value={Edad}
              type="text"
              name="edad"
              required
              onChange={(e) => setEdad(e.target.value)}
            ></input>
          </div>
          <button className="volver btn" type="submit" onClick={update}>
            Guardar cambios
          </button>
          <Link to={`/misMascotas/${idUsuario}`}>
            <button className="volver">Volver</button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditarMascota;
