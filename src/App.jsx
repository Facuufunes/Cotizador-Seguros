import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import InsuranceForm from "./assets/components/InsuranceForm";
import Resultado from "./assets/components/Resultado";
import datos from "./assets/data/datos";
import Cotizador from "./assets/data/Cotizador";
import "./App.css";

const COSTO_M2 = 1000;

// Componente para la pestaña Historial
const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("historial") || "[]");
    setHistorial(stored);
  }, []);

  return (
    <div className="app">
      <h2>Historial de reclamos</h2>
      {historial.length === 0 ? (
        <p>No hay reclamos previos.</p>
      ) : (
        <ul>
          {historial.map((item, i) => (
            <li key={i}>
              {item.fecha} - {item.property} ({item.meters} m²) - Precio estimado: ${item.precio}
            </li>
          ))}
        </ul>
      )}
      <button className="btn-volver" onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  );
};

function App() {
  const [precioFinal, setPrecioFinal] = useState(null);

  // Función que calcula el seguro y guarda en historial
  const calcularSeguro = (formData) => {
    const factorPropiedad = datos.find(
      (d) => d.categoria === "propiedad" && d.tipo === formData.property
    )?.factor || 1;

    const factorUbicacion = datos.find(
      (d) => d.categoria === "ubicacion" && d.tipo === formData.location
    )?.factor || 1;

    const cotizador = new Cotizador(
      COSTO_M2,
      factorPropiedad,
      factorUbicacion,
      formData.meters
    );

    const resultado = cotizador.cotizarPoliza();
    setPrecioFinal(resultado);

    // Guardar en historial
    const nuevoHistorial = JSON.parse(localStorage.getItem("historial") || "[]");
    nuevoHistorial.push({
      fecha: new Date().toLocaleDateString(),
      property: formData.property,
      location: formData.location,
      meters: formData.meters,
      precio: resultado,
    });
    localStorage.setItem("historial", JSON.stringify(nuevoHistorial));
  };

  return (
    <Router>
      <nav>
      <Link to="/">Home</Link>
      <Link to="/historial">Historial</Link>
    </nav>


      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <h1>Seguros del hogar 🏡</h1>
              <InsuranceForm onSubmit={calcularSeguro} />
              {precioFinal && <Resultado precio={precioFinal} />}
            </div>
          }
        />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </Router>
  );
}

export default App;
