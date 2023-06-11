import "./Login.css"
import {Link, useNavigate, useOutletContext} from "react-router-dom"
import {useState} from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/auth"
import {auth} from "../firebaseConfig/firebase"


const Login = () => {


    const navigate = useNavigate();

    const auth = getAuth();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const loginSubmit= () =>{
        signInWithEmailAndPassword(auth, email, password)
            .then(()=>{
                console.log("Ingreso correcto");
                
                navigate("/");
            })
            .catch((error)=>{
                alert(`Error: ${error.code} - ${error.message}\nHa habido un error!`)
            })   
    }
    return(
        <div id="contenedor">

            <div id="contenedorcentrado">
                <div id="login">
                    <form id="loginform" onSubmit={loginSubmit}>
                        <label htmlFor="email">Email</label>
                        <input id="usuario" type="text" name="email" placeholder="email" required onChange={(e) =>setEmail(e.target.value)}></input>

                        <label htmlFor="password">Contraseña</label>
                        <input id="password" type="password" placeholder="Contraseña" name="password" required onChange={(e) =>setPassword(e.target.value)}></input>
                        
                        <button type="button" onClick={loginSubmit}>Ingresar</button>
                        
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
