import imagemFloresta from '../assets/heroimage.jpg'
import { useState } from 'react'
import './Hero.css'

function Hero ({ onBuscar }){
    const [texto, setTexto] = useState('')

    const estiloFundo = {
            backgroundImage: `linear-gradient(rgba(26, 58, 36, 0.45), rgba(18, 37, 24, 0.95)), url(${imagemFloresta})`
  }
   function buscar(event) {
    event.preventDefault()

    onBuscar(texto)
  }
  return (
        <section className='hero' style={estiloFundo}>
            <h1>Descubra a natureza perto de você.</h1>
            <p>Parques, trilhas, eventos e novidades para turistas e 
          moradores explorarem o melhor de Teresópolis.</p>
        
        <form onSubmit={buscar} className='searchbox'>
        <button type='submit' className="search-icon">🔍</button>
        <input type='text' placeholder='Buscar'className='search-input'value={texto}
                    onChange={(e) => setTexto(e.target.value)}/>
        </form>
        </section>
    )
}
export default Hero