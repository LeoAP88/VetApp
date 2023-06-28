import { db } from "../firebaseConfig/firebase";
import { getDocs, collection } from "firebase/firestore";
import FechaDia from "./FechaDia";

const horasDisponiblesParaTurno = (horasOcupadas) => {
    //array con total de turnos para seleccionar
    const horasTotales = [  "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30",
                            "13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30",
                            "18:00","18:30"               
                        ];
    const conjuntoHorasOcupadas = new Set(horasOcupadas); // creamos conjunto con Set
    
    //conseguimos las horas disponibles para seleccionar, segun los turnos ocupados
    const horasDisponibles = horasTotales.filter(hora => !conjuntoHorasOcupadas.has(hora)); //filtramos el array segun los elementos que NO estan en el conjunto
    
    return horasDisponibles;
}

const getHorasReservadas = async (dia) => {

    const diaTurno = dia.getFecha();

    const turnosDelDia = await getDocs(collection(db,`Turnos/${diaTurno}/TurnosDelDia`));
    
    return !turnosDelDia.empty ? turnosDelDia.docs.map(doc=>doc.id) : [];
    
}

export {horasDisponiblesParaTurno, getHorasReservadas}