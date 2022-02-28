import react from 'react'
import DataFetch from './components/Datafetching'
import GameFetch from './components/ByVertical/game_tokens'

function App() {

    return (
        <div className='App'>
            <h1>Solana Prime Newly Minted!</h1>
            
            <div className="components">
                <DataFetch />
                <GameFetch />
            </div>
        </div>
        )




}


export default App