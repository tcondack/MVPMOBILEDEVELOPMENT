import { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle, CCardImage } from '@coreui/react'
import './style.css';
import Footer from '../Footer';
import Header from '../Header';
import Hero from '../Hero';
import Statistics from '../Statistics';
import { API_URL } from '../../services/api';

function Novidades() {
  const [novidades, setNovidades] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/api/novidades/`)
      .then(response => response.json())
      .then(dados => {
        console.log(dados)
        setNovidades(dados)
      })
      .catch(err => {
        console.error("Erro ao carregar novidades:", err);
      });
}, []);


return (
  <div className='pagina-conteiner' >
    <Header />
    <Hero />
    <Statistics />
    <section>
      <h2>Novidades</h2>
      <div className='cards-conteiner'>
        {novidades.map(novidades => {
          const imagemUrl = novidades.imagem?.startsWith('http')
          ? novidades.imagem :`/media/${novidades.imagem}`

          return (
            <CCard key={novidades.id}>
              <CCardBody>
              <CCardTitle>{novidades.titulo}</CCardTitle>
              <CCardImage 
                orientation='top'
                src={imagemUrl}
                alt={novidades.imagem}
                ></CCardImage>
                <CCardText>{novidades.conteudo}</CCardText>
                <CCardText>{novidades.ativo}</CCardText>
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

export default Novidades