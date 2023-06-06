import "./Consultas.css";

const Consultas = () => {
    return (
        <>
            <div className="form_container">
                <form className="consultas_form" action="mailto:veterinaria@gmail.com" method='POST'>
                    <h1>Consultas</h1>
                    <h2>¿Tenés dudas o inquitudes? ¡Escribinos!</h2>
                    <h2>Tu consulta no molesta</h2>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" className="form-control" name='nombre' id="nombre" placeholder="Nombre..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name='email' id="email" placeholder="Email..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTextarea">Mensaje</label>
                        <textarea className="form-control" name='mensaje' id="mensaje" rows="3" placeholder="Escribe aquí" maxLength={200}></textarea>
                    </div>
                    <button className="btn-consulta" type="submit">Enviar</button>
                </form>
            </div>
        </>
    )
}
export default Consultas;