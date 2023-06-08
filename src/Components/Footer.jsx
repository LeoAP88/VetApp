import './Footer.css'

const Footer = () => {
    return(
        <>
       
        <div id="footer">
            <div className="huellitasFooter">
                <div><img src="../logoNegro.jpg" alt="" className="logoBlanco"/></div>
                <div>huellitas</div>
            </div>
            <div className='text'>Av. Siempreviva 153, CABA<br />(011) 5050-5050 <br />huellitas@mail.com <br /> © 2023 VeterinariaX - Todos los derechos reservados.</div> 
        </div>

        {/* <div>Seguinos en redes!</div> */}
        </>
    );
}

export default Footer;