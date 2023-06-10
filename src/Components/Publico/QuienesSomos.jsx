import {db} from "../firebaseConfig/firebase"
import {collection,getDocs, doc} from "firebase/firestore"
import React, { useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../AuthProvider";
import { useParams } from "react-router-dom";

const QuienesSomos = () => {
    

    return(
        <div>Quienes somos</div>
    )
}
export default QuienesSomos;