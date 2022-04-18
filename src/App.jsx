import DataFetch from './components/Datafetching'
import GameFetch from './components/ByVertical/game/game_tokens'
import DefiFetch from './components/ByVertical/defi/defi_tokens'
import MetaverseFetch from './components/ByVertical/metav/metaverse_tokens'
import MemeFetch from './components/ByVertical/meme/meme_tokens'
import NotagFetch from './components/ByVertical/notag/notag_tokens'
import Refresh from './components/refresher'
import MetavFetch from './components/ByVertical/metav/metaverse_tokens'

function App() {

    return (
        <div className='App'>
            <h1>SolanaPrime SPL Token Tracker!</h1>
            
            <div className="components">
                <DataFetch />
                <Refresh />
                <GameFetch />
                <DefiFetch />
                <MemeFetch />
                <MetavFetch />
                <NotagFetch />
            </div>
        </div>
        )




}


export default App