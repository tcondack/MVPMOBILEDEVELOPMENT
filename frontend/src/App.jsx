import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Statistics from './components/Statistics.jsx'
import { useState } from 'react'

function App() {
const [termoBusca, setTermoBusca] = useState('')

  function realizaBusca(texto) {
    setTermoBusca(texto)
  }
  return (
    <>
    <Header />
    <Hero onBuscar={realizaBusca} />
    <Statistics />

    <p>Pesquisando por:{termoBusca}</p>
    </>
  )
}
export default App
