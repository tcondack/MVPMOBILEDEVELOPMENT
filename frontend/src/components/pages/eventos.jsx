import { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle, CCardImage } from '@coreui/react'
import './style.css';
import Footer from '../Footer';
import Header from '../Header';
import Hero from '../Hero';
import Statistics from '../Statistics';

function Eventos() {
  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    fetch('/api/eventos/')
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
  <div className='pagina-conteiner' >
    <Header />
    <Hero />
    <Statistics />
    <section>
      <h2>Eventos</h2>
      <div className='cards-conteiner'>
        {eventos.map(eventos => {
          const imagemUrl = eventos.imagem?.startsWith('http')
          ? eventos.imagem :`/media/${eventos.imagem}`

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
                <CCardText>O evento acontece no dia:{eventos.data_inicio}</CCardText>
                <CCardText>Entrada: R$ {eventos.preco}</CCardText>
                <CCardText>{eventos.ativo}</CCardText>
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

export default Eventos