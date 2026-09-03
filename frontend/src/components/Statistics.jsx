import './Statistics.css'
import { useState, useEffect } from 'react'
import { SiAlltrails } from "react-icons/si"
import { Link } from 'react-router-dom'
import { API_URL } from '../services/api'
import { MdForest } from "react-icons/md"

function Statistics(){
    const [totalParques, setTotalParques] = useState(0)
    const [totalTrilhas, setTotalTrilhas] = useState(0)
    const [totalEventos, setTotalEventos] = useState(0)
    const [totalNovidades, setTotalNovidades]= useState(0)

    useEffect(()=>{
        fetch (`${API_URL}/api/parques/`)
        .then(Response => Response.json())
        .then(data => {setTotalParques(data.length)})
        .catch(err =>console.error("Erro Parques", err));
    },[]);
    useEffect(()=>{
        fetch (`${API_URL}/api/trilhas/`)
        .then(Response => Response.json())
        .then(data => {setTotalTrilhas(data.length)})
        .catch(err =>console.error("Erro Trilhas", err));
    },[]);
    useEffect(()=>{
        fetch (`${API_URL}/api/eventos/`)
        .then(Response => Response.json())
        .then(data => {setTotalEventos(data.length)})
        .catch(err =>console.error("Erro eventos", err));
    },[]);
    useEffect(()=>{
        fetch (`${API_URL}/api/novidades/`)
        .then(Response => Response.json())
        .then(data => {setTotalNovidades(data.length)})
        .catch(err =>console.error("Erro novidades", err));
    },[]);
    return(
        <section className="Statistics">
            <div className="Statistics-item">
                <MdForest className="forest"/>
                <strong>{totalParques}</strong>
                <Link to="/parques">Parques</Link>
            </div>
            <div className="Statistics-item">
                <SiAlltrails className="trails"/>
                <strong>{totalTrilhas}</strong>
                <Link to="/trilhas">Trilhas</Link>
            </div>
            <div className="Statistics-item">
                <span>📅</span>
                <strong>{totalEventos}</strong>
                <Link to="/eventos">Eventos</Link>
            </div>
            <div className="Statistics-item">
                <span>📅</span>
                <strong>{totalNovidades}</strong>
                <Link to="/novidades">Novidades</Link>
            </div>
        </section>
    )
}

export default Statistics