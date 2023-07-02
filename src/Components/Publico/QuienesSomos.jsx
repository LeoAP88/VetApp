import { Card, Carousel } from 'react-bootstrap';
import "./QuienesSomos.css"





const QuienesSomos = () => {

    return(
      <div id='quienes-somos-container'>
        <div>
            <Carousel 
            id="carousel-quienes-somos" 
            variant="dark"
            interval={5000}
            >
              <Carousel.Item>
                <img
                  className="img-fluid oscurecer"
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
                      consultas en un solo lugar
                    </p> 
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            
              <Carousel.Item>
                <img
                  className="img-fluid oscurecer"
                  src="./src/assets/img/2.jpeg"
                  alt="Responsive image"
                />

                <Carousel.Caption>
                  <div className="pa">
                    <p>
                      Contamos con profesionales calificados y<br /> equipamiento.
                      Sabemos que la tecnología
                      <br />
                      es fundamental para el crecimiento de <br />
                      las instituciones médicas y es una de <br />
                      nuestras fortalezas.
                    </p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
      
              <Carousel.Item>
                <img
                  className="img-fluid oscurecer"
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

          <h3 className="esp">
            <img src="/logoBlanco.jpg" alt="Responsive image" className="logoBlanco"/>
            Nuestro equipo
          </h3>
      
          <div className="row row-cols-1 row-cols-md-2 g-4">

            <div className="col">
            <Card>
              <Card.Img variant='top' src="./src/assets/img/5.jpeg"/>
              <Card.Body>
                <Card.Title>
                  Dra. Patricia Hernández y Dr. Nicolás Sáenz
                </Card.Title>
                <Card.Text>
                  Clínica Médica
                </Card.Text>
              </Card.Body>
            </Card>
            </div>

            <div className="col">
            <Card>
              <Card.Img variant='top' src="./src/assets/img/4.jpeg"/>
              <Card.Body>
                <Card.Title>
                  Dra. Carla Sevilla
                </Card.Title>
                <Card.Text>
                  Especialista en Nutrición.
                </Card.Text>
              </Card.Body>
            </Card>
            </div>

            <div className="col">
            <Card>
              <Card.Img variant='top' src="./src/assets/img/dx2.jpg"/>
              <Card.Body>
                <Card.Title>
                  Dr. Carlos Spina
                </Card.Title>
                <Card.Text>
                  Traumatología y Diagnóstico por Imagénes.
                </Card.Text>
              </Card.Body>
            </Card>
            </div>

            <div className="col">
            <Card>
              <Card.Img variant='top' src="./src/assets/img/RV.jpg"/>
              <Card.Body>
                <Card.Title>
                  Dra. Andrea Diaz y Dr. Juan Goncalves
                </Card.Title>
                <Card.Text>
                  Cirugia General
                </Card.Text>
              </Card.Body>
            </Card>
            </div>

          </div>
        </div>
      </div>   
    )
  
}



export default QuienesSomos;


