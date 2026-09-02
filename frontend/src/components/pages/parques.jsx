import { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle, CCardImage } from '@coreui/react'
import './style.css';
import Header from '../Header';
import Hero from '../Hero';
import Footer from '../Footer';
import Statistics from '../Statistics';
import { API_URL } from '../../services/api';

function Parques() {
  const [parques, setParques] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/api/parques/`)
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
        const statusClass = parque.statusOperacao ? parque.statusOperacao.toLowerCase() : 'Aberto';
          return (
            <CCard key={parque.id}>
              
              <CCardImage 
                orientation='top'
                src={imagemUrl}
                alt={parque.imagem}
                ></CCardImage>
                <CCardBody>
                <CCardTitle>{parque.nome}</CCardTitle>
                <div>
                  <span className={`badge-status ${statusClass}`}>
                    {parque.statusOperacao || 'Aberto'}
                  </span>
                </div>
                <CCardText>{parque.descricao}</CCardText>
                <CCardText>Localização:{parque.localizacao}</CCardText>
                <CCardText>Taxa de entrada: R$ {parque.taxa_entrada}</CCardText>
                <CCardText>Dias de Funcionamento:{parque.dias_funcionamento}</CCardText>
                <CCardText>Horário de Funcionamento:{parque.horario_funcionamento}</CCardText>
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