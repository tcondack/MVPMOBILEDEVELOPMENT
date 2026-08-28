import {Routes, Route} from 'react-router-dom'
import Parques from './components/pages/parques.jsx'
import Trilhas from './components/pages/trilhas.jsx'
import Eventos from './components/pages/eventos.jsx'
import Novidades from './components/pages/novidades.jsx'
import Login from './components/Login/login.jsx'
import Inicio from './components/pages/inicio.jsx'
import Documentacao from './components/pages/documentacao.jsx'

function App() {
  return (
      <div className='app-conteiner'>
        <Routes>
          <Route path='/' element={<Inicio />}/>
          <Route path='/parques' element={<Parques />} />
          <Route path='/trilhas' element={<Trilhas />}/>
          <Route path='/eventos' element={<Eventos />} />
          <Route path='/novidades' element= {<Novidades/>} />
          <Route path='/login'  element={<Login />} />
          <Route path="/documentacao" element={<Documentacao />} />
        </Routes>
    </div>
  )
}
export default App
