import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, updateDoc, doc, getDocs, setDoc, deleteDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase"
import { AuthContext } from "../firebaseConfig/AuthProvider"
import SelecccionarHora from "./SeleccionarHora";
import { horasDisponiblesParaTurno, getHorasReservadas } from "./utilidadesTurnos";
import FechaDia from "./FechaDia";
import "./EditarTurno.css"
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


const EditarTurno = () => {
    const User = useContext(AuthContext);
    const isAdmin = User?.currentUser?.email === "admin@gmail.com";

    const [datosForm, setDatosForm] = useState({
                                                    fecha: "",
                                                    hora: "",
                                                    ClienteID: "",
                                                    ClienteNombre: "",
                                                    horasOcupadas:[]
                                                    }); // <-- para meter todos los states aca
    

    const { fechaTurno, horaTurno } = useParams();

    const navigate = useNavigate();

    const horasDisponibles = () => {
        let horasDisp = horasDisponiblesParaTurno(datosForm.horasOcupadas);;
        if(datosForm.fecha === fechaTurno){
            horasDisp = [horaTurno,...horasDisp];
        }
        return horasDisp;
    }

    const deleteTurno = async ()=>{

        const fechaDocRef = doc(db, `/Turnos/${fechaTurno}`);
        const fechaDoc = await getDoc(fechaDocRef);

        const coleccionHorasTurno = collection(db,`/Turnos/${fechaTurno}/TurnosDelDia`);

        const horaDocRef = doc(db, `/Turnos/${fechaTurno}/TurnosDelDia/${horaTurno}`);

        await deleteDoc(horaDocRef);
        
        const horas = await getDocs(coleccionHorasTurno);
        if(horas.empty){
            await deleteDoc(fechaDocRef);
        }else if(fechaDoc.data().diaOcupado){
            await updateDoc(fechaDocRef,{diaOcupado:false});
        }

    }

    const initNuevaFechaDocRef = async () => {
        const nuevaFecha = datosForm.fecha;

        const nuevaFechaDocRef = doc(db,"Turnos",`${nuevaFecha}`);
        const nuevaFechaDoc = await getDoc(nuevaFechaDocRef);
        if(!nuevaFechaDoc.exists()){
            await setDoc(nuevaFechaDocRef,{diaOcupado: false});
        }
        return nuevaFechaDocRef;
    }

    const update = async (e) => {
        e.preventDefault();

        const sinCambios = (datosForm.fecha === fechaTurno) && (datosForm.hora === horaTurno);

        const nuevaFechaDocRef = await initNuevaFechaDocRef();
        
        
        if((await getDoc(nuevaFechaDocRef)).data().diaOcupado && (datosForm.fecha!==fechaTurno)){
            console.error("Error! Dia completo!");
            return;
        }

        
        if(!sinCambios){
            await deleteTurno();
        }

        
        const nuevaHoraDocRef = doc(db,`Turnos/${datosForm.fecha}/TurnosDelDia`,`${datosForm.hora}`);
        const nuevaFechaTurnosCol = collection(db,`Turnos/${datosForm.fecha}/TurnosDelDia`);
        
        await setDoc(nuevaHoraDocRef,{
            ClienteID: datosForm.ClienteID,
            ClienteNombre: datosForm.ClienteNombre
        });

        if((await getDocs(nuevaFechaTurnosCol)).size===22 && !sinCambios){
            await updateDoc(nuevaFechaDocRef, {
                diaOcupado: true
            });
        }
        
        navigate(`/turnos`);
    };
    
    const getTurno = async () => {
    
        const fechaDoc = await getDoc(doc(db, `/Turnos/${fechaTurno}`));
        const horaDoc = await getDoc(doc(db, `/Turnos/${fechaTurno}/TurnosDelDia/${horaTurno}`));
        if (fechaDoc.exists() && horaDoc.exists()) {

          let nuevoDatosForm = {...datosForm};

          nuevoDatosForm.fecha = fechaDoc.id;
          nuevoDatosForm.hora = horaDoc.id;
          nuevoDatosForm.ClienteID = horaDoc.data().ClienteID;
          nuevoDatosForm.ClienteNombre = horaDoc.data().ClienteNombre;
          const diaDoc = new FechaDia(FechaDia.fechaAMDAISOStringArg(...fechaDoc.id.split("-")));
          nuevoDatosForm.horasOcupadas = await getHorasReservadas(diaDoc);

          setDatosForm(nuevoDatosForm);

        } else {
          console.log("El archivo no existe");
        }
    }

    const cambioFecha = async e =>  {
        const fecha = e.target.value;
        
        const diaSelec = new FechaDia(FechaDia.fechaAMDAISOStringArg(...fecha.split("-")))
        const horasOcupadas = await getHorasReservadas(diaSelec);
        
        setDatosForm({...datosForm,hora: horasDisponiblesParaTurno(horasOcupadas)[0], fecha: fecha, horasOcupadas:horasOcupadas})
    }

    useEffect( ()=>{
        getTurno();
    } , []);


    if(!isAdmin){
        return(
            <div className="container">
                <h1>Acceso Denegado</h1>
            </div>
        );
    }


    return(
        <div className="container_editarTurno d-flex flex-column align-items-center mt-4">
            <h1>Editar Turno</h1>
            <form action="" method='POST'>
                <div className="form-group">
                    <label htmlFor="fecha">Fecha</label>
                    <input value={datosForm.fecha} className="form-control" type="date" name="fecha" id="fecha" onChange={cambioFecha}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="hora">Hora</label>
                    <SelecccionarHora horaSelec={datosForm.hora} setHoraSelec={(h)=>setDatosForm({...datosForm,hora:h})} horasDisponibles={horasDisponibles()} name="hora" id="hora" className="form-control"/>
                </div>
                <div className="form-group">
                    
                    <label htmlFor="clienteNombre">Nombre Cliente</label>
                    <input value={datosForm.ClienteNombre} className="form-control" type="text" name="clienteNombre" id="clienteNombre" required onChange={(e) => setDatosForm({...datosForm, clienteNombre: e.target.value})}></input>
                </div>
                <Link to={`/turnos`}>
                    <button className="volver btn" type="submit" onClick={update}>Guardar cambios</button>
                    <button className="volver btn">Volver</button>
                </Link>
            </form>
        </div>
    )
}

export default EditarTurno;