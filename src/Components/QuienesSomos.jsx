import {db} from "./firebaseConfig/firebase"
import {collection,getDocs, doc} from "firebase/firestore"
import React, { useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "./AuthProvider";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import Carousel from 'react-bootstrap/Carousel';
import "./QuienesSomos.css"



const QuienesSomos = () => {
    

    return(
      <div>
        <div>
      <Carousel>
      <Carousel.Item>
        <img
          className="img-fluid"
          src="1.jpeg"
          alt="First slide"
        />
        <Carousel.Caption>
          <div className="txt">
          <h1>Somos Huellitas</h1>
          <p>Un centro de atención médica para mascotas que inicia<br/> con el Dr. Carlos Spina en 2018, ofreciendo sus <br/>servicios en consulta y cirugía de pequeñas especies y<br/> bajo una visión futurista fue ampliando <br/>sus servicios al igual que su infraestructura y equipos.</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="img-fluid"
          src="2.jpeg"
          alt="Second slide"
        />

        <Carousel.Caption>
         <div className="pa">
          <p>Contamos con personal calificado, médicos<br/> veterinarios especialistas, además sabemos<br/> que la tecnología es parte fundamental del <br/>crecimiento de una institución médica es por<br/> eso que la misma es una de nuestras fortalezas.</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="img-fluid"
          src="vetdog.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <div className="txt2">
          <h3>Nuestras especialidades son:</h3>
           <ul>
            <li>Cirugía</li>
            <li>Diagnóstico por imágenes</li>
            <li>Medicina felina.</li>
            <li>Medicina canina.</li>
            <li>Oncología</li>
          </ul> 
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  
    </div>
    <h3 className="esp"><img src="../logoBlanco.jpg" alt="" className="logoBlanco"/> Nuestro equipo </h3>
    <div class="row row-cols-1 row-cols-md-2 g-4">
  <div class="col">
    <div class="card">
      <img src="4.jpeg" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Dra. Carla Sevilla</h5>
        <p class="card-text">Veterinaria especialista en pequeños animales.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="dx.jpg" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Dr. Carlos Spina</h5>
        <p class="card-text">Especialista en imagénes.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="5.jpeg" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Dra. Patricia Hernández</h5>
        <p class="card-text">Veterinaria especialista en felinos.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="RV.jpg" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Dr. Agostino Goncalves</h5>
        <p class="card-text">Especilista en rayos x.</p>
        </div>
      </div>
    </div>
  </div>
</div>
   
   

    
        
    )
  
}


export default QuienesSomos;


