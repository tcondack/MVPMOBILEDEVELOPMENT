import { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle, CCardImage } from '@coreui/react'
import './trilhas.css';

function Trilhas() {
  const [trilhas, setTrilhas] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/trilhas/')
      .then(response => response.json())
      .then(dados => {
        console.log(dados)
        setTrilhas(dados)
      })
      .catch(err => {
        console.error("Erro ao carregar parques:", err);
      });
}, []);


return (
    <section>
      <h2>Trilhas</h2>
      <div className='cards-conteiner'>
        {trilhas.map(trilhas => {
          const imagemUrl = trilhas.imagem?.startsWith('http')
          ? trilhas.imagem :`http://127.0.0.1:8000${trilhas.imagem}`

          return (
            <CCard key={trilhas.id}>
              <CCardBody>
              <CCardTitle>{trilhas.nome}</CCardTitle>
              <CCardImage 
                orientation='top'
                src={imagemUrl}
                alt={trilhas.imagem}
                ></CCardImage>
                <CCardText>{trilhas.descricao}</CCardText>
              </CCardBody>
            </CCard>
        )
        })}   
      </div>

    </section>
  )
}

export default Trilhas