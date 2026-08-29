import { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle, CCardImage } from '@coreui/react'
import './style.css';
import Header from '../Header';
import Hero from '../Hero';
import Footer from '../Footer';
import Statistics from '../Statistics';

function Parques() {
  const [parques, setParques] = useState([]);
  useEffect(() => {
    fetch('/api/parques/')
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
  <div className='pagina-conteiner' >
    <Header />
    <Hero />
    <Statistics />
    <section>
      <h2>Parques</h2>
      <div className='cards-conteiner'>
        {parques.map(parque => {
          const imagemUrl = parque.imagem?.startsWith('http')
          ? parque.imagem :`/media/${parque.imagem}`

          return (
            <CCard key={parque.id}>
              
              <CCardImage 
                orientation='top'
                src={imagemUrl}
                alt={parque.imagem}
                ></CCardImage>
                <CCardBody>
                <CCardTitle>{parque.nome}</CCardTitle>
                <CCardText>{parque.descricao}</CCardText>
                <CCardText>{parque.localizacao}</CCardText>
                <CCardText>{parque.taxa_entrada}</CCardText>
                <CCardText>{parque.dias_funcionamento}</CCardText>
              </CCardBody>
            </CCard>
        )
        })}   
      </div>

    </section>
    <Footer />
  </div>
  )
}

export default Parques