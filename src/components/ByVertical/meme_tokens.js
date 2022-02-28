import React, { useEffect, useState } from 'react'
const parse = require('html-react-parser');


function MemeFetch (){

    const [memez, setMemez] = useState([]) 
    const [show, setShow] = useState(false)
    let [table, setTable] = useState("")
    //let [extensions, setExt] = useState("")

    useEffect(() => { 
        let url ="https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json"
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.tokens)
            let token_list = data.tokens;
            //console.log(token_list.length);
                                  //NOW THE TOKENS ARE ALL ADED TO " tokens "

            const token_300 = token_list.slice(-300);


            let meme_tokens = [];


            for(let i=0; i<token_300.length; i++){

                //////////////////////////////////////////////////
                const regex_meme = [/funny/, /meme/, /joke/, /gif/];
                const tags_meme = token_300[i].tags;
                //let matchin = regex_meme.some(rx => rx.test(tags));
                //console.log(matchin);
            
                if(regex_meme.some(rx => rx.test(tags_meme))===true){
                    meme_tokens.push({
                        "Address":token_300[i].address,
                        "Name": token_300[i].name,
                        "Symbol": token_300[i].symbol,
                        "Tags": token_300[i].tags,
                        "logo": token_300[i].logoURI,
                        "Extensions":token_300[i].extensions,
                        "Category": "Meme"
                      })
                }
                //////////////////////////////////////////////////
            }
            //set Meme tokens
            setMemez(meme_tokens)    



            //Set table
            let _html = `<tr class="header">
                <th style="width:10%;">Logo</th>
                <th style="width:15%;">Symbol</th>
                <th style="width:5%;">Name</th>
                <th style="width:5%;">Address</th>
                <th style="width:20%;">Tags</th>
                <th style="width:20%;">Extensions</th>
            </tr>`;

            for(let i = 0; i < meme_tokens.length; i++){
                [meme_tokens[i].Extensions].map(links=>{
                    var linksy = []
                    if(links){
                        console.log(links)
                        linksy.push(links)
                    }


                _html += `<tr>
                            <td><img src="${meme_tokens[i].logo}" width="34" height="35"/></td>
                            <td>${meme_tokens[i].Symbol}</td>
                            <td>${meme_tokens[i].Name}</td>
                            <td>${meme_tokens[i].Address}</td>
                            <td>${meme_tokens[i].Tags}</td>

                            <td>${
                                JSON.stringify(linksy)
                            }</td>
                        </tr>`;

                    })


            }

            setTable(_html)
            
            //console.log(table)
        })
        .catch((error) => {
          console.error('The error is:', error);
        });
        

    }, [])
    //console.log(memez)

    ///return (divs)
    return(
        <div className="memetable">
            <h2>{`There are ${memez.length} newly minted MEME tokens.`}</h2>
            <button
                onClick={() => setShow(!show)}
            >
                Toggle: {show ? 'Hide' : 'Show'}
            </button>    

            {

            show && 
                <div className = "meme_table">
                    <table>
                        {parse(table)}
                    </table>
                </div>
            
            }
        </div>

    )

}

export default MemeFetch