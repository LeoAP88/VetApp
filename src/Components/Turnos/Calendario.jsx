import { useState } from "react";
import "./Calendario.css"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

/* FALTA TERMINAR ESTILO*/

const MESES = ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const esBisiesto = year => ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

//convierte un numero (esperable 0-31) a str con dos cifras (nn o 0n)
const IntADosCifrasStr = n => {
    n = Math.abs(n);
    n = n.toString();
    return n.length<2?"0"+n:n;
}

//funcion que arma una matriz para el renderizado del calendario, toma como parametros el mes a visualizar (0-11) y el año (aaaa).
//la matriz tiene como filas las semanas, y como columnas los dias de la semana.
const construirMes = (mes,anio) => {
    const cantDiasMeses=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(esBisiesto(anio)){
        cantDiasMeses[1] = 29;
    }
    //matriz
    let arrayDates = [[]];
    const diasMes = cantDiasMeses[mes-1];
    
    //primero se construye el mes ingresado, con la primera y última semanas incompletas en casi todos los casos, debido al desfasaje.
    let semana = 0;
    for(let dia = 1; dia<=diasMes; dia++){
        let dateStr = `${anio}-${IntADosCifrasStr(mes)}-${IntADosCifrasStr(dia)}T00:00:00.000-03:00`;
        if(!arrayDates[semana])
            arrayDates[semana]=[];
        let date = new Date(dateStr);
        arrayDates[semana].push(date);
        if((date.getDay()+1)%7===0){
            semana++;
        }
    }

    //ahora rellenamos las semanas incompletas con los dias de los meses anterior y posterior faltantes

    //extraemos los dias de la semana (Lu-Dom) correspondientes al primer y ultimo dia del mes
    let primerDiaMes = arrayDates[0][0].getDay();
    let ultDiaMes = arrayDates.at(-1).at(-1).getDay();

    //para los casos borde de Enero y Dic
    let anioMesAnt = mes==0?anio-1:anio;
    let anioMesPost = mes==11?anio+1:anio;
    
    if( primerDiaMes != 0 ||  ultDiaMes != 6 ){

        //para n dias faltantes de la primer semana del mes, relleno con dias del mes anterior
        let diaMesAnt = cantDiasMeses.at(mes-2);
        for(let i = 0; i<primerDiaMes; i++){
            let dateStr = `${anioMesAnt}-${IntADosCifrasStr((mes-1)||12)}-${IntADosCifrasStr(diaMesAnt)}T00:00:00.000-03:00`;
            arrayDates[0].unshift(new Date(dateStr));
            diaMesAnt--;
        }

        //misma idea que arriba pero a la inversa
        let diaMesSiguiente = 1;
        for(let i = 6; i>ultDiaMes; i--){
            let dateStr = `${anioMesPost}-${IntADosCifrasStr((mes+1)%12||1)}-${    IntADosCifrasStr(diaMesSiguiente)}T00:00:00.000-03:00`;
            arrayDates.at(-1).push(new Date(dateStr));
            diaMesSiguiente++;
        }
        
    }
    
    return arrayDates;
}

//componente representando un dia del calendario, separado de Calendario para descomprimir
const DiaCalendario = ({onClick,dia,children, propsEstilo}) => {

    //handler para elevar el objeto Date correspondiente al dia y manejar el deshabilitado
    const onClickOverride = (e) => {
        if(propsEstilo.deshabilitado)
            return;
        
        onClick(e,dia)
    }

    const clasesEstilo = `${propsEstilo.isInh?"table-danger":""} ${propsEstilo.activo?"table-primary":""} ${propsEstilo.otroMes?"table-secondary":""} ${propsEstilo.isAntAHoy?"table-warning":""} dia-calendario`
    
    return(
    <td className={clasesEstilo} onClick={onClickOverride}>{children}</td>
    );
}

//Componente Calendario. La prop diasInhabilitados le indica que dias estan sin turnos disponibles (falta terminar implementacion),
//diaActivo corresponde al dia que se encuentra seleccionado, y toggleDia es el handler del elemento padre para registrar la selección del día. 
const Calendario = ({diasInhabilitados=[],diaActivo,toggleDia}) => {

    const fechaHoyParsed = Date.parse(diaActivo);
    

    //conseguimos la matriz para el calendario
    const diasDelMes = construirMes(diaActivo.getMonth()+1,diaActivo.getFullYear());
    
    //handler que recibe el dia como Date al clickear un dia del calendario, y actualiza el dia seleccionado.
    const clickDia = (e,diaClick)=>{
        const mes = diaClick.getMonth()+1;
        const dia = diaClick.getDate();
        const anio = diaClick.getFullYear()
        const dateStr = `${anio}-${IntADosCifrasStr(mes)}-${IntADosCifrasStr(dia)}T00:00:00.000-03:00`
        toggleDia(new Date(dateStr));
    }

    //funciones clickMes para los botones de cambio de mes
    const clickMesAnt = () => {
        let mes = diaActivo.getMonth()+1;
        const dia = 1;
        let anio = diaActivo.getFullYear();
        if(mes==1){
            anio--;
        }
        const dateStr = `${anio}-${IntADosCifrasStr((mes-1)||12)}-${IntADosCifrasStr(dia)}T00:00:00.000-03:00`
        toggleDia(new Date(dateStr));
    }
    const clickMesPost = ()=>{
        let mes = diaActivo.getMonth()+1;
        const dia = 1;
        let anio = diaActivo.getFullYear();
        if(mes==12){
            anio++;
        }
        const dateStr = `${anio}-${IntADosCifrasStr((mes+1)%13||1)}-${IntADosCifrasStr(dia)}T00:00:00.000-03:00`
        toggleDia(new Date(dateStr));
    }

    return(
        <div>
        <div className="container d-flex flex-direction-row align-items-center justify-content-center">
        <button type="button" className="me-auto btn-calendario" onClick={clickMesAnt}><BsArrowLeft/></button>
        <h3><b>{`${MESES[diaActivo.getMonth()]} - ${diaActivo.getFullYear()}`}</b></h3>
        <button type="button" className="ms-auto btn-calendario" onClick={clickMesPost}><BsArrowRight/></button>
        </div>
        <table className="table table-sm table-bordered">
        <thead>
        <tr>
            <th scope="col">Lu</th>
            <th scope="col">Ma</th>
            <th scope="col">Mi</th>
            <th scope="col">Ju</th>
            <th scope="col">Vi</th>
            <th scope="col">Sa</th>
            <th scope="col">Do</th>
        </tr>
        </thead>
        <tbody>
            {diasDelMes.map(
                //por cada semana hay una tr, y por cada dia de la semana una td
                (semana,index) => {
                return( 
                <tr key={index}>
                {semana.map((dia,index) => {
                    const isInh = diasInhabilitados.find(inh => inh === dia.toISOString());
                    const isActivo = diaActivo.toLocaleDateString()===dia.toLocaleDateString();
                    const isOtroMes = diaActivo.getMonth()!==dia.getMonth();
                    const isAntAHoy = fechaHoyParsed>Date.parse(dia);

                    const propsEstilo = {isInh: isInh, anteriorAHoy: isAntAHoy, activo: isActivo, otroMes: isOtroMes}
                    return (<DiaCalendario key={index} onClick={clickDia} propsEstilo={propsEstilo} dia={dia}>{dia.getDate()}</DiaCalendario>);
                })}
                </tr>);
            })}
        </tbody>
        </table>
        </div>
    );
}

export default Calendario;