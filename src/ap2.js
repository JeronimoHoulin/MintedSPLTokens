import react from 'react';


function App() {

  //--- J S ---\\
  let url ="https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json"
  let text1='';


  fetch(url)
  .then(response => response.json())

    .then(data => {
    let token = data.tokens;
    //console.log(token);
    const last_300 = token.slice(-300);
    //console.log(token.length);
    text1 = `There are currently ${token.length} SPL tokens in the Solana ecosystem. We will use the last ${last_300.length}`;
    //Define our rendered tokens by tags
    console.log(last_300[188].tags);

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

  })
  .catch((error) => {
    console.error('Error:', error);
  });


  return (
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


            {game_tokens.map((token)=>{
              return(
                  <tr>
                      <td>{token.logo}</td>
                      <td>{token.Symbol}</td>
                      <td>{token.Name}</td>
                      <td>{token.Address}</td>
                      <td>{token.Extrensions}</td>
                  </tr>
                )
            }
            )}


          </tbody>
        </table>
      </div>
    );
}

export default App;
