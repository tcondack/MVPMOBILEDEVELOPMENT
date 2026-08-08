import React, { useState, useEffect } from 'react';

function App() {
  const [parques, setParques] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Conexão com a API do Django
  useEffect(() => {
    fetch('http://localhost:8000/api/parques/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro de conexão. Verifique o servidor Django ou o CORS!');
        }
        return response.json();
      })
      .then((data) => {
        setParques(data);
        setCarregando(false);
      })
      .catch((error) => {
        setErro(error.message);
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Carregando dados do Django...</div>;
  }

  if (erro) {
    return (
      <div style={{ padding: '20px', color: 'red', fontFamily: 'sans-serif' }}>
        <h3>Erro ao carregar a API:</h3>
        <p>{erro}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Terê Verde Online - Validação de Dados</h1>
      
      {parques.length === 0 ? (
        <p>Nenhum parque cadastrado no banco de dados. Acesse o /admin e adicione um.</p>
      ) : (
        parques.map((parque) => (
          <div key={parque.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
            
            {/* Dados Gerais do Parque */}
            <h2>{parque.nome}</h2>
            {parque.subtitulo && <p><strong>Subtítulo:</strong> {parque.subtitulo}</p>}
            <p><strong>Descrição:</strong> {parque.descricao}</p>
            <p><strong>Endereço/Localização:</strong> {parque.localizacao}</p>
            <p><strong>Taxa de Entrada:</strong> {parque.taxa_entrada ? `R$ ${parque.taxa_entrada}` : 'Gratuito'}</p>
            
            {/* Foto Cadastrada */}
            {parque.imagem && (
              <div style={{ margin: '15px 0' }}>
                <img src={parque.imagem} alt={parque.nome} style={{ width: '100%', maxHeight: '300px', objectCover: 'contain', borderRadius: '4px' }} />
              </div>
            )}

            {/* Tabela de Horários Relacionais vindos da outra tabela */}
            <div style={{ marginTop: '15px', background: '#fff', padding: '15px', borderRadius: '6px', border: '1px solid #ddd' }}>
              <h3>🕒 Cronograma de Funcionamento:</h3>
              {parque.horarios && parque.horarios.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {parque.horarios.map((horario, index) => (
                    <li key={index} style={{ padding: '5px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{horario.dia_semana}:</span>
                      {horario.fechado ? (
                        <span style={{ color: 'red', fontWeight: 'bold' }}>FECHADO PARA MANUTENÇÃO</span>
                      ) : (
                        <span>
                          {horario.horario_abertura?.substring(0, 5)} às {horario.horario_fechamento?.substring(0, 5)}
                          {horario.observacao_especial && <span style={{ color: 'orange', marginLeft: '10px' }}>{horario.observacao_especial}</span>}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: 'gray', italic: 'true' }}>Nenhum horário cadastrado para este parque no Django Admin.</p>
              )}
              
              {parque.aviso_horario && (
                <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}><em>*Nota: {parque.aviso_horario}</em></p>
              )}
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default App;
