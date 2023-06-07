import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { db } from "./firebaseConfig/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";


const MisMascotas = () => {
    const [mascotas,setMascotas] = useState([]);
    const User = useContext(AuthContext);
    const uid = User.currentUser?.uid;

    useEffect(()=>{    
        async function getMascotas(){
            const querySnapshot = await getDocs(collection(db, `/Clientes/${uid}/Mascotas`));
            if(querySnapshot.size===0){
                    //No hay mascotas
                }else{
                    console.log(querySnapshot.docs.map(doc => doc.data()))
                    setMascotas(querySnapshot.docs.map(doc => {return {id:doc.id, ...doc.data()}}));              
                }
        }
        if(User.currentUser!==null){
        getMascotas();
        }
    },
    [uid]);

    return(
        <>
        <div>Mis mascotas</div>
        <div>
            {mascotas.map(mascota=>{
                return <p key={mascota.id}>{mascota.Nombre}</p>;
            })}
        </div>
        </>
    )
}
export default MisMascotas