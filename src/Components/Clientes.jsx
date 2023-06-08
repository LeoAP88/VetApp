import{useState,useEffect, useContext} from "react"
import {Link} from "react-router-dom"
import{collection,getDocs,deleteDoc,doc} from "firebase/firestore"
import { AuthContext } from "./AuthProvider";
import { db } from "./firebaseConfig/firebase";

const Clientes = () => {
    const User = useContext(AuthContext);

    const [clientes,setClientes] = useState([])
    const clientesCollection= collection(db,"Clientes")

    const getClientes = async() =>{
        const data = await getDocs(clientesCollection)
    /*  console.log(data.docs); */
      setClientes(
        data.docs.map((doc)=>({...doc.data(),id:doc.id}))
      )
      console.log(clientes);
    }

    useEffect(()=>{
        getClientes()
    },[])

    return (
        
        <>
        <div className="">
            <div>
                <table>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clientes.map((cliente)=>(
                            <tr key={cliente.id}>
                                <td>{cliente.Nombre}</td>
                                <td>{cliente.Apellido}</td>
                                <td>{cliente.Email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <Link to={"/crear"}>
                    <button className='btn-crearMascota' type="button">Añadir mascota</button>
                </Link>
            </div>
        </div>
        </>
    )
}

export default Clientes;
