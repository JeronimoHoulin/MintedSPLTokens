import React, { Component } from 'react'; //import 'React' default export, and { Component } non-default export from react
import fetch from 'isomorphic-fetch'; // isomorphic-fetch is used for both server side and client side 'fetch' (see https://github.com/matthew-andrews/isomorphic-fetch)
// App.css was a hangover from the create-react-app, it's not really needed for this basic example
const url = "https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json"; // API




class App extends Component { // This is the same as 'extends 'React.Component'

    constructor(props) {
        super(props);
        this.state = {
            fetchedData: null // stores the result of the fetch response body converted to a javascript object
        };
    }

  fetchIt = () => {
      console.log('fetching it');
      fetch(url, { mode: 'cors' }) // Make sure fetch is cross-origin, it's not by default (see https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) since the target URL of the API is a different 'origin' to our react app
          .then((resp) => {
            console.log(resp);
          return resp.json(); })
          .then((data) => { // data input parameter is the result of the resolved resp.json() Promise (see https://developer.mozilla.org/en-US/docs/Web/API/Body/json)
              console.log(data);





            let token = data.tokens;
            //console.log(token);
            const last_300 = token.slice(-300);
            //console.log(token.length);
            //text1 = `There are currently ${token.length} SPL tokens in the Solana ecosystem. We will use the last ${last_300.length}`;
            //Define our rendered tokens by tags
            console.log(last_300[188].tags);
        
            let all_data = [];

            let game_tokens = [];
            let wallet_tokens = [];
            let defi_tokens = [];
            let meme_tokens = [];
            let notag_tokens = [];
            
            for(let i=0; i<last_300.length; i++){
        
            //////////////////////////////////////////////////
            const regex_game = [/utility/, /game/, /p2e/, /play/, /p2e/];
            const tags_game = last_300[i].tags;
            //let matchin = regex_game.some(rx => rx.test(tags));
            //console.log(matchin);
        
            if(regex_game.some(rx => rx.test(tags_game))==true){
                game_tokens.push({
                    "Address":last_300[i].address,
                    "Name": last_300[i].name,
                    "Symbol": last_300[i].symbol,
                    "Tags": last_300[i].tags,
                    "logo": last_300[i].logoURI,
                    "Extrensions":last_300[i].extensions,
                    "Category": "Game"
                    })
            }
            //////////////////////////////////////////////////
        
        
        
            //////////////////////////////////////////////////
            const regex_defi = [/defi/, /fi/, /dex/, /yield/, /money/];
            const tags_defi = last_300[i].tags;
        
            if(regex_defi.some(rx => rx.test(tags_defi))==true){
                defi_tokens.push({
                    "Address":last_300[i].address,
                    "Name": last_300[i].name,
                    "Symbol": last_300[i].symbol,
                    "Tags": last_300[i].tags,
                    "logo": last_300[i].logoURI,
                    "Extrensions":last_300[i].extensions,
                    "Category": "Defi"
                    })
            }
            //////////////////////////////////////////////////
        
            //////////////////////////////////////////////////
            const regex_wallet = [/wallet/, /stor/, /custod/];
            const tags_wallet = last_300[i].tags;
        
            if(regex_wallet.some(rx => rx.test(tags_wallet))==true){
                wallet_tokens.push({
                    "Address":last_300[i].address,
                    "Name": last_300[i].name,
                    "Symbol": last_300[i].symbol,
                    "Tags": last_300[i].tags,
                    "logo": last_300[i].logoURI,
                    "Extrensions":last_300[i].extensions,
                    "Category": "Wallet"
                    })
            }
            //////////////////////////////////////////////////
        
        
            //////////////////////////////////////////////////
            const regex_meme = [/meme/, /NFT/];
            const tags_meme = last_300[i].tags;
        
            if(regex_meme.some(rx => rx.test(tags_meme))==true){
                meme_tokens.push({
                    "Address":last_300[i].address,
                    "Name": last_300[i].name,
                    "Symbol": last_300[i].symbol,
                    "Tags": last_300[i].tags,
                    "logo": last_300[i].logoURI,
                    "Extrensions":last_300[i].extensions,
                    "Category": "Meme"
                    })
            }
            //////////////////////////////////////////////////
        
        
            //////////////////////////////////////////////////
            if( last_300[i]['tags'] == null){
                notag_tokens.push({
                    "Address":last_300[i].address,
                    "Name": last_300[i].name,
                    "Symbol": last_300[i].symbol,
                    "Tags": last_300[i].tags,
                    "logo": last_300[i].logoURI,
                    "Extrensions":last_300[i].extensions,
                    "Category": "No Tag"
                    })
            }
            //////////////////////////////////////////////////
        
        
            }
        
        
        
        
            console.log(game_tokens);












                all_data.push({
                    "Game": game_tokens,
                    "Wallet": wallet_tokens,
                    "Defi":defi_tokens,
                    "Meme": meme_tokens,
                    "No_Tag": notag_tokens
                })












              this.setState({ fetchedData: all_data }); // setState sets the component state with the data from the API response
          })
          .catch(function(error) {
              console.log(JSON.stringify(error));
          });
  }



    render() {
      if(!this.state.fetchedData){ // only do the fetch if there is no fetchedData already (BTW this will run many times if the API is unavailable, or 'fetchIt() encounters an error)
          this.fetchIt();
    }



    return (
        <>
        <div>        
            {console.log("TUPUTAMADRETABLADELORTO")}
        </div>

        <div>
            <div>
                <div>
                    {
                        this.state.fetchedData ? `fetched ${this.state.fetchedData.length} entries`  : 'no data' // This is a 'ternary' expression, a simple 'if->else'
                        /* equivalent to:

                            if(this.state.fetchedData) {
                                return `fetched ${this.state.fetchedData.length} entries`; // this is 'javascript string interpolation'
                            } else {
                                return 'no data';
                            }
                        *
                        * */
                    }
                </div>

                <div className="app-container"> Game tags !
                    <table>
                        <thead>
                            <tr>
                                <th>Token</th>
                                <th>Tikker</th>
                                <th>Description</th>
                                <th>Adress</th>
                                <th>Extensions</th>
                            </tr>
                        </thead>


                        <tbody>


                            {this.state.fetchedData.Game.map((token)=>{
                                return(
                                    <tr>
                                        <td>{token.logo}</td>
                                        <td>{token.Symbol}</td>
                                        <td>{token.Name}</td>
                                        <td>{token.Address}</td>
                                        <td>{token.Extrensions}</td>
                                    </tr>
                                )}
                            )}


                        </tbody>
                    </table>
                </div>
            </div> 

        </div>
        </>   
            
    );
  }
}

export default App;