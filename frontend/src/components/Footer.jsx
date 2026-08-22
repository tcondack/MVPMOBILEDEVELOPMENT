import React from 'react'
import './Footer.css'

function Footer(){
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
        <div className="footer-container">
            <div className="footer-brand">
            <h3 className="footer-title">Terê Verde</h3>
            <p className="footer-subtitle">Circuito de Parques e Trilhas de Teresópolis</p>
            </div>

            <nav className="footer-links">
            <a href="#parques" className="footer-link">Parques</a>
            <a href="#trilhas" className="footer-link">Trilhas</a>
            <a href="#eventos" className="footer-link">Eventos</a>
            <a href="#novidades" className="footer-link">Novidades</a>
            </nav>
        </div>

        <div className="footer-bottom">
            <p className="footer-copy">
                &copy; {currentYear} Circuito Terê Verde. Todos os direitos reservados.
            </p>
        </div>
        </footer>
  );
}

export default Footer