import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, updateDoc, doc, getDocs, setDoc, deleteDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase"
import { AuthContext } from "../AuthProvider";

/*
    Estructura de la base de turnos
    
Turnos  (col)-
             "ISOString fechadeturno"  (doc)-
                                            | - TurnosDelDia (col)- 
                                            |                      |- 08:00(doc): ClienteID(string), ClienteNombre(string)
                                            |                      |- 08:30(doc)
                                            |                      |- 10:30(doc)
                                            |                          ...
                                            |                                
                                             -   diaocupado(bool)

*/

/*revisar update e initNuevaFechaDocRef - fechas deberian estar siempre con T00:00:00.000*/

const horasDisponibles = [  "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30",
"13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30",
"18:00","18:30"               
];

const deFechaInputAISOString = fecha => {
    console.log((new Date(fecha)).toISOString())
    return (new Date(fecha)).toISOString();
}
//funciones para converir fecha tradicional (input) a ISOString (formato utilizado en la base) y viceversa.
const deISOStringAFechaInput = ISOString => {
    const date = new Date(ISOString);
    const mes = (date.getMonth()+1).toString();
    return `${date.getFullYear()}-${mes.length<2?"0"+mes:mes}-${date.getDate()}`;
}

const SelecccionarHora = ({horasDisponibles, className, horaSelec, setHoraSelec, name, id}) => {
    
    const changeHora = (e) => {
        setHoraSelec(e.target.value);
    }
    console.log(horaSelec)
    return(<select name={name} id={id} className={className} onChange={changeHora} value={horaSelec}>
        {horasDisponibles.map(
            (hora) => {
                return(
                    <option key={hora} value={hora}>{hora}</option>
                );
            }
        )}
    </select>);
}

const EditarTurno = () => {
    const User = useContext(AuthContext);
    const isAdmin = User?.currentUser?.email === "admin@gmail.com";

    const [datosForm, setDatosForm] = useState({
                                                    fecha: "",
                                                    hora: "",
                                                    ClienteID: "",
                                                    ClienteNombre: ""
                                                    }); // <-- para meter todos los states aca
    

    const { fechaTurno, horaTurno } = useParams();

    const navigate = useNavigate();

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
        const nuevaFecha = deFechaInputAISOString(datosForm.fecha);

        const nuevaFechaDocRef = doc(db,`/Turnos/${nuevaFecha}`);
        const nuevaFechaDoc = await getDoc(nuevaFechaDocRef);
        if(!nuevaFechaDoc.exists()){
            await setDoc(nuevaFechaDocRef,{diaOcupado: false});
        }
        return nuevaFechaDocRef;
    }

    const update = async (e) => {
        e.preventDefault();
        const nuevaFechaDocRef = await initNuevaFechaDocRef();
        console.log()
        
        if((await getDoc(nuevaFechaDocRef)).data().diaOcupado && (deFechaInputAISOString(datosForm.fecha)!==fechaTurno)){
            console.error("Error! Dia completo!")
            return;
        }

        console.log("upss")
        return;
        await deleteTurno();

        
        const nuevaHoraDocRef = doc(db,`Turnos/${datosForm.fecha}/TurnosDelDia/${datosForm.hora}`);
        const nuevaFechaTurnosCol = collection(db,`Turnos/${datosForm.fecha}/TurnosDelDia`);
        
        await setDoc(nuevaHoraDocRef,{
            ClienteID: datosForm.ClienteID,
            ClienteNombre: datosForm.ClienteNombre
        });

        if((await getDocs(nuevaFechaTurnosCol)).size===22){
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

          nuevoDatosForm.fecha = deISOStringAFechaInput(fechaDoc.id);
          nuevoDatosForm.hora = (horaDoc.id);
          nuevoDatosForm.ClienteID = horaDoc.data().ClienteID;
          nuevoDatosForm.ClienteNombre = horaDoc.data().ClienteNombre;

          setDatosForm(nuevoDatosForm);

        } else {
          console.log("El archivo no existe");
        }
    }
    
    useEffect(() => {
      getTurno();
    }, []);

    if(!isAdmin){
        return(
            <div className="container">
                <h1>Acceso Denegado</h1>
            </div>
        );
    }


    return(
        <div className="container d-flex flex-column align-items-center mt-4">
            <h1>Editar Turno</h1>
            <form action="" method='POST'>
                <div className="form-group">
                    <label htmlFor="fecha">Fecha</label>
                    <input value={datosForm.fecha} className="form-control" type="date" name="fecha" id="fecha" required onChange={(e) => setDatosForm({...datosForm, fecha: e.target.value})}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="hora">Hora</label>
                    <SelecccionarHora horaSelec={datosForm.hora} setHoraSelec={(h)=>setDatosForm({...datosForm,hora:h})} horasDisponibles={horasDisponibles} name="hora" id="hora" className="form-control"/>
                </div>
                <div className="form-group">
                    
                    <label htmlFor="clienteNombre">Nombre Cliente</label>
                    <input value={datosForm.ClienteNombre} className="form-control" type="text" name="clienteNombre" id="clienteNombre" required onChange={(e) => setDatosForm({...datosForm, clienteNombre: e.target.value})}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="clienteID">ID Cliente: {datosForm.ClienteID}</label>
                </div>
                <button className="btn" type="submit" onClick={update}>Guardar cambios</button>
                <Link to={`/turnos`}>
                    <button className="btn">Volver</button>
                </Link>
            </form>
        </div>
    )
}

export default EditarTurno;