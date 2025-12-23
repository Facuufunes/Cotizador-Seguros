import { useState } from "react";
import datos from "../data/datos";

const InsuranceForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    property: "",
    location: "",
    meters: "",
  });

  const propiedades = datos.filter(d => d.categoria === "propiedad");
  const ubicaciones = datos.filter(d => d.categoria === "ubicacion");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.property || !form.location || !form.meters) {
      alert("Completá todos los campos");
      return;
    }

    onSubmit(form);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Completa los datos solicitados para cotizar</h2>

      <input
        type="number"
        name="meters"
        placeholder="Metros cuadrados"
        onChange={handleChange}
      />

      <select name="property" onChange={handleChange}>
        <option value="">Tipo de propiedad</option>
        {propiedades.map((p, i) => (
          <option key={i} value={p.tipo}>{p.tipo}</option>
        ))}
      </select>

      <select name="location" onChange={handleChange}>
        <option value="">Ubicación</option>
        {ubicaciones.map((u, i) => (
          <option key={i} value={u.tipo}>{u.tipo}</option>
        ))}
      </select>

      <button type="submit">Cotizar</button>
    </form>
  );
};

export default InsuranceForm;
