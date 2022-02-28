import React, { useEffect, useState } from 'react'
const parse = require('html-react-parser');


function MetaverseFetch (){

    const [metaversez, setMetaversez] = useState([]) 
    const [show, setShow] = useState(false)
    let [table, setTable] = useState("")
    //let [extensions, setExt] = useState("")

    useEffect(() => { 
        let url ="https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json"
        fetch(url)
        .then(response => response.json())
        .then(data => {
            //console.log(data.tokens)
            let token_list = data.tokens;
            //console.log(token_list.length);
                                  //NOW THE TOKENS ARE ALL ADED TO " tokens "

            const token_300 = token_list.slice(-300);


            let metaverse_tokens = [];


            for(let i=0; i<token_300.length; i++){

                //////////////////////////////////////////////////
                const regex_metaverse = [/meta/, /metaverse/, /verse/, /vr/];
                const tags_metaverse = token_300[i].tags;
                //let matchin = regex_metaverse.some(rx => rx.test(tags));
                //console.log(matchin);
            
                if(regex_metaverse.some(rx => rx.test(tags_metaverse))===true){
                    metaverse_tokens.push({
                        "Address":token_300[i].address,
                        "Name": token_300[i].name,
                        "Symbol": token_300[i].symbol,
                        "Tags": token_300[i].tags,
                        "logo": token_300[i].logoURI,
                        "Extensions":token_300[i].extensions,
                        "Category": "Metaverse"
                      })
                }
                //////////////////////////////////////////////////
            }
            //set Metaverse tokens
            setMetaversez(metaverse_tokens)    



            //Set table
            let _html = `<tr class="header">
                <th style="width:10%;">Logo</th>
                <th style="width:15%;">Symbol</th>
                <th style="width:5%;">Name</th>
                <th style="width:5%;">Address</th>
                <th style="width:20%;">Tags</th>
                <th style="width:20%;">Extensions</th>
            </tr>`;

            for(let i = 0; i < metaverse_tokens.length; i++){
                [metaverse_tokens[i].Extensions].map(links=>{
                    var linksy = []
                    if(links){
                        //console.log(links.website)
                        let stringit = []
                        if (links.website) {
                            stringit += `<a href="${links.website}">WEB //</a>`
                        }if (links.discord) {
                            stringit += `<a href="${links.discord}">DI //</a>`
                            
                        }if (links.telegram) {
                            stringit += `<a href="${links.telegram}">TG //</a>`
                            
                        }if (links.youtube) {
                            stringit += `<a href="${links.youtube}">YOU //</a>`
                            
                        }if (links.twitter) {
                            stringit += `<a href="${links.twitter}">TW //</a>`
                            
                        }
                        
                        
                        linksy.push(stringit)
                    }


                _html += `<tr>
                            <td><img src="${metaverse_tokens[i].logo}" width="34" height="35"/></td>
                            <td>${metaverse_tokens[i].Symbol}</td>
                            <td>${metaverse_tokens[i].Name}</td>
                            <td>${metaverse_tokens[i].Address}</td>
                            <td>${metaverse_tokens[i].Tags}</td>

                            <td>${
                                linksy
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
    //console.log(metaversez)

    ///return (divs)
    return(
        <div className="metaversetable">
            <h2>{`There are ${metaversez.length} newly minted METAVSERSE tokens.`}</h2>
            <button
                onClick={() => setShow(!show)}
            >
                Toggle: {show ? 'Hide' : 'Show'}
            </button>    

            {

            show && 
                <div className = "metaverse_table">
                    <table>
                        {parse(table)}
                    </table>
                </div>
            
            }
        </div>

    )

}

export default MetaverseFetch