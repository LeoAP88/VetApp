//campos para el cliente: nombre, apellido, direccion, numero de telefono, email!, 
//campos para la mascota: nombre, especie, raza, sexo, edad/nacimiento, pelaje, castrado? 
import { useState, useContext } from "react";
import {useNavigate}from "react-router-dom"
import {collection,addDoc} from "firebase/firestore"
import {db} from "./firebaseConfig/firebase"
import { AuthContext } from "./AuthProvider";

const Crear = () =>{
const [Nombre, setNombre] = useState ("") 
const [Especie, setEspecie] = useState ("")
const [Raza,setRaza] = useState ("") 
const [Sexo,setSexo] = useState ("")
const [Edad,setEdad] = useState (0)

const User = useContext(AuthContext);

const uid = User.currentUser?.uid;

const navigate = useNavigate()

const mascotasCollection = collection(db,`/Clientes/${uid}/Mascotas`)

const crearMascota = async(e)=>{ 
    e.preventDefault()
    await addDoc(mascotasCollection,{ 
        Nombre:Nombre,
        Especie:Especie,
        Raza:Raza,
        Sexo:Sexo,
        Edad:Edad
    })
    navigate("/")
}

    return(
    <div className="container">
        <div className="row">
            <div className="col">
                <h1>Agregar Nueva Mascota</h1>
               <form onSubmit={crearMascota}>
                <div className="mb-3">
                 <label className="form-label">Nombre</label>   
                 <input 
                 value={Nombre}
                 onChange={(e)=>setNombre(e.target.value)}
                 className="form-control"
                 type="text"/>
                </div>

                <div className="mb-3">
                 <label className="form-label">Especie</label>   
                 <input 
                 value={Especie}
                 onChange={(e)=>setEspecie(e.target.value)}
                 className="form-control"
                 type="text"/>
                </div>

                <div className="mb-3">
                 <label className="form-label">Raza</label>   
                 <input 
                 value={Raza}
                 onChange={(e)=>setRaza(e.target.value)}
                 className="form-control"
                 type="text"/>
                </div>

                <div className="mb-3">
                 <label className="form-label">Sexo</label>   
                 <input 
                 value={Sexo}
                 onChange={(e)=>setSexo(e.target.value)}
                 className="form-control"
                 type="text"/>
                </div>

                <div className="mb-3">
                 <label className="form-label">Edad</label>   
                 <input 
                 value={Edad}
                 onChange={(e)=>setEdad(e.target.value)}
                 className="form-control"
                 type="number"/>
                </div>
<button type="submit" className="btn btn-primary">Agregar</button>
               </form>
            </div>
        </div>
    </div>
    )
}

export default Crear;