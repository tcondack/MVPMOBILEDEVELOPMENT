import imagemFloresta from '../assets/heroimage.jpg'
import './Hero.css'

function Hero (){

    const estiloFundo = {
            backgroundImage: `linear-gradient(rgba(26, 58, 36, 0.45), rgba(18, 37, 24, 0.95)), url(${imagemFloresta})`
  }

  return (
        <section className='hero' style={estiloFundo}>
            <h1>Descubra a natureza perto de você.</h1>
            <p>Parques, trilhas, eventos e novidades para turistas e 
          moradores explorarem o melhor de Teresópolis.</p>
        
        </section>
    )
}
export default Hero
