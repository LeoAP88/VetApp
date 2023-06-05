import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "./AuthProvider";

const SignOut = () => {
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    if (currentUser !== null) {
        signOut(auth).then(() => {
            console.log("Cerraste sesion");
            }).catch((error) => {
            console.log("Error: ", error);
        });
    }

   

   /*  const user = userCredential.user;

    if (user !== null) {
        signOut(auth).then(() => {
            console.log("Cerraste sesion");
            }).catch((error) => {
            console.log("Error: ", error);
        });
    } */
   
}
export default SignOut;