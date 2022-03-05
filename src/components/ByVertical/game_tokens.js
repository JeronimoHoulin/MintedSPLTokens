import React, { useEffect, useState } from 'react'
import axios from "axios";

const parse = require('html-react-parser');

let game_tokens = [];


function GameFetch (){

    const [gamez, setGamez] = useState([]) 
    const [adressez, setAdressez] = useState([])
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

            const token_300 = token_list.slice(-500);

            for(let i=0; i<token_300.length; i++){

                //////////////////////////////////////////////////
                const regex_game = [/utility/, /game/, /p2e/, /play/, /p2e/];
                const tags_game = token_300[i].tags;
                //let matchin = regex_game.some(rx => rx.test(tags));
                //console.log(matchin);
            
                if(regex_game.some(rx => rx.test(tags_game))===true){
                    game_tokens.push({
                        "Address":token_300[i].address,
                        "Name": token_300[i].name,
                        "Symbol": token_300[i].symbol,
                        "Tags": token_300[i].tags,
                        "logo": token_300[i].logoURI,
                        "Extensions":token_300[i].extensions,
                        "Category": "Game"
                    })
                }
                //////////////////////////////////////////////////
            }
            //set game tokens
            setGamez(game_tokens)    



            //Set table
            let _html = `<tr class="header">
                <th style="width:10%;">Logo</th>
                <th style="width:15%;">Symbol</th>
                <th style="width:5%;">Name</th>
                <th style="width:5%;">Address</th>
                <th style="width:20%;">Tags</th>
                <th style="width:20%;">Extensions</th>
                <th style="width:20%;">Timestamp</th>

            </tr>`;

            for(let i = 0; i < game_tokens.length; i++){

                [game_tokens[i].Extensions].map(links=>{
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

                _html += `<tr>
                            <td><img src="${game_tokens[i].logo}" width="34" height="35"/></td>
                            <td>${game_tokens[i].Symbol}</td>
                            <td>${game_tokens[i].Name}</td>
                            <td class = "NASHI">${game_tokens[i].Address}</td>
                            <td>${game_tokens[i].Tags}</td>

                            <td>${
                                linksy
                            }</td>
                            <td>{
                                
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



    //console.log(parse(table))

    let reactTable = parse(table)

    let links_arr = []
    let adrs_arr = []
    let time_arr = []
    
    const [intel, setIntel] =useState([])
    useEffect(() => { 
        reactTable.map((item)=>{
            //console.log(item)
            if(item.key === "0"){
                //console.log(item)
            }else{
                //console.log(item.props.children[3].props.children)
                //HERE I GET THE ADDRESSES
                //console.log(item.props.children[6].props.children)
                //HERE I APPEND THE TIMESTAMPS
                adrs_arr.push(item.props.children[3].props.children)
                links_arr.push(`https://public-api.solscan.io/account/transactions?account=${item.props.children[3].props.children}`)
            }
        })

        console.log(adrs_arr)


        function getAllData(links_arr){
            return Promise.all(links_arr.map(fetchData));
        }
        
        async function fetchData(URL) {
            try {
                const response = await axios
                    .get(URL);
                return {
                    success: true,
                    data: response.data
                };
            } catch (error) {
                return { 
                    success: false,
                    data:"nodatefound"
                };
            }
        }
        
        getAllData(links_arr.slice(0,5)).then(resp=>{
            console.log(resp)
            for(let i=0; i<resp.length;i++){       
                try{     
                    let data = resp[i].data
                    let timest = data[data.length-1].blockTime
                    //console.log(timest)
                    time_arr.push(timest)

                    
                    setIntel(timest)
                    console.log(time_arr)
                    return [timest, null]
                    
                }catch(e){return ["No date found", e]}
            }

            }).catch(e=>{console.log(e)})

        //console.log(time_arr)

    }, [])


    return(
        <div className="gametable">

            <h2>{`There are ${gamez.length} newly minted GAME tokens.`}</h2>
            <button
                onClick={() => setShow(!show)}
            >
                Toggle: {show ? 'Hide' : 'Show'}
            </button>    

            {

            show && 
                <div className = "game_table">
                    <table>
                        {parse(table)}
                    </table>
                </div>
            
            }
        </div>

    )

}

export default GameFetch