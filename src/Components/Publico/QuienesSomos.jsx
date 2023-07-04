import { Card, Carousel } from 'react-bootstrap';
import "./QuienesSomos.css"



const QuienesSomos = () => {


  return (
    <div>
      <div>
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              className="img-fluid"
              src="./src/assets/img/1.jpeg"
              alt="Responsive image"
            />
            <Carousel.Caption>

              <div className="txt">
                <h1>Somos Huellitas</h1>
                <p>
                  Un centro médico de atención integral para mascotas.
                  <br /> Desde el año 2019 ofrecemos el servicio de <br />
                  "Historia Clínica Digital"
                  <br />
                  para que puedas tener un registro de todas <br /> las
                  consultas en un solo lugar.
                </p>
              </div>


            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-fluid"
              src="./src/assets/img/2.jpeg"
              alt="Responsive image"
            />

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
            <img
              className="img-fluid"
              src="./src/assets/img/vetdog.jpg"
              alt="Responsive image"
            />
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

        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div class="col">
            <div class="card">
              <img src="./src/assets/img/5.jpeg" class="card-img-top" alt="Responsive image" />
              <div class="card-body">

                <h5 class="card-title"> Dra. Patricia Hernández y Dr. Nicolás Sáenz</h5>
                <p class="card-text">Clínica Médica</p>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card">
              <img src="./src/assets/img/4.jpeg" class="card-img-top" alt="Responsive image" />
              <div class="card-body">
                <h5 class="card-title">Dra. Carla Sevilla</h5>
                <p class="card-text">Especialista en Nutrición.</p>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card">
              <img src="./src/assets/img/dx2.jpg" class="card-img-top" alt="Responsive image" />
              <div class="card-body">
                <h5 class="card-title">Dr. Carlos Spina</h5>
                <p class="card-text">Traumatología y Diagnóstico por Imagénes.</p>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card">
              <img src="./src/assets/img/RV.jpg" class="card-img-top" alt="Responsive image" />
              <div class="card-body">
                <h5 class="card-title"> Dra. Andrea Diaz y Dr. Juan Goncalves</h5>
                <p class="card-text">Cirugia General</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  )

}


export default QuienesSomos;





