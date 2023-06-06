import "./Inicio.css";

import {
  IoCalendarSharp,
  CgLogIn,
  MdAppRegistration,
  AiFillQuestionCircle,
  MdPets,
  GiFlexibleLamp,
  ImEye,
  TbDog,
} from "react-icons/all";
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <>
    <div className="img"> 
      <div className="img_text">
        <h1>Cuidamos a tu mascota</h1>
        <p>Somos una clínica veterinaria integral, pioneros en la <br /> atención especilizada para tus mascotas. Agendá ahora <br /> tu consulta.</p>
        <button>Agendar consulta</button>
      </div>
      
    </div>
        
      
    </>
  );
};
export default Inicio;
