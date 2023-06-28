
const SelecccionarHora = ({horasDisponibles, className, horaSelec, setHoraSelec, name, id}) => {
    

    const changeHora = (e) => {
        setHoraSelec(e.target.value);
    }
    
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

export default SelecccionarHora;