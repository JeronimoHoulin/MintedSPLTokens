import React, { useEffect, useState, useMemo } from 'react'
import axios from "axios";
const parse = require('html-react-parser');

//import {COLUMNS} from './notag_cols'
//import {useTable} from 'react-table'

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

  
function NotagFetch (){

    const [show, setShow] = useState(false)
    
    const [notagdict, setNotagdict] = useState([]) 

    let [table, setTable] = useState("")


    let notag_tokens = [];
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

            const token_300 = token_list.slice(-500);


            for(let i=0; i<token_300.length; i++){

                //////////////////////////////////////////////////
                if(token_300[i]['tags'] == null){
                    
                    notag_tokens.push({
                        ID:i,
                        Address:token_300[i].address,
                        Name: token_300[i].name,
                        Symbol: token_300[i].symbol,
                        Tags: token_300[i].tags,
                        logo: token_300[i].logoURI,
                        Extensions:token_300[i].extensions,
                        Timestamp: "Loading...",
                        Category: "Notag"
                      })
                }

            }

            let time_arr = []
            //console.log(notagz)

            for(let i=0; i<notag_tokens.length;i++){
                adrs_arr.push(notag_tokens[i].Address)
            }
            //console.log(adrs_arr)


            if(notag_tokens.length !== 0){

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
                            
                            //PUSH INTO NOTAG DICTIONARY
                            notag_tokens[i]["Timestamp"] = timest

                        }else{
                            time_arr.push("No time found...")
                        }


                        setNotagdict(notag_tokens)

                        ////////////////////////////////////////////////////////////////////////////////////// TABLE

                        //Set table
                            let _html = `<tr class="header">
                            <th style="width:10%;">Logo</th>
                            <th style="width:10%;">Symbol</th>
                            <th style="width:10%;">Name</th>
                            <th style="width:10%;">Address</th>
                            <th style="width:10%;">Tags</th>
                            <th style="width:10%;">Extensions</th>
                            <th style="width:10%;">Timestamp</th>
                            </tr>`;

                            for(let i = 0; i < notag_tokens.length; i++){
                                [notag_tokens[i].Extensions].map(links=>{
                                    var linksy = []

                                    if(links){
                                        //console.log(links.website)
                                        let stringit = []
                                        if (links.website) {
                                            stringit += `<a style="text-decoration: none; color:black;" 
                                            href="${links.website}">&#127760; // </a>`
                                        }if (links.discord) {
                                            stringit += `<a style="text-decoration: none; color:black;" 
                                            href="${links.discord}">&#128483; DI // </a>`
                                            
                                        }if (links.telegram) {
                                            stringit += `<a style="text-decoration: none; color:black;" 
                                            href="${links.telegram}">&#128488; TG// </a>`
                                            
                                        }if (links.youtube) {
                                            stringit += `<a style="text-decoration: none; color:black;" 
                                            href="${links.youtube}">&#127909; // </a>`
                                            
                                        }if (links.twitter) {
                                            stringit += `<a style="text-decoration: none; color:black;" 
                                            href="${links.twitter}">&#128037; // </a>`
                                            
                                        }if (links.assetContract) {
                                            stringit += `<a style="text-decoration: none; color:black;"
                                            href="${links.assetContract}">&#128196; // </a>`

                                        }if (links.medium) {
                                            stringit += `<a style="text-decoration: none; color:black;"
                                            href="${links.medium}"> Medium // </a>`

                                        }if (links.whitepaper) {
                                            stringit += `<a style="text-decoration: none; color:black;"
                                            href="${links.whitepaper}"> Whitepaper // </a>`

                                        }
                                        
                                        
                                        
                                        linksy.push(stringit)
                                    }

                                let timestampx = null
                                if(typeof notag_tokens[i].Timestamp === 'string'){
                                    timestampx = notag_tokens[i].Timestamp
                                }else{ timestampx =convertUnixTime(notag_tokens[i].Timestamp)}

                                _html += `<tr>
                                            <td><img src="${notag_tokens[i].logo}" width="34" height="35"/></td>
                                            <td>${notag_tokens[i].Symbol}</td>
                                            <td>${notag_tokens[i].Name}</td>
                                            <td>${notag_tokens[i].Address}</td>
                                            <td>${notag_tokens[i].Tags}</td>
                                            <td>${
                                                linksy
                                            }</td>
                                            <td>${
                                                timestampx
                                            }</td>
                                        </tr>`;

                                    })


                            }

                            setTable(_html)


















                    })                
                }




                //SET INTERVAL FUNCTION TO RUN COLECTOR

                setInterval(function () { 
                    if(counter <= adrs_arr.length){

                        getTimer(counter);

                        counter+=1
                        
                    }else{clearInterval()}

                }, 1000);

            } 




        })
        .catch((error) => {
          console.error('The error is:', error);
        });




    }, [])



    //JSON.stringify(notagdict)

    return(

        <div className="notagtable">

            <h2>{`There are ${notagdict.length} newly minted NOTAG tokens.`}</h2>
            <button onClick={() => setShow(!show)}>
                Toggle: {show ? 'Hide' : 'Show'}
            </button>    

            {

            show && 
                <div className = "notag_table">
                    
                    { // THE TABLE

                    <table>
                        {parse(table)}
                    </table>

                    }
                    
                </div>
            
            }
        </div>
    )

}

export default NotagFetch