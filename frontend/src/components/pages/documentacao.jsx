import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import Header from "../Header"
import Hero from "../Hero"

function Documentacao() {
  return (
    <div className='pagina-conteiner' >
    <Header />
    <Hero />
    <div style={{ padding: '20px', background: '#fff', minHeight: '100vh' }}>
      <h2>Documentação da API</h2>
      {/* Usa a URL relativa para funcionar tanto local quanto na Vercel */}
      <SwaggerUI url="/api/schema/" />
    </div>
    </div>
  );
}

export default Documentacao;