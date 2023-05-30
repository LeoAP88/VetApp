import "./Login.css"
import {Link} from "react-router-dom"
import {useState} from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/auth"
import {auth} from "./firebaseConfig/firebase"

const Login = () => {
    const auth = getAuth();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const submit= async ()=>{
       await signInWithEmailAndPassword(auth,email,password);
        console.log("Ingreso correcto")
    }
    return(
        <div id="contenedor">

            <div id="contenedorcentrado">
                <div id="login">
                    <form id="loginform">
                        <label for="email">Email</label>
                        <input id="usuario" type="text" name="email" placeholder="email" required onChange={(e) =>setEmail(e.target.value)}></input>

                        <label for="password">Contraseña</label>
                        <input id="password" type="password" placeholder="Contraseña" name="password" required onChange={(e) =>setPassword(e.target.value)}></input>
                        <Link to={"/"}>
                        <button type="submit" title="Ingresar" name="Ingresar" onClick={submit}>Ingresar</button>
                        </Link>
                    </form>

                </div>
                <div id="derecho">
                    <div className="titulo">
                        Bienvenido
                    </div>
                    <hr></hr>
                    <div className="pie-form">
                        <a href="#">¿Perdiste tu contraseña?</a>
                        <Link to={"/register"}>¿No tienes Cuenta? Registrate</Link>
                        <Link to={"/"}>« Volver</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
