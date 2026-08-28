import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

function Documentacao() {
  return (
    <div style={{ padding: '20px', background: '#fff', minHeight: '100vh' }}>
      <h2>Documentação da API</h2>
      {/* Usa a URL relativa para funcionar tanto local quanto na Vercel */}
      <SwaggerUI url="/api/schema/" />
    </div>
  );
}

export default Documentacao;