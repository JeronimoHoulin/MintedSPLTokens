import React, { useEffect, useState } from 'react'
const parse = require('html-react-parser');


function DefiFetch (){

    const [defiz, setDefiz] = useState([]) 
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


            let defi_tokens = [];


            for(let i=0; i<token_300.length; i++){

                //////////////////////////////////////////////////
                const regex_defi = [/fin/, /defi/, /earn/, /money/, /inter/];
                const tags_defi = token_300[i].tags;
                //let matchin = regex_defi.some(rx => rx.test(tags));
                //console.log(matchin);
            
                if(regex_defi.some(rx => rx.test(tags_defi))===true){
                    defi_tokens.push({
                        "Address":token_300[i].address,
                        "Name": token_300[i].name,
                        "Symbol": token_300[i].symbol,
                        "Tags": token_300[i].tags,
                        "logo": token_300[i].logoURI,
                        "Extensions":token_300[i].extensions,
                        "Category": "Defi"
                      })
                }
                //////////////////////////////////////////////////
            }
            //set Defi tokens
            setDefiz(defi_tokens)    



            //Set table
            let _html = `<tr class="header">
                <th style="width:10%;">Logo</th>
                <th style="width:15%;">Symbol</th>
                <th style="width:5%;">Name</th>
                <th style="width:5%;">Address</th>
                <th style="width:20%;">Tags</th>
                <th style="width:20%;">Extensions</th>
            </tr>`;

            for(let i = 0; i < defi_tokens.length; i++){
                [defi_tokens[i].Extensions].map(links=>{
                    var linksy = []
                    if(links){
                        console.log(links)
                        linksy.push(links)
                    }


                _html += `<tr>
                            <td><img src="${defi_tokens[i].logo}" width="34" height="35"/></td>
                            <td>${defi_tokens[i].Symbol}</td>
                            <td>${defi_tokens[i].Name}</td>
                            <td>${defi_tokens[i].Address}</td>
                            <td>${defi_tokens[i].Tags}</td>

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
    //console.log(defiz)

    ///return (divs)
    return(
        <div className="defitable">
            <h2>{`There are ${defiz.length} newly minted DEFI tokens.`}</h2>
            <button
                onClick={() => setShow(!show)}
            >
                Toggle: {show ? 'Hide' : 'Show'}
            </button>    

            {

            show && 
                <div className = "defi_table">
                    <table>
                        {parse(table)}
                    </table>
                </div>
            
            }
        </div>

    )

}

export default DefiFetch