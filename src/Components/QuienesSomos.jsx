import {db} from "./firebaseConfig/firebase"
import {collection,getDocs, doc} from "firebase/firestore"
import React, { useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "./AuthProvider";

const QuienesSomos = () => {

    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);
    console.log(currentUser);

    const query = collection(db, "Clientes");

    const getClientes = async() =>{
        const data = await getDocs(query)
     console.log(data.docs); 
     const cliente = data.docs.map((doc)=>({id:doc.id}))
     console.log(cliente);
    }

     useEffect(()=>{
        getClientes()
    },[])

    return(
        <div>Quienes somos</div>
    )
}
export default QuienesSomos;