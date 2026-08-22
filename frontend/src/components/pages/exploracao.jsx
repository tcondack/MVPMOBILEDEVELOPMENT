import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import './exploracao.css';

export default function Exploracao() {
  const { categoria } = useParams();
  const navigate = useNavigate();
  
  // Captura os parâmetros de busca da URL (?busca=texto)
  const [searchParams] = useSearchParams();
  const termoBusca = searchParams.get('busca') || '';

  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // CONEXÃO COM O DJANGO: Traz os dados reais das 4 tabelas
  useEffect(() => {
    setCarregando(true);
    Promise.all([
      fetch('http://127.0.0').then(res => res.json()),
      fetch('http://127.0.0').then(res => res.json()),
      fetch('http://127.0.0').then(res => res.json()),
      fetch('http://127.0.0').then(res => res.json())
    ])
    .then(([parques, trilhas, eventos, novidades]) => {
      // Injeta a marcação do tipo de cada item para a pílula saber filtrar
      const p = parques.map(i => ({ ...i, tipo: 'parques' }));
      const t = trilhas.map(i => ({ ...i, tipo: 'trilhas' }));
      const e = eventos.map(i => ({ ...i, tipo: 'eventos' }));
      const n = novidades.map(i => ({ ...i, tipo: 'novidades' }));
      
      setItens([...p, ...t, ...e, ...n]);
      setCarregando(false);
    })
    .catch(err => {
      console.error("Erro ao conectar com Django:", err);
      setCarregando(false);
    });
  }, []);

  // FILTRO COMBINADO: Avalia a pílula ativa + a palavra digitada na busca
  const itensFiltrados = itens.filter(item => {
    const bateuCategoria = categoria === 'todos' || item.tipo === categoria;
    
    // Evita erros se o item vier sem nome ou título do banco
    const nomeItem = item.nome || item.titulo || ''; 
    const bateuPesquisa = nomeItem.toLowerCase().includes(termoBusca.toLowerCase());
    
    return bateuCategoria && bateuPesquisa;
  });

  // Troca de pílula atualizando a URL sem perder o texto da busca
  const mudarFiltro = (novoFiltro) => {
    const sufixoBusca = termoBusca ? `?busca=${encodeURIComponent(termoBusca)}` : '';
    navigate(`/explorar/${novoFiltro}${sufixoBusca}`);
  };

  if (carregando) return <div className="loading">Carregando circuito Terê Verde...</div>;

  return (
    <div className="explorar-container">
      {/* Feedback visual caso o usuário tenha pesquisado algo */}
      {termoBusca && (
        <p className="search-feedback">
          Resultados para: <strong>"{termoBusca}"</strong>
        </p>
      )}

      {/* 1. Grade de Pílulas Superiores Arredondadas baseadas no print */}
      <div className="filter-pills">
        {['todos', 'parques', 'trilhas', 'eventos', 'novidades'].map((aba) => (
          <button 
            key={aba}
            className={`pill-btn ${categoria === aba ? 'active' : ''}`}
            onClick={() => mudarFiltro(aba)}
          >
            {aba === 'todos' ? 'Todos' : aba.charAt(0).toUpperCase() + aba.slice(1)}
          </button>
        ))}
      </div>

      {/* 2. Grade de Exibição dos Cards claros com bordas arredondadas */}
      <div className="explorar-grid">
        {itensFiltrados.length === 0 ? (
          <p className="no-results">Nenhum item encontrado para esta busca.</p>
        ) : (
          itensFiltrados.map((item) => (
            <div key={`${item.tipo}-${item.id}`} className="item-card">
              <div className="image-wrapper">
                {/* Se o Django trouxer imagem renderiza, senão coloca uma padrão da mata */}
                <img 
                  src={item.imagem || 'https://unsplash.com'} 
                  alt={item.nome || item.titulo} 
                />
                <span className="badge-type">
                  {item.tipo === 'parques' ? '🌲 Parque' : item.tipo === 'trilhas' ? '⛰️ Trilha' : item.tipo === 'eventos' ? '📅 Evento' : '🔔 Novidade'}
                </span>
              </div>
              <div className="card-body">
                <h3>{item.nome || item.titulo}</h3>
                <p className="location">📍 Teresópolis, RJ</p>
                <p className="description">{item.descricao}</p>
                
                <div className="card-footer">
                  <div className="info-meta">
                    {item.distancia && <span>📏 {item.distancia} km</span>}
                    {item.duracao && <span>⏱️ {item.duracao}h</span>}
                  </div>
                  <div className="rating">★ 4.9</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
