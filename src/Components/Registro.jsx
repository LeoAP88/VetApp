import "./Registro.css"
import {Link} from "react-router-dom"
import "firebase/auth"
import {auth} from "./firebaseConfig/firebase"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from "react"


const Registro = () => {
    const auth = getAuth();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const submit= ()=>{
        createUserWithEmailAndPassword(auth,email,password)
    }


    return(
        <div className="container">
      <div className="center">
          <h1>Registrarse</h1>
          <form method="POST" action="">
              <div className="txt_field">
                  <input type="email" name="email" required onChange={(e) =>setEmail(e.target.value)}></input>
                  <span></span>
                  <label>Email</label>
              </div>
              <div className="txt_field">
                  <input type="password" name="password" required onChange={(e) =>setPassword(e.target.value)}></input>
                  <span></span>
                  <label>Password</label>
              </div>
              <Link to={"/"}>
              <button type="submit" title="Registrarse" name="Registrarse" onClick={submit}>Registrarse</button>
              </Link>
              <div className="signup_link">
                  ¿Ya tenes una cuenta? <Link to={"/Login"}>Ingresá acá</Link>
              </div>
          </form>
      </div>
  </div>
    );
}

export default Registro;