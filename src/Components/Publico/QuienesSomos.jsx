import { db } from "../firebaseConfig/firebase";
import { collection, getDocs, doc } from "firebase/firestore";
import React, { useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../firebaseConfig/AuthProvider"
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/CardGroup";
import Carousel from "react-bootstrap/Carousel";
import "./QuienesSomos.css";

const QuienesSomos = () => {
  return (
    <div>
      <div className="container">
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              className="img-fluid"
              src="./src/assets/img/1.jpeg"
              alt="First slide"
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
              className="img-fluid"
              src="./src/assets/img/2.jpeg"
              alt="Second slide"
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
              className="img-fluid"
              src="./src/assets/img/vetdog.jpg"
              alt="Third slide"
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
      <h2 className="esp">
        <img
          src="../src/assets/img/logoBlanco.jpg"
          alt=""
          className="logoBlanco"
        />{" "}
        Nuestro equipo{" "}
      </h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="card">
            <img
              src="./src/assets/img/5.jpeg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">
                Dra. Patricia Hernández y Dr. Nicolás Sáenz
              </h5>
              <p className="card-text">Clínica Médica</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img
              src="./src/assets/img/4.jpeg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Dra. Carla Sevilla</h5>
              <p className="card-text">Especialista en Nutrición</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img
              src="./src/assets/img/dx2.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Dr. Carlos Spina</h5>
              <p className="card-text">
                Traumatología y Diagnóstico por Imagénes.
              </p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <img
              src="./src/assets/img/RV.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">
                Dra. Andrea Diaz y Dr. Juan Goncalves
              </h5>
              <p className="card-text">Cirugia General</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuienesSomos;
