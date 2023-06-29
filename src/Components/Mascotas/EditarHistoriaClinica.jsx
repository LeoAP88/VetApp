import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase"
import { AuthContext } from "../firebaseConfig/AuthProvider"
import "./EditarHistoriaClinica.css"

const EditarHistoriaClinica = () => {
  const [Fecha, setFecha] = useState("")
  const [Consulta, setConsulta] = useState("")

  const { idUsuario, id, idHistoria } = useParams();

  const User = useContext(AuthContext);

  const navigate = useNavigate()

  const update = async (e) => {
    e.preventDefault();
    const entradaDoc = doc(db, `/Clientes/${idUsuario}/Mascotas/${id}/HistoriaClinica/${idHistoria}`);
    const data = {
      Fecha: Fecha,
      Consulta: Consulta
    };
    await updateDoc(entradaDoc, data);
    navigate(`/historiaClinica/${idUsuario}/${id}`);
  };

  const getEntrada = async () => {

    const entradaDoc = await getDoc(doc(db, `/Clientes/${idUsuario}/Mascotas/${id}/HistoriaClinica/${idHistoria}`));
    if (entradaDoc.exists()) {
      setFecha(entradaDoc.data().Fecha);
      setConsulta(entradaDoc.data().Consulta)
    } else {
      console.log("El archivo no existe");
    }
  }

  useEffect(() => {
    getEntrada(id);
  }, []);


  return (
    <>
    <div className="container_editarHistoria">
      <h1 className="titulo_consulta">Editar historia</h1>
      <span>{Fecha}</span>
      <div className="container_consulta">
        <textarea className="texto_consulta" value={Consulta} name="" id="" cols="30" rows="10" onChange={(e) => setConsulta(e.target.value)}></textarea>
        <button className="volver" onClick={update}>Guardar</button>
      </div>
      <Link to={`/historiaClinica/${idUsuario}/${id}`}>
        <button className="volver">Volver</button>
      </Link>
    </div>
    </>
  )
}

export default EditarHistoriaClinica;