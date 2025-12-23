import datos from "../data/datos";
import Cotizador from "../data/Cotizador";
import QuoteTable from "./QuoteTable";

const COSTO_M2 = 1000;

const CoverageOptions = ({ data }) => {

  const factorPropiedad = datos.find(
    d => d.categoria === "propiedad" && d.tipo === data.property
  )?.factor || 1;

  const factorUbicacion = datos.find(
    d => d.categoria === "ubicacion" && d.tipo === data.location
  )?.factor || 1;

  const cotizador = new Cotizador(
    COSTO_M2,
    factorPropiedad,
    factorUbicacion,
    data.meters
  );

  const precioBase = parseFloat(cotizador.cotizarPoliza());

  const opciones = [
    { nombre: "Básico", precio: precioBase },
    { nombre: "Intermedio", precio: (precioBase * 1.3).toFixed(2) },
    { nombre: "Premium", precio: (precioBase * 1.6).toFixed(2) },
  ];

  return <QuoteTable options={opciones} />;
};

export default CoverageOptions;
