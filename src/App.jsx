import DataFetch from './components/Datafetching'
import GameFetch from './components/ByVertical/Game/game_tokens'
import DefiFetch from './components/ByVertical/defi_tokens'
import MetaverseFetch from './components/ByVertical/metaverse_tokens'
import MemeFetch from './components/ByVertical/meme_tokens'
import NotagFetch from './components/ByVertical/notag_tokens'
import Refresh from './components/refresher'

function App() {

    return (
        <div className='App'>
            <h1>Solana Prime Newly Minted!</h1>
            
            <div className="components">
                <DataFetch />
                <Refresh />
                <GameFetch />
                <DefiFetch />
                <MetaverseFetch />
                <MemeFetch />
                <NotagFetch />
            </div>
        </div>
        )




}


export default App