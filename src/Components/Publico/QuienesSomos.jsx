import { Card, Carousel } from 'react-bootstrap';
import "./QuienesSomos.css"



const QuienesSomos = () => {


  return (
    <div className='container'>
      <div>
        <Carousel variant="dark">
          <Carousel.Item>
            <div className="oscurecer">
              <img
                className="img-fluid"
                src="./1.jpeg"
                alt="Responsive image"
              /></div>
            <Carousel.Caption>

              <div className="txt">
                <h1>Somos Huellitas</h1>
                <p>
                  Un centro médico de atención integral para mascotas.
                  <br /> Desde el año 2019 ofrecemos el servicio de <br />
                  "Historia Clínica Digital" para que puedas tener <br />
                  un registro de todas  las consultas en un solo lugar.<br />
                </p>
              </div>


            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="oscurecer">
              <img
                className="img-fluid"
                src="./2.jpeg"
                alt="Responsive image"
              /></div>

            <Carousel.Caption>
              <div className="pa">
                <p>
                  Contamos con profesionales calificados y<br /> equipamiento.
                  Sabemos que la tecnología
                  <br />
                  es fundamental para el crecimiento de las<br />
                  instituciones médicas y es una de nuestras<br />
                  fortalezas.
                </p>
              </div>

            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <div className="oscurecer">
              <img
                className="img-fluid"
                src="./vetdog.jpg"
                alt="Responsive image"
              /></div>
            <Carousel.Caption>
              <div className="txt2">
                <h2>Nuestras especialidades son:</h2>
                <h4>Clínica Médica / Nutrición / Cirugía General</h4>
                <h4>Diagnóstico por imágenes / Laboratorio </h4>
                <h4>Oncologia / Vacunación</h4>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div>
        <h3 className="esp"><img src="./logoBlanco.jpg"
          alt="Responsive image" className="logoBlanco" /> Nuestro equipo </h3>

        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            <div className="card">
              <img src="./5.jpeg" class="card-img-top" alt="Responsive image" />
              <div className="card-body">

                <h5 className="card-title"> Dra. Patricia Hernández y Dr. Nicolás Sáenz</h5>
                <p className="card-text">Clínica Médica</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <img src="./4.jpeg" class="card-img-top" alt="Responsive image" />
              <div className="card-body">
                <h5 className="card-title">Dra. Carla Sevilla</h5>
                <p className="card-text">Especialista en Nutrición.</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <img src="./dx2.jpg" class="card-img-top" alt="Responsive image" />
              <div className="card-body">
                <h5 className="card-title">Dr. Carlos Spina</h5>
                <p className="card-text">Traumatología y Diagnóstico por Imagénes.</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <img src="./RV.jpg" class="card-img-top" alt="Responsive image" />
              <div className="card-body">
                <h5 className="card-title"> Dra. Andrea Diaz y Dr. Juan Goncalves</h5>
                <p className="card-text">Cirugia General</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  )

}



export default QuienesSomos;


