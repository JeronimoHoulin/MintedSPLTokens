import React, { useEffect, useState, useMemo } from 'react'
import axios from "axios";
import "./game.css";

function convertUnixTime(unix) {
    let a = new Date(unix * 1000),
        year = a.getFullYear(),
        months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
        month = months[a.getMonth()],
        date = a.getDate(),
        hour = a.getHours(),
        min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
        sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    return `${month} ${date}, ${year}`;
  }

  
function GameFetch (){

    const [show, setShow] = useState(false)
    const [gamedict, setGamedict] = useState([]) 

    let game_tokens = [];
    let adrs_arr = []


    useEffect(() => { 
        let url ="https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json"
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.tokens)
            let token_list = data.tokens;
            //console.log(token_list.length);
                                  //NOW THE TOKENS ARE ALL ADED TO " tokens "

                                  
            const token_300 = token_list.slice(-800);
            console.log(token_300)


            for(let i=0; i<token_300.length; i++){

                //////////////////////////////////////////////////
                const regex_game = [/utili/, /game/, /p2e/, /play/, /p2e/];
                const tags_game = token_300[i].tags;
                //let matchin = regex_game.some(rx => rx.test(tags));
                //console.log(matchin);
            
                if(regex_game.some(rx => rx.test(tags_game))===true && token_300[i].extensions){
                    
                    game_tokens.push({
                        ID:i,
                        Address:token_300[i].address,
                        Name: token_300[i].name,
                        Symbol: token_300[i].symbol,
                        Tags: token_300[i].tags,
                        logo: token_300[i].logoURI,
                        Extensions:token_300[i].extensions,
                        Timestamp: "Loading...",
                        Category: "Game"
                      })
                }

            }

            let time_arr = []
            //console.log(gamez)

            for(let i=0; i<game_tokens.length;i++){
                adrs_arr.push(game_tokens[i].Address)
            }
            //console.log(adrs_arr)


            if(game_tokens.length !== 0){

                let counter = 0


                //STRT UP DATA COLECTING FUNCTION FOR EVERY ADDRESS IN ADR_ARR


                function getTimer(i) {



                    axios.get(`https://public-api.solscan.io/account/transactions?account=${adrs_arr[i]}`)

                    .then((data)=>{
                        //console.log(data);
                        let trades = data.data;
                        if(trades.length > 0){

                            let timest = trades[trades.length-1].blockTime
                            time_arr.push(timest)
                            
                            //console.log(timest)
                            
                            //PUSH INTO GAME DICTIONARY
                            game_tokens[i]["Timestamp"] = timest

                        }else{
                            time_arr.push("No time found...")
                        }

                        //console.log(time_arr.length)
                        //console.log(game_tokens)
                        setGamedict(game_tokens)

                        ////////////////////////////////////////////////////////////////////////////////////// TABLE

                        
                    })                
                }




                //SET INTERVAL FUNCTION TO RUN COLECTOR

                setInterval(function () { 
                    if(counter <= adrs_arr.length){

                        getTimer(counter);

                        counter+=1
                        
                    }else{clearInterval()}

                }, 1500);
            } 


        })
        .catch((error) => {
          console.error('The error is:', error);
        });




    }, [])



    //JSON.stringify(gamedict)
    console.log(gamedict)


    return(

        <div className="gametable">

            <h2>{`There are ${gamedict.length} newly minted GAME tokens.`}</h2>
            <button onClick={() => setShow(!show)}>
                Toggle: {show ? 'Hide' : 'Show'}
            </button>    

            {

            show && 
                <div className = "game_table">
                    
                    <table>
                        <tr class="header">
                            <th>Logo</th>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Tags</th>
                            <th>Extensions</th>
                            <th>Timestamp</th>
                            <th>Viewed</th>
                        </tr>

                        <tr>
                            
                        </tr>
                        
                    </table>
                    
                </div>
            
            }
        </div>
    )

}

export default GameFetch