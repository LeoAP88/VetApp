import "./Login.css"

const Login = () => {
    return(
        <div id="contenedor">

            <div id="contenedorcentrado">
                <div id="login">
                    <form id="loginform">
                        <label for="usuario">Usuario</label>
                        <input id="usuario" type="text" name="usuario" placeholder="Usuario" required></input>

                        <label for="password">Contraseña</label>
                        <input id="password" type="password" placeholder="Contraseña" name="password" required></input>

                        <button type="submit" title="Ingresar" name="Ingresar">Login</button>
                    </form>

                </div>
                <div id="derecho">
                    <div class="titulo">
                        Bienvenido
                    </div>
                    <hr></hr>
                    <div class="pie-form">
                        <a href="#">¿Perdiste tu contraseña?</a>
                        <a href="#">¿No tienes Cuenta? Registrate</a>
                        <a href="#">« Volver</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
