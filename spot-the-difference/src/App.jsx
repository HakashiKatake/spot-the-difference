import './App.css'
import Game from './components/Game'

function App() {
  return (
    <div className="flex flex-col justify-center min-h-screen p-5" 
      style={{
        backgroundImage: 'url(/background.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Game />
    </div>
  )
}

export default App
