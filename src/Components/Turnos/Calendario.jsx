import { useState } from "react";
import "./Calendario.css"

const MESES = ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const esBisiesto = year => ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

const IntADosCifrasStr = n => {
    n = Math.abs(n);
    n = n.toString();
    return n.length<2?"0"+n:n;
}

const construirMes = (mes,anio) => {
    const cantDiasMeses=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(esBisiesto(anio)){
        cantDiasMeses[1] = 29;
    }
    let arrayDates = [[]];
    const diasMes = cantDiasMeses[mes-1];
    
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

    let primerDiaMes = arrayDates[0][0].getDay();
    let ultDiaMes = arrayDates.at(-1).at(-1).getDay();
    let anioMesAnt = mes==0?anio-1:anio;
    let anioMesPost = mes==11?anio+1:anio;
    
    if( primerDiaMes != 0 ||  ultDiaMes != 6 ){
        let diaMesAnt = cantDiasMeses.at(mes-2);
        for(let i = 0; i<primerDiaMes; i++){
            let dateStr = `${anioMesAnt}-${IntADosCifrasStr((mes-1)||12)}-${IntADosCifrasStr(diaMesAnt)}T00:00:00.000-03:00`;
            arrayDates[0].unshift(new Date(dateStr));
            diaMesAnt--;
        }
        let diaMesSiguiente = 1;
        for(let i = 6; i>ultDiaMes; i--){
            let dateStr = `${anioMesPost}-${IntADosCifrasStr((mes+1)%12||1)}-${    IntADosCifrasStr(diaMesSiguiente)}T00:00:00.000-03:00`;
            arrayDates.at(-1).push(new Date(dateStr));
            diaMesSiguiente++;
        }
        
    }
    
    return arrayDates;
}

const DiaCalendario = ({deshabilitado,onClick,activo,otroMes,dia,children}) => {
    const onClickOverride = (e) => {
        if(deshabilitado)
            return;
        
        onClick(e,dia)
    }
    return(
    <td className={`${deshabilitado?"deshabilitado":""} ${activo?"activo":""} ${otroMes?"otro-mes":""} dia-calendario`} onClick={onClickOverride}>{children}</td>
    );
}

const Calendario = ({diasInhabilitados=[],diaActivo,toggleDia}) => {

    const diasDelMes = construirMes(diaActivo.getMonth()+1,diaActivo.getFullYear());
    
    const clickDia = (e,diaClick)=>{
        const mes = diaClick.getMonth()+1;
        const dia = diaClick.getDate();
        const anio = diaClick.getFullYear()
        const dateStr = `${anio}-${IntADosCifrasStr(mes)}-${IntADosCifrasStr(dia)}T00:00:00.000-03:00`
        toggleDia(new Date(dateStr));
    }

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
        <button className="me-auto" onClick={clickMesAnt}>{`<<`}</button>
        <h3><b>{`${MESES[diaActivo.getMonth()]} - ${diaActivo.getFullYear()}`}</b></h3>
        <button className="ms-auto" onClick={clickMesPost}>{`>>`}</button>
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
                (semana,index) => {
                return( 
                <tr key={index}>
                {semana.map((dia,index) => {
                    const isInh = diasInhabilitados.find(inh => inh === dia.getTime());
                    const isActivo = diaActivo.toLocaleDateString()===dia.toLocaleDateString();
                    const isOtroMes = diaActivo.getMonth()!==dia.getMonth();
                    return (<DiaCalendario key={index} onClick={clickDia} deshabilitado={isInh} activo={isActivo} otroMes={isOtroMes} dia={dia}>{dia.getDate()}</DiaCalendario>);
                })}
                </tr>);
            })}
        </tbody>
        </table>
        </div>
    );
}

export default Calendario;