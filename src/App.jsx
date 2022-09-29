import DataFetch from './components/Datafetching'
import NFTtokens from './components/ByVertical/nft/nft_tokens'

import Refresh from './components/refresher'

import "./style/app.css";

function App() {

    return (
        <div className='App'>
            <h1>SPL Token Tracker!</h1>
            
            <div className="components">
                <DataFetch />
                <Refresh />
                <NFTtokens />
            </div>
        </div>
        )




}


export default App