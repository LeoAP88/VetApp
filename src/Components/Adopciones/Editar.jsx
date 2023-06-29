import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase"
import { AuthContext } from "../firebaseConfig/AuthProvider"
import "./Editar.css"

const Editar = () => {
    const [Nombre, setNombre] = useState("")
    const [Foto, setFoto] = useState("")
    const [Especie, setEspecie] = useState("Perro")
    const [Raza, setRaza] = useState("")
    const [Color, setColor] = useState("")
    const [Sexo, setSexo] = useState("Macho")
    const [Edad, setEdad] = useState(0)
    const [Caracteristicas, setCaracteristicas] = useState("")

    const { id } = useParams();

    const User = useContext(AuthContext);

    const navigate = useNavigate()

    const update = async (e) => {
        e.preventDefault();
        const adopcionDoc = doc(db, "Adopciones", id);
        const data = {
            Nombre: Nombre,
            Foto: Foto,
            Especie: Especie,
            Raza: Raza,
            Color: Color,
            Sexo: Sexo,
            Edad: Edad,
            Caracteristicas: Caracteristicas
        };
        await updateDoc(adopcionDoc, data);
        navigate(`/adopcion/${id}`);
    };

    const getAdopcion = async () => {

        const adopcionDoc = await getDoc(doc(db, "Adopciones", id));
        if (adopcionDoc.exists()) {
            setNombre(adopcionDoc.data().Nombre);
            setFoto(adopcionDoc.data().Foto);
            setEspecie(adopcionDoc.data().Especie);
            setRaza(adopcionDoc.data().Raza);
            setColor(adopcionDoc.data().Color);
            setSexo(adopcionDoc.data().Sexo);
            setEdad(adopcionDoc.data().Edad);
            setCaracteristicas(adopcionDoc.data().Caracteristicas);
        } else {
            console.log("El archivo no existe");
        }
    }

    useEffect(() => {
        getAdopcion(id);
    }, []);

    return (
        <>
            <h1>Editar</h1>
            <div className="container_crearMascota">
                <form className="editarMascota_form" action="" method='POST' onSubmit={update}>
                    <div className="container_campo campo_edit">
                        <label htmlFor="nombre">Nombre</label>
                        <input value={Nombre} type="text" name="nombre" required onChange={(e) => setNombre(e.target.value)}></input>
                    </div>
                    <div className="container_campo">
                        <label htmlFor="foto"></label>
                        <input value={Foto} type="text" name="foto" required onChange={(e) => setFoto(e.target.value)} placeholder="Foto"></input>
                    </div>
                    <div className="container_campo_select container_select_edit">
                        <p className="Especie_tag">Especie</p>
                        <select value={Especie} className="select_especie" required name="especie" id="especie" onChange={(e) => setEspecie(e.target.value)}>
                            <option value="Perro">Perro</option>
                            <option value="Gato">Gato</option>
                        </select>
                    </div>
                    <div className="container_campo">
                        <label htmlFor="raza">Raza</label>
                        <input value={Raza} type="text" name="raza" required onChange={(e) => setRaza(e.target.value)}></input>
                    </div>
                    <div className="container_campo">
                        <label htmlFor="raza">Color</label>
                        <input value={Color} type="text" name="color" required onChange={(e) => setColor(e.target.value)}></input>
                    </div>
                    <div className="container_campo_select container_select_edit">
                        <p className="Especie_tag label_editForm">Sexo</p>
                        <select value={Sexo} className="select_especie select_edit" required name="sexo" id="sexo" onChange={(e) => setSexo(e.target.value)}>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>
                    </div>
                    <div className="container_campo">
                        <label htmlFor="edad">Edad</label>
                        <input value={Edad} type="text" name="edad" required onChange={(e) => setEdad(e.target.value)}></input>
                    </div>
                    <div className="container_campo">
                        <label htmlFor="raza">Caracteristicas</label>
                        <textarea  value={Caracteristicas} name="caracteristicas" id="caracteristicas" cols="25" rows="5" required onChange={(e) => setCaracteristicas(e.target.value)}></textarea>
                    </div>
                    <button className="volver" type="submit">Guardar</button>
                    <Link to={`/adopcion/${id}`}>
                        <button className="volver">Volver</button>
                    </Link>
                </form>

            </div>
        </>
    )
}

export default Editar;