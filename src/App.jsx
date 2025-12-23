import { useState } from "react";
import { HashRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import InsuranceForm from "./assets/components/InsuranceForm";
import Resultado from "./assets/components/Resultado";
import CoverageOptions from "./assets/components/CoverageOptions";
import Historial from "./assets/components/Historial";
import datos from "./assets/data/datos";
import Cotizador from "./assets/data/Cotizador";
import "./App.css";

const COSTO_M2 = 1000;

function Home() {
  const [precioFinal, setPrecioFinal] = useState(null);
  const [formData, setFormData] = useState(null);

  const calcularSeguro = (data) => {
    setFormData(data);

    const factorPropiedad = datos.find(
      (d) => d.categoria === "propiedad" && d.tipo === data.property
    )?.factor || 1;

    const factorUbicacion = datos.find(
      (d) => d.categoria === "ubicacion" && d.tipo === data.location
    )?.factor || 1;

    const cotizador = new Cotizador(
      COSTO_M2,
      factorPropiedad,
      factorUbicacion,
      data.meters
    );

    const resultado = cotizador.cotizarPoliza();
    setPrecioFinal(resultado);

    // Guardar en historial
    const nuevoHistorial = JSON.parse(localStorage.getItem("historial") || "[]");
    nuevoHistorial.push({
      fecha: new Date().toLocaleDateString(),
      property: data.property,
      location: data.location,
      meters: data.meters,
      precio: resultado,
    });
    localStorage.setItem("historial", JSON.stringify(nuevoHistorial));
  };

  return (
    <div className="app">
      <h1>Seguros del hogar 🏡</h1>
      <InsuranceForm onSubmit={calcularSeguro} />
      {precioFinal && <Resultado precio={precioFinal} />}
      {formData && <CoverageOptions data={formData} />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/historial">Historial</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </Router>
  );
}
