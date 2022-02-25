import react, {useEffect, useState} from 'react'

const App = () =>{ //THIS is the component "App" which stores the states (data)



    const [tokens_by_vertical, setTokens] = useState([]); //todavía no llegaron los datos de la API...//the first is the STATE


    useEffect(() =>{ //THIS will shoot when the page is loaded.
        console.log("ANANASHI");
        GetToknes()

    }, []) //THIS makes it stop itterating..


    //LLAMAR A LA API
    const GetToknes = async () =>{

        const data = await fetch('https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json')
        const spls = await data.json()
        //console.log(spls)

        const last_300 = spls.tokens.slice(-300);
        //console.log(last_300)
        //console.log(token.length);
        let text1 = `There are currently ${spls.length} SPL tokens in the Solana ecosystem. We will use the last ${last_300.length}`;
        //Define our rendered tokens by tags
        //console.log(last_300[188].tags);

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















        setTokens([game_tokens])
    }


    return(

        <div>
            <h1>SPL Token Registry!</h1>
            <ul>
                {

                    
                tokens_by_vertical.map(item =>{
                    {
                        console.log(item)
                        let listy = ``;
                        listy = listy+ `<li> Symbol: ${item.Symbol}, Address: ${item.Address}, Tags: ${item.Tags}`

                    }

                    return(
                        <div>
                            <h2>{item["Category"]}!</h2>
                            <ul>{listy}</ul>
                        </div>
                    )


                })

                }
            </ul>
        </div>
    )



}

export default App