import Footer from '../Footer';
import Header from '../Header';
import Hero from '../Hero';

function Inicio (){
return(
    <div className='pagina-conteiner' >
    <Header />
    <Hero />
    <section className="apresentacao">
        <div className="apresentacao-container">

            <h1>A natureza, lazer e eventos ao ar livre em Teresópolis</h1>
            <p>
                O Circuito Terê Verde conecta moradores e visitantes às áreas
                verdes de Teresópolis, reunindo informações sobre parques,
                trilhas, eventos e iniciativas ambientais.
            </p>
            <p>
                Descubra novos lugares, planeje suas experiências ao ar livre
                e conheça melhor o patrimônio natural da nossa exuberante cidade.
            </p>
        </div>
    </section>
    <Footer />
    </div>
)
}

export default Inicio
