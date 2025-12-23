const Resultado = ({ precio }) => {
  return (
    <div className="resultado">
      <h2>Precio estimado:</h2>
      <p>${precio}</p>
    </div>
  );
};

export default Resultado;
