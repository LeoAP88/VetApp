//campos para el cliente: nombre, apellido, direccion, numero de telefono, email!, 
//campos para la mascota: nombre, especie, raza, sexo, edad/nacimiento, pelaje, castrado? 
import { useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { AuthContext } from "../firebaseConfig/AuthProvider"
import './AgregarMascota.css'

const AgregarMascota = () => {
    const [Nombre, setNombre] = useState("")
    const [Especie, setEspecie] = useState("Perro")
    const [Raza, setRaza] = useState("")
    const [Color, setColor] = useState("")
    const [Sexo, setSexo] = useState("Macho")
    const [Edad, setEdad] = useState(0)

    const User = useContext(AuthContext);

    const uid = User.currentUser?.uid;
    const { id } = useParams();

    const navigate = useNavigate()

    const mascotasCollection = collection(db, `/Clientes/${id}/Mascotas`)

    const crearMascota = async (e) => {
        e.preventDefault()
        await addDoc(mascotasCollection, {
            Nombre: Nombre,
            Especie: Especie,
            Raza: Raza,
            Color: Color,
            Sexo: Sexo,
            Edad: Edad
        })
        navigate(`/misMascotas/${id}`)

    }

    return (
        <>
            <h1>Agregar Nueva Mascota</h1>
            <div className="container_crearMascota">
                <form className="crearMascota_form" action="" method='POST'>
                    <div className="container_campo">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" required onChange={(e) => setNombre(e.target.value)}></input>
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
                        <label htmlFor="edad">Edad (años)</label>
                        <input type="text" name="edad" required onChange={(e) => setEdad(e.target.value)}></input>
                    </div>
                    <button className="volver" type="submit" onClick={crearMascota}>Cargar Mascota</button>
                    <Link to={`/misMascotas/${id}`}>
                        <button className="volver">Volver</button>
                    </Link>
                </form>
            </div>
        </>
    )
}


export default AgregarMascota;