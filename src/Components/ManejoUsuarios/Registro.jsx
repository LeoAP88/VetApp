import "./Registro.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { db } from "../firebaseConfig/firebase.jsx";
import { collection, doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const Registro = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const clientesCollection = collection(db, "Clientes");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const submit = (e) => {
    e.preventDefault();
    validarEmail();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //Once the user creation has happened successfully, we can add the currentUser into firestore
        //with the appropriate details.
        console.log(userCredential);
        const user = userCredential.user;
        console.log(user);
        setDoc(doc(db, "Clientes", user.uid), {
          Nombre: nombre,
          Apellido: apellido,
          Email: email,
        })
          //ensure we catch any errors at this stage to advise us if something does go wrong
          .catch((error) => {
            console.log(
              "Something went wrong with added user to firestore: ",
              error
            );
          });
        navigate("/");
      })
      //we need to catch the whole sign up process if it fails too.
      .catch((error) => {
        console.log("Something went wrong with sign up: ", error);
      });
  };

  const validarEmail = () => {
    let validador_email = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (validador_email.test(email)) {
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Error en email",
        text: "El formato de email no es correcto",
      });
      return false;
    }
  };

  const PasswdError = () => {
    if (password.length < 6) {
      return (
        <span style={{ color: "red" }}>Se requieren al menos 6 caracteres</span>
      );
    }
  };

  return (
    <div id="container">
      <div id="registro">
        <h1 className="Titulo_registro">Registro</h1>
        <form method="POST" action="" id="registroform">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="ejemplo@email.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label>Password</label>
          <input
            type="password"
            name="password"
            // placeholder="Mínimo 6 caracteres"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <PasswdError />

          <label>Nombre</label>
          <input
            type="nombre"
            name="nombre"
            placeholder="Nombre..."
            required
            onChange={(e) => setNombre(e.target.value)}
          ></input>

          <label>Apellido</label>
          <input
            type="apellido"
            name="apellido"
            placeholder="Apellido..."
            required
            onChange={(e) => setApellido(e.target.value)}
          ></input>

          <Link to={"/"} className="Link">
            <button
              className="btn-registro"
              type="submit"
              title="Registrarse"
              name="Registrarse"
              disabled={password.length < 6}
              onClick={submit}
            >
              Registrarse
            </button>
          </Link>
          <div className="signup_link">
            ¿Ya tenes una cuenta?{" "}
            <Link to={"/Login"} className="bold">
              <b>Ingresá acá</b>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Registro;

/*import "./Registro.css"
import { Link } from "react-router-dom"
import "firebase/auth"
import { auth } from "./firebaseConfig/firebase"
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {db} from "../Components/firebaseConfig/firebase.jsx"
import {collection, doc} from "firebase/firestore";


const Registro = (datosCliente) => {
    const auth = getAuth();
    const clientesCollection = collection(db,"Clientes");

    const {nombre, apellido} = datosCliente
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            //Once the user creation has happened successfully, we can add the currentUser into firestore
            //with the appropriate details.
            firebase.firestore().collection('Clientes').doc(firebase.auth().currentUser.uid)
            .set({
                Nombre: nombre,
                Apellido: apellido,
                Email: email,
            })
            //ensure we catch any errors at this stage to advise us if something does go wrong
            .catch(error => {
                console.log('Something went wrong with added user to firestore: ', error);
            })
        })
        //we need to catch the whole sign up process if it fails too.
        .catch(error => {
            console.log('Something went wrong with sign up: ', error);
        })
    }


    return (
        <div className="container">
            <div className="center">
                <h1>Registrarse</h1>
                <form method="POST" action="">
                    <div className="txt_field">
                        <input type="email" name="email" required onChange={(e) => setEmail(e.target.value)}></input>
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)}></input>
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
export default Registro;*/
