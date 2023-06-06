import {db} from "./firebaseConfig/firebase"
import {collection,getDocs} from "firebase/firestore"
import React, { useEffect } from "react";

export default Mascotas = () => {
    const query = collection(db, "Clientes");

    const getProducts = async() =>{
        const data = await getDocs(query)
     console.log(data.docs); 
    }

     useEffect(()=>{
        getProducts()
    },[])

   /*  const Mascotas = awaitDoc(query, {
        data: 'new document in sub-collection general'
      }); */
}
