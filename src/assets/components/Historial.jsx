const Historial = () => {
  // Podés traer el historial desde localStorage o un estado global
  const historial = JSON.parse(localStorage.getItem("historial") || "[]");

  return (
    <div className="app">
      <h2>Historial de reclamos</h2>
      {historial.length === 0 ? (
        <p>No hay reclamos previos.</p>
      ) : (
        <ul>
          {historial.map((item, i) => (
            <li key={i}>
              {item.fecha}: {item.detalle} - ${item.monto}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Historial;
