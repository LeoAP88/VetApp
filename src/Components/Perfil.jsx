import { getAuth } from "firebase/auth";
import { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig/firebase";
import { AuthContext } from "./AuthProvider";

const Perfil = () => {
    const [mascotas, setMascotas] = useState([]);
    const auth = getAuth();
    const User = useContext(AuthContext);
    const uid = User.currentUser?.uid;
    const { id } = useParams();

    useEffect(() => {
        async function getMascotas() {
            const querySnapshot = await getDocs(doc(db,`/Clientes/${id}/Mascotas/id`));
            if (querySnapshot.exists()) {
                setMascotas(querySnapshot.data());
              } else {
                console.log("No se encontró el documento.");
              }
            }
            getMascotas()
    },[]);


    

  /*   if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;
    return (`${id}`)
    }
     */
    return (
        <>
        <div>
            <div>
                <button>{id}</button>
            </div>
        </div>



        <div>
        </div>
        {/* <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src="" width="100" className="img-fluid rounded" />
                    <h5 className="card-title">Nombre: {}</h5>
                    <p className="card-text">Email: {}</p>
                    <button 
                        className='btn btn-dark' 
                        
                    >
                        Editar Nombre
                    </button>
                </div>
                {
                    
                    <div className="card-body">
                        <div className="d-flex justify-content-center my-2">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                }
                {
                     
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-5">
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Recipient's username" 
                                        
                                        
                                    />
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-outline-secondary" 
                                            type="button" 
                                            
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div> */}
        </>
    )
}

export default Perfil;