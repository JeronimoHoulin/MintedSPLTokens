import React, { useEffect, useState } from 'react'
const parse = require('html-react-parser');


function NotagFetch (){

    const [notagz, setNotagz] = useState([]) 
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


            let notag_tokens = [];


            for(let i=0; i<token_300.length; i++){

                //////////////////////////////////////////////////
            
                if(token_300[i]['tags'] == null){
                    notag_tokens.push({
                        "Address":token_300[i].address,
                        "Name": token_300[i].name,
                        "Symbol": token_300[i].symbol,
                        "Tags": token_300[i].tags,
                        "logo": token_300[i].logoURI,
                        "Extensions":token_300[i].extensions,
                        "Category": "Notag"
                      })
                }
                //////////////////////////////////////////////////
            }
            //set Notag tokens
            setNotagz(notag_tokens)    



            //Set table
            let _html = `<tr class="header">
                <th style="width:10%;">Logo</th>
                <th style="width:15%;">Symbol</th>
                <th style="width:5%;">Name</th>
                <th style="width:5%;">Address</th>
                <th style="width:20%;">Tags</th>
                <th style="width:20%;">Extensions</th>
            </tr>`;

            for(let i = 0; i < notag_tokens.length; i++){
                [notag_tokens[i].Extensions].map(links=>{
                    var linksy = []
                    if(links){
                        console.log(links)
                        linksy.push(links)
                    }


                _html += `<tr>
                            <td><img src="${notag_tokens[i].logo}" width="34" height="35"/></td>
                            <td>${notag_tokens[i].Symbol}</td>
                            <td>${notag_tokens[i].Name}</td>
                            <td>${notag_tokens[i].Address}</td>
                            <td>${notag_tokens[i].Tags}</td>

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
    //console.log(notagz)

    ///return (divs)
    return(
        <div className="notagtable">
            <h2>{`There are ${notagz.length} newly minted NO TAG tokens.`}</h2>
            <button
                onClick={() => setShow(!show)}
            >
                Toggle: {show ? 'Hide' : 'Show'}
            </button>    

            {

            show && 
                <div className = "notag_table">
                    <table>
                        {parse(table)}
                    </table>
                </div>
            
            }
        </div>

    )

}

export default NotagFetch