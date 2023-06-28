import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../firebaseConfig/AuthProvider"
import { useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const SignOut = () => {
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    const navigate = useNavigate();

    if (currentUser !== null) {
        signOut(auth).then(() => {
            console.log("Cerraste sesion");
            
            navigate('/')
            }).catch((error) => {
            console.log("Error: ", error);
        });
    }

   
}
export default SignOut;