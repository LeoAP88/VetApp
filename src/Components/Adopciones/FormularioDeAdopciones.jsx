import { Link } from "react-router-dom";
import "./FormularioDeAdopciones.css"

const FormularioDeAdopciones = () => {
    return (
        <div id="wrapper_componente_form_adopciones">
            <h1>Formulario de adopción</h1>
            <div id="contenedor_formulario_adopciones">
                <form id="adopcion_form" action="mailto:veterinariaAdopciones@gmail.com" method='POST'>
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
                        <label htmlFor="nombre">¿Actualmente tiene mascotas?</label>
                        <input type="text" className="form-control" name='' id="" placeholder="Si/No" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">¿Cuantas mascotas?</label>
                        <input type="text" className="form-control" name='' id="" placeholder="" />
                    </div>
                    <div className="form-group">
                    <label htmlFor="nombre">Especie/s de la mascota</label>
                            <input type="text" className="form-control" name='' id="" placeholder="Perro/Gato" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">¿Tiene patio?</label>
                        <input type="text" className="form-control" name='' id="" placeholder="Si/No" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">En caso afirmativo, ¿Está cercado?</label>
                        <input type="text" className="form-control" name='' id="" placeholder="Si/No" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">En caso de mudanza, ¿Qué sucederá con su mascota?</label>
                        <input type="text" className="form-control" name='' id="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">¿Hay niños en la casa?</label>
                        <input type="text" className="form-control" name='' placeholder="Si/No" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">¿Los miembros de su familia estan de acuerdo con la adopción?</label>
                        <input type="text" className="form-control" name='' placeholder="Si/No" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">¿Qué tipo de personalidad busca en su mascota?</label>
                        <input type="text" className="form-control" name='' id="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">¿Qué haría en el caso de "mal comportamiento"?</label>
                        <input type="text" className="form-control" name='' id="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">¿Esta de acuerdo que se le haga una visita previa a la adopción en su residencia?</label>
                        <input type="text" className="form-control" placeholder="Si/No" />
                    </div>
                    <div>
                        <button type="submit" className="volver">Enviar</button>
                        <Link to={"/adopciones"}>
                            <button className="volver">Volver</button>
                        </Link>
                    </div>

                </form>


            </div>
        </div>
    )
}
export default FormularioDeAdopciones;