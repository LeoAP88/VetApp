import "./Consultas.css";
import { BsInstagram, BsFacebook } from 'react-icons/all';

const Consultas = () => {
    return (
        <>
            <h1>¿Tenés alguna duda?</h1>
            <p className="texto-consultas">Comunicate con nosotros por consultas o presupuestos y te responderemos a la brevedad.</p>

            <section className="section_consultas">
                <div className="container_redes">
                    <div className="container_texto_redes">
                        <p className="texto_redes">Seguinos en nuestras redes</p>
                    </div>
                    <div className="container_iconos_redes">
                        <a href="https://www.instagram.com/" target="_blank" className="icono_redes"><BsInstagram /></a>
                        <a href="https://es-la.facebook.com/" target="_blank" className="icono_redes"><BsFacebook /></a>
                    </div>
                </div>

                <div className="form_container">
                    <form className="consultas_form" action="mailto:veterinaria@gmail.com" method='POST'>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre y apellido</label>
                            <input type="text" className="form-control" name='nombre' id="nombre" placeholder="Nombre..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name='email' id="email" placeholder="Email..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleTextarea">Mensaje</label>
                            <textarea className="form-control" name='mensaje' id="mensaje" rows="3" placeholder="Deja tu mensaje aquí" maxLength={200}></textarea>
                        </div>
                        <button className="btn-consulta" type="submit">Enviar</button>
                    </form>
                </div>
            </section>
        </>
    )
}
export default Consultas;