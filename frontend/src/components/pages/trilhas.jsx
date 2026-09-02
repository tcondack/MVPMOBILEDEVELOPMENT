import { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle, CCardImage } from '@coreui/react'
import './style.css';
import Footer from '../Footer';
import Header from '../Header';
import Hero from '../Hero';
import Statistics from '../Statistics';
import { API_URL } from '../../services/api';

function Trilhas() {
  const [trilhas, setTrilhas] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/api/trilhas/`)
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
          const statusClass = trilhas.statusOperacao ? trilhas.statusOperacao.toLowerCase() : 'Aberto';

          return (
            <CCard key={trilhas.id}>
              <CCardBody>
              <CCardTitle>{trilhas.nome}</CCardTitle>
              <div>
                    <span className={`badge-status ${statusClass}`}>
                      {trilhas.statusOperacao || 'Aberto'}
                    </span>
              </div>
              <CCardImage 
                orientation='top'
                src={imagemUrl}
                alt={trilhas.imagem}
                ></CCardImage>
                <CCardText>{trilhas.descricao}</CCardText>
                <CCardText>Status:{trilhas.statusOperacao}</CCardText>  
                <CCardText>Nível de dificuldade: {trilhas.dificuldade}</CCardText>
                <CCardText>Tamanho do percurso: {trilhas.distancia} metros.</CCardText>
                <CCardText>{trilhas.aviso_disponibilidade}</CCardText>                
                <CCardText>Abertura da Trilha: {trilhas.limite_entrada}</CCardText>
                <CCardText>Saída da Trilha até: {trilhas.limite_saida}</CCardText>
                <CCardText>{trilhas.ativo}</CCardText>
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