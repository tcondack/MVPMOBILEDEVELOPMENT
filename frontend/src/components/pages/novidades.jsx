import { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle, CCardImage } from '@coreui/react'
import './style.css';

function Novidades() {
  const [novidades, setNovidades] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/novidades/')
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
    <section>
      <h2>Novidades</h2>
      <div className='cards-conteiner'>
        {novidades.map(novidades => {
          const imagemUrl = novidades.imagem?.startsWith('http')
          ? novidades.imagem :`http://127.0.0.1:8000${novidades.imagem}`

          return (
            <CCard key={novidades.id}>
              <CCardBody>
              <CCardTitle>{novidades.nome}</CCardTitle>
              <CCardImage 
                orientation='top'
                src={imagemUrl}
                alt={novidades.imagem}
                ></CCardImage>
                <CCardText>{novidades.conteudo}</CCardText>
              </CCardBody>
            </CCard>
        )
        })}   
      </div>

    </section>
  )
}

export default Novidades