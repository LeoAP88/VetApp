import {Link} from "react-router-dom";
import FormularioDeAdopciones from "./FormularioDeAdopciones"

const Adopciones=() =>{
    return(
        <>
        <div>Adopciones</div>
        <Link to={"/adopciones/formulario"}>
        <div>
            <button type="button">Formulario de Adopción</button>
        </div>
        </Link>
        </>
    )
}
export default Adopciones;