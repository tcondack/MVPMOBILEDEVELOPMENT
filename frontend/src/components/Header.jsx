import { useState} from 'react'
import './Header.css'

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
                <a href="#parques" onClick={toggleMenu}>Parques</a>
                <a href="#trilhas" onClick={toggleMenu}>Trilhas</a>
                <a href="#eventos" onClick={toggleMenu}>Eventos</a>
                <a href="#novidades" onClick={toggleMenu}>Novidades</a>
                <a href="#Login" onClick={toggleMenu}>Login</a>
                </nav>
        </header>
    )
}

export default Header