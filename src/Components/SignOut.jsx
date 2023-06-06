import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const SignOut = () => {
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    const [logInContext] = useOutletContext();
    const navigate = useNavigate();

    if (currentUser !== null) {
        signOut(auth).then(() => {
            console.log("Cerraste sesion");
            logInContext.onSuccessfulLogout();
            navigate('/')
            }).catch((error) => {
            console.log("Error: ", error);
        });
    }

   
}
export default SignOut;