import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Statistics from './components/Statistics.jsx'
import Parques from './components/pages/parques.jsx'
import Trilhas from './components/pages/trilhas.jsx'
import Eventos from './components/pages/eventos.jsx'
import Novidades from './components/pages/novidades.jsx'
import Login from './components/Login/login.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
    <div className='app-conteiner'>
    <Header />
    <Hero />
    <Statistics />
    <Parques />
    <Trilhas />
    <Eventos />
    <Novidades />
    <Login />
    <Footer />
    <p></p>
    </div>
    </>
  )
}
export default App
