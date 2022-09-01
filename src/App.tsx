import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Chat from './Pages/Chat'
import MapIframe from './Pages/Map/Map'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/map" element={<MapIframe />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
