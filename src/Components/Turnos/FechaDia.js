const IntADosCifrasStr = n => {
    n = Math.abs(n);
    n = n.toString();
    return n.length<2?"0"+n:n;
}

const dateStringAFecha = (dia, mes, anio) => `${anio}-${IntADosCifrasStr(mes)}-${IntADosCifrasStr(dia)}`;


class FechaDia extends Date{

    fecha;

    constructor(date=new Date()){   
        super(date);
        this.fecha = this.getFecha();
    }
   
    getDiaDelMes = () => IntADosCifrasStr(this.getDate())

    getMes = () => IntADosCifrasStr(this.getMonth()+1)

    getFecha = () => dateStringAFecha(this.getDiaDelMes(), this.getMes(), this.getFullYear())

    esAnteriorA = (fechaDia) => {
        const esAnioAnterior = this.getFullYear()<fechaDia.getFullYear();
        const esMesAnterior = this.getMonth() < fechaDia.getMonth();
        const esMismoMes = this.getMonth() === fechaDia.getMonth();
        const esMismoAnio = this.getFullYear() === fechaDia.getFullYear();
        const esDiaAnterior = this.getDate()<fechaDia.getDate();
        
        return   esAnioAnterior || ( esMismoAnio && esMesAnterior ) || (esMismoAnio && esMismoMes && esDiaAnterior);
    }

    getDiaHabilMasCercano = () => {
        if(this.getDay()!==0){
            return this;
        }

        const diaAnt = new FechaDia(this);
        diaAnt.setDate(diaAnt.getDate()-1);

        const diaPost = new FechaDia(this);
        diaPost.setDate(diaPost.getDate()+1);

        return diaAnt.getMonth()===this.getMonth()?diaAnt:diaPost;
    }

    static fechaAMDAISOStringArg = (anio, mes, dia) => `${anio}-${IntADosCifrasStr(mes)}-${IntADosCifrasStr(dia)}T00:00:00.000-03:00`;

}


export default FechaDia;