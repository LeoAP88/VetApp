import "./Consultas.css";

const Consultas = () =>{
    return(
        <>
        <div>Consultas</div>
        <div id="consultas_form">
            <form action="mailto:veterinaria@gmai.com" method='POST'> 
                <h3>¿Tenés dudas o inquitudes? ¡Escribinos!</h3>
                <h2>Tu consulta no molesta</h2>
                <div className="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" className="form-control" name='nombre' id="nombre" placeholder="nombre..."/>
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" className="form-control" name='email' id="email" placeholder="email..."/>
                </div>
                <div className="form-group">
                    <label for="exampleTextarea">Mensaje</label>
                    <textarea className="form-control" name='mensaje' id="mensaje" rows="3" placeholder="Escribe aquí" maxLength={200}></textarea>
                </div>
                <button className="btn btn-primary" type="submit">Enviar</button>
            </form>
        </div>
        </>
    )
}
export default Consultas;