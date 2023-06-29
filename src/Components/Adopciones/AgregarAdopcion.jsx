import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { AuthContext } from "../firebaseConfig/AuthProvider"
import "./AgregarAdopcion.css"

const AgregarAdopcion = () => {
    const [Nombre, setNombre] = useState("")
    const [Foto, setFoto] = useState("")
    const [Especie, setEspecie] = useState("Perro")
    const [Raza, setRaza] = useState("")
    const [Color, setColor] = useState("")
    const [Sexo, setSexo] = useState("Macho")
    const [Edad, setEdad] = useState(0)
    const [Caracteristicas, setCaracteristicas] = useState("")

    const User = useContext(AuthContext);



    const navigate = useNavigate()

    const adopcionesCollection = collection(db, `/Adopciones`)

    const agregarAdopcion = async (e) => {
        e.preventDefault()
        await addDoc(adopcionesCollection, {
            Nombre: Nombre,
            Foto: Foto,
            Especie: Especie,
            Raza: Raza,
            Color: Color,
            Sexo: Sexo,
            Edad: Edad,
            Caracteristicas: Caracteristicas
        })
        navigate("/adopciones")
    }

    return (
        <>
        <div className="container_nueva_adopcion">
            <h1>Agregar Nueva Adopcion</h1>
            <div className="container_crearMascota">
                <form className="crearMascota_form" action="" method='POST'>
                    <div className="container_campo">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" required onChange={(e) => setNombre(e.target.value)}></input>
                    </div>
                    <div className="container_campo">
                        <label htmlFor="foto">Foto</label>
                        <input type="text" name="foto" required onChange={(e) => setFoto(e.target.value)}></input>
                    </div>
                    <div className="container_campo_select container_select_edit">
                        <p className="Especie_tag">Especie</p>
                        <select className="select_especie" required name="especie" id="especie" onChange={(e) => setEspecie(e.target.value)}>
                            <option value="Perro">Perro</option>
                            <option value="Gato">Gato</option>
                        </select>
                    </div>
                    <div className="container_campo">
                        <label htmlFor="raza">Raza</label>
                        <input type="text" name="raza" required onChange={(e) => setRaza(e.target.value)}></input>
                    </div>
                    <div className="container_campo">
                        <label htmlFor="raza">Color</label>
                        <input type="text" name="color" required onChange={(e) => setColor(e.target.value)}></input>
                    </div>
                    <div className="container_campo_select container_select_edit">
                        <p className="Especie_tag">Sexo</p>
                        <select className="select_especie" required name="sexo" id="sexo" onChange={(e) => setSexo(e.target.value)}>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>
                    </div>
                    <div className="container_campo">
                        <label htmlFor="edad">Edad</label>
                        <input type="text" name="edad" required onChange={(e) => setEdad(e.target.value)}></input>
                    </div>
                    <div className="container_campo">
                        <label htmlFor="raza">Caracteristicas</label>
                        <textarea name="caracteristicas" id="caracteristicas" cols="25" rows="5" required onChange={(e) => setCaracteristicas(e.target.value)}></textarea>
                    </div>
                    <div>
                        <button className="volver" type="submit" onClick={agregarAdopcion}>Agregar</button>
                        <Link to={`/adopciones`}>
                            <button className="volver">Volver</button>
                        </Link>
                    </div>
                </form>
            </div>
            </div>
        </>
    )
}


export default AgregarAdopcion;