import { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle, CCardImage } from '@coreui/react'
import './style.css';

function Parques() {
  const [parques, setParques] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/parques/')
      .then(response => response.json())
      .then(dados => {
        console.log(dados)
        setParques(dados)
      })
      .catch(err => {
        console.error("Erro ao carregar parques:", err);
      });
}, []);


return (
    <section>
      <h2>Parques</h2>
      <div className='cards-conteiner'>
        {parques.map(parque => {
          const imagemUrl = parque.imagem?.startsWith('http')
          ? parque.imagem :`http://127.0.0.1:8000${parque.imagem}`

          return (
            <CCard key={parque.id}>
              <CCardBody>
              <CCardTitle>{parque.nome}</CCardTitle>
              <CCardImage 
                orientation='top'
                src={imagemUrl}
                alt={parque.imagem}
                ></CCardImage>
                <CCardText>{parque.descricao}</CCardText>
              </CCardBody>
            </CCard>
        )
        })}   
      </div>

    </section>
  )
}

export default Parques