import React, { useEffect, useState } from 'react'
//import { DATA } from './Fetcher'

//console.log("THIS IS DATA" + DATA)

function DataFetch (){

    const [tokens, setTokens] = useState([]) //tokens will be the name of the vriable to map in the rendering
    const [tokenz, setTokenz] = useState([]) 

    useEffect(() => { 
        let url ="https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json"
        fetch(url)
        .then(response => response.json())
        .then(data => {
            //console.log(data.tokens)
            let token_list = data.tokens;
            //console.log(token_list.length);
            setTokens(token_list);
                                  //NOW THE TOKENS ARE ALL ADED TO " tokens "

            const token_300 = token_list.slice(-500);

            setTokenz(token_300)

        
        
        })
        .catch((error) => {
          console.error('The error is:', error);
        });
        

    }, [])


    ///return (divs)
    return(
        <div>
            <h1>
                {`There are currently ${tokens.length} SPL tokens in the Solana ecosystem.`}
            </h1>

            <p1>Set your range:  </p1>

            <input
                type="number"
                min={0}
                max={tokens.length}
                step={1}
                value={num}
                onChange={e => setNum(e.target.value)}
            />

            <h2>
                {`We will use the last ${num}.`}
            </h2>

        </div>
    )

}

export default DataFetch