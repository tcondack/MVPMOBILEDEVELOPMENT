import { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle, CCardImage } from '@coreui/react'
import './style.css';
import Footer from '../Footer';
import Header from '../Header';
import Hero from '../Hero';
import Statistics from '../Statistics';

function Trilhas() {
  const [trilhas, setTrilhas] = useState([]);
  useEffect(() => {
    fetch('/api/trilhas/')
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
  <div className='pagina-conteiner' >
    <Header />
    <Hero />
    <Statistics />
    <section>
      <h2>Trilhas</h2>
      <div className='cards-conteiner'>
        {trilhas.map(trilhas => {
          const imagemUrl = trilhas.imagem?.startsWith('http')
          ? trilhas.imagem :`/media/${trilhas.imagem}`

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
    <Footer />
  </div>
  )
}

export default Trilhas