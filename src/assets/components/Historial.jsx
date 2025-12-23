import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


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
      <button className="btn-volver" onClick={() => navigate("/")}>
        Volver al inicio
      </button>
    </div>
  );
};

export default Historial;
