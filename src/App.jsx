import DataFetch from './components/Datafetching'
import GameFetch from './components/ByVertical/game/game_tokens'
import DefiFetch from './components/ByVertical/defi/defi_tokens'
import MetaverseFetch from './components/ByVertical/metav/metaverse_tokens'
import MemeFetch from './components/ByVertical/meme/meme_tokens'
import NotagFetch from './components/ByVertical/notag/notag_tokens'
import Refresh from './components/refresher'

import RangeSlider from './components/slider/slider'

function App() {

    return (
        <div className='App'>
            <h1>Solana Prime SPL Token tracker.</h1>
            
            <div className="components">
                <DataFetch />
                <Refresh />

                <RangeSlider />
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