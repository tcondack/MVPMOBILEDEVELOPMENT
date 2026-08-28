import { useState} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

function Header (){
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = ()=>{
        setMenuAberto(!menuAberto);
    };

    return (
        <header className='header'>
            <div className='header-logo'>
                <strong>Circuito Tere Verde</strong>
            </div>
            <button className='header-menu'onClick={toggleMenu}>
                ☰
            </button>

                <nav className={`nav-menu ${menuAberto ? 'visivel' :''}`}>
                <Link to="/">Início</Link>
                <Link to="/parques">Parques</Link>
                <Link to= "/trilhas">Trilhas</Link>
                <Link to="/eventos">Eventos</Link>
                <Link to="/novidades">Novidades</Link>
                <Link to="/login">Login</Link>
                <Link to="/documentacao">Documentação</Link>
                <a href="http://127.0.0.1:8000/api/docs/swagger/" target="_blank" rel="noopener noreferrer">Api</a>
                </nav>
        </header>
    )
}

export default Header