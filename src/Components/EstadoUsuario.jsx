import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario logeado", user)
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    
  } else {
    // User is signed out
    console.log("Usuario NO logeado")
  }
});

//hago que la funcion login sea Falsa, si se logea exitosamente, que cambie a true. Si es true, en el index no se muestra el login, sino el logout
