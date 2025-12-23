const QuoteTable = ({ options }) => {
  return (
    <div>
      <h2>Opciones de Cobertura</h2>

      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Precio Mensual</th>
          </tr>
        </thead>
        <tbody>
          {options.map((opt, index) => (
            <tr key={index}>
              <td>{opt.name}</td>
              <td>${opt.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuoteTable;
