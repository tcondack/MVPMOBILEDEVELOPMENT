import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Statistics from './components/Statistics.jsx'
import Parques from './components/pages/parques.jsx'
import Trilhas from './components/pages/trilhas.jsx'
import Eventos from './components/pages/eventos.jsx'
import Novidades from './components/pages/novidades.jsx'

function App() {

  function realizaBusca(texto) {
    setTermoBusca(texto)
  }
  return (
    <>
    <Header />
    <Hero />
    <Statistics />
    <Parques />
    <Trilhas />
    <Eventos />
    <Novidades />
    <p></p>
    </>
  )
}
export default App
