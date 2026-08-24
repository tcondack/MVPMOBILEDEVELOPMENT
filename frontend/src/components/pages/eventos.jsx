import { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle, CCardImage } from '@coreui/react'
import './style.css';

function Eventos() {
  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/eventos/')
      .then(response => response.json())
      .then(dados => {
        console.log(dados)
        setEventos(dados)
      })
      .catch(err => {
        console.error("Erro ao carregar eventos:", err);
      });
}, []);


return (
    <section>
      <h2>Eventos</h2>
      <div className='cards-conteiner'>
        {eventos.map(eventos => {
          const imagemUrl = eventos.imagem?.startsWith('http')
          ? eventos.imagem :`http://127.0.0.1:8000${eventos.imagem}`

          return (
            <CCard key={eventos.id}>
              <CCardBody>
              <CCardTitle>{eventos.nome}</CCardTitle>
              <CCardImage 
                orientation='top'
                src={imagemUrl}
                alt={eventos.imagem}
                ></CCardImage>
                <CCardText>{eventos.descricao}</CCardText>
              </CCardBody>
            </CCard>
        )
        })}   
      </div>

    </section>
  )
}

export default Eventos