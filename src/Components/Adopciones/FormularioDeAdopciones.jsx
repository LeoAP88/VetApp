import { Link } from "react-router-dom";
import "./FormularioDeAdopciones.css"

const FormularioDeAdopciones = () => {
    return (
        <>
            <h1 className="form_titulo">Formulario de adopción</h1>
            <div className="container_form">
                <form className="adopcion_form" action="mailto:veterinaria@gmail.com" method='POST'>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre y apellido</label>
                        <input type="text" className="form-control" name='nombre' id="nombre" placeholder="Nombre..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name='email' id="email" placeholder="Email..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tel">Teléfono</label>
                        <input type="number" className="form-control" name='tel' id="tel" placeholder="Tel..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Dirección</label>
                        <div>
                            <input type="text" className="form-control" name='dir' id="dir" placeholder="..." />
                            <span>Calle</span>
                        </div>
                        <div>
                            <input type="text" className="form-control" name='dir' id="dir" placeholder="..." />
                            <span>Altura</span>
                        </div>
                        <div>
                            <input type="text" className="form-control" name='dir' id="dir" placeholder="..." />
                            <span>Código Postal</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Situacion laboral</label>
                        <input type="text" className="form-control" name='' id="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Actualmente tiene mascotas?</label>
                        <input type="text" className="form-control" name='' id="" placeholder="Si/No" />
                        <div>
                            <label htmlFor="nombre">Cuantas?</label>
                            <input type="text" className="form-control" name='' id="" placeholder="" />
                        </div>
                        <div>
                            <label htmlFor="nombre">Especie/s de la mascota</label>
                            <input type="text" className="form-control" name='' id="" placeholder="Perro/Gato" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="volver">Enviar</button>
                        <Link to={"/adopciones"}>
                            <button className="volver">Volver</button>
                        </Link>
                    </div>

                </form>


            </div>
        </>
    )
}
export default FormularioDeAdopciones;