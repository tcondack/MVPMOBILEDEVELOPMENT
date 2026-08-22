import './Statistics.css'
import { useState, useEffect } from 'react'
function Statistics(){
    const [totalParques, setTotalParques] = useState(0)
    const [totalTrilhas, setTotalTrilhas] = useState(0)
    const [totalEventos, setTotalEventos] = useState(0)
    const [totalNovidades, setTotalNovidades]= useState(0)

    useEffect(()=>{
        fetch ('http://127.0.0.1:8000/api/parques/')
        .then(Response => Response.json())
        .then(data => {setTotalParques(data.length)})
        .catch(err =>console.error("Erro Parques", err));
    },[]);
    useEffect(()=>{
        fetch ('http://127.0.0.1:8000/api/trilhas/')
        .then(Response => Response.json())
        .then(data => {setTotalTrilhas(data.length)})
        .catch(err =>console.error("Erro Trilhas", err));
    },[]);
    useEffect(()=>{
        fetch ('http://127.0.0.1:8000/api/eventos/')
        .then(Response => Response.json())
        .then(data => {setTotalEventos(data.length)})
        .catch(err =>console.error("Erro eventos", err));
    },[]);
    useEffect(()=>{
        fetch ('http://127.0.0.1:8000/api/novidades/')
        .then(Response => Response.json())
        .then(data => {setTotalNovidades(data.length)})
        .catch(err =>console.error("Erro novidades", err));
    },[]);
    return(
        <section className="Statistics">
            <div className="Statistics-item">
                <span>🌲</span>
                <strong>{totalParques}</strong>
                <p>Parques</p>
            </div>
            <div className="Statistics-item">
                <span>△</span>
                <strong>{totalTrilhas}</strong>
                <p>Trilhas</p>
            </div>
            <div className="Statistics-item">
                <span>📅</span>
                <strong>{totalEventos}</strong>
                <p>Eventos</p>
            </div>
            <div className="Statistics-item">
                <span>📅</span>
                <strong>{totalNovidades}</strong>
                <p>Novidades</p>
            </div>
        </section>
    )
}

export default Statistics