import "./Turnos.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../firebaseConfig/AuthProvider"
import { collection, getDocs, updateDoc, query, where, doc, deleteDoc, collectionGroup, getDoc } from "firebase/firestore"
import { useState, useEffect, useContext } from "react"
import { db } from "../firebaseConfig/firebase"
import Table from 'react-bootstrap/Table';
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import {FadeLoader} from 'react-spinners';
import FechaDia from "./FechaDia"


/*
    Estructura de la base de turnos
    
Turnos  (col)-
             "YYYY-MM-DD"  (doc)-
                                            | - TurnosDelDia (col)- 
                                            |                      |- 08:00(doc): ClienteID(string), ClienteNombre(string)
                                            |                      |- 08:30(doc)
                                            |                      |- 10:30(doc)
                                            |                          ...
                                            |                                
                                             -   diaocupado(bool)

*/

const mySwal = withReactContent(Swal);

//convierte la fecha desde un objeto Date al formato tradicional "dd/mm/aaaa"
const parsearFecha = date => {
    const a = date.split("-");
    return `${a[2]}/${a[1]}/${a[0]}`;
}

// Componente que se renderiza si el usuario es admin, con los controles de edicion y borrado
const ControlesAdmin = ({ fechaTurno, horaTurno, getTurnos }) => {

  const deleteTurno = async (fechaTurno, horaTurno) => {
    const fechaDocRef = doc(db, `/Turnos/${fechaTurno}`);
    const fechaDoc = await getDoc(fechaDocRef);
    

    const coleccionHorasTurno = collection(
      db,
      `/Turnos/${fechaTurno}/TurnosDelDia`
    );

    const horaDocRef = doc(
      db,
      `/Turnos/${fechaTurno}/TurnosDelDia/${horaTurno}`
    );
    

    const res = await deleteDoc(horaDocRef);
    
    const horas = await getDocs(coleccionHorasTurno);
    if (horas.empty) {
      await deleteDoc(fechaDocRef);
    } else if (fechaDoc.data().diaOcupado) {
      console.log("dia ocupado cambiando deleteturno");
      await updateDoc(fechaDocRef, { diaOcupado: false });
    }
    getTurnos();
  };

  const confirmDelete = (fechaTurno, horaTurno) => {
    Swal.fire({
      title: "Estas Seguro/a?",
      text: "No podes revertir esta Accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Deseo Borrarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTurno(fechaTurno, horaTurno);
        Swal.fire("Borrado!", "El turno ha sido Borrado.", "success");
      }
    });
  };
  return (
    <>
      <Link
        to={`/editarTurno/${fechaTurno}/${horaTurno}`}
        className="boton_editar btn btn-primary"
      >
        <i className="fa-solid fa-pencil"></i>
      </Link>
      <button
        onClick={() => {
          confirmDelete(fechaTurno, horaTurno);
        }}
        className="boton_borrar btn btn-danger"
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </>
  );
};

const Turnos = () => {
  const [loading, setLoading] = useState(true);

    //La base utiliza el formato YYYY-MM-DD para las fechas, y el formato "hh:mm" para la hora.
    const fechaActual = new FechaDia();
    
    const User = useContext(AuthContext);
    const currentUser = User.currentUser;
    const isAdmin = currentUser?.email === 'admin@gmail.com'

  const [turnos, setTurnos] = useState([]);

  const getTurnos = async () => {
    
        if (currentUser === null) {
          return;
        }

        const filtroFechaPosteriorAHoy = (doc) => {
            const docPath = doc.ref.path.split("/");
            const fechaDoc = new FechaDia(`${docPath[1]}T00:00:00.000-03:00`);
            
            
            return fechaActual.esAnteriorA(fechaDoc) || fechaDoc.getFecha()===fechaActual.getFecha();
        }

        const mapHoraDocATurnosArray = async (doc) => {
            const docPath = doc.ref.path.split("/");
            
            return { ...doc.data(), Hora: doc.id, Fecha: docPath[1]};
        }

        let q = null;
        // si es admin, trae TODOS los turnos. Si no, solo los del usuario
        
        if(isAdmin){
            //query utilizando como limite inferior la fecha actual, de esta manera trae solo los turnos futuros
            q = query(collectionGroup(db, 'TurnosDelDia'))          
        }else{
            //igual que arriba, pero se le añade otra condicion para que matchee el cliente logeado con sus turnos
            q = query(collectionGroup(db, 'TurnosDelDia'), where('ClienteID', '==', currentUser.uid));        
        }

        
        const data = await getDocs(q);
        if(!data.empty){
            const turnosArray = await Promise.all(
                data.docs.filter(
                    filtroFechaPosteriorAHoy
                ).map(
                    mapHoraDocATurnosArray
                ));
            
            setTurnos(turnosArray);
        }
        setLoading(false);
    }


  useEffect(() => {
    getTurnos();
  }, [currentUser]);


  if (loading) {
    return (
      <div className="loader_container">
        <FadeLoader />
      </div>
    );
  }

  //renderizado condicional para el caso de que no existan turnos
  if (!loading && turnos.length === 0) {
    return (
      <div className="container_turnos">
        <h1 className="titulo_pagina">Turnos</h1>
        <h3>No se registran turnos.</h3>
        <Link to={"/agendarTurno"}>
          <button className="boton">Agendar Turno</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container_turnos container">
      <h1 className="titulo_pagina">Turnos</h1>
      <Table striped>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Horario</th>
            <th>Cliente</th>
            {isAdmin ? <th></th> : <></>}
          </tr>
        </thead>

        <tbody>
          {turnos.map((turno) => {
            const fechaTurno = parsearFecha(turno.Fecha);
            const horaTurno = turno.Hora;
            return (
              <tr key={`${fechaTurno}-${horaTurno}`}>
                <td className="align-middle">{fechaTurno}</td>
                <td className="align-middle">{horaTurno}</td>
                <td className="align-middle">{turno.ClienteNombre}</td>
                {isAdmin ? (
                  <td className="align-middle">
                    <ControlesAdmin
                      fechaTurno={turno.Fecha}
                      horaTurno={turno.Hora}
                      getTurnos={getTurnos}
                    ></ControlesAdmin>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Link to={"/agendarTurno"}>
        <button className="boton">Agendar Turno</button>
      </Link>
    </div>
  );
};
export default Turnos;
