import React, { useEffect, useState, useMemo } from 'react'
import axios from "axios";
import "./game.css";
import { type } from '@testing-library/user-event/dist/type';

const parse = require('html-react-parser');


function convertUnixTime(unix) {
    if(typeof unix === 'string'){
        return("Loading...")
    }
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
    const [checked, setChecked] = useState([]);

// Add/Remove checked item from list
const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";






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


                function getTimer(i){

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


/*
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

        let timestampx = null
        if(typeof game_tokens[i].Timestamp === 'string'){
            timestampx = game_tokens[i].Timestamp
        }else{ timestampx =convertUnixTime(game_tokens[i].Timestamp)}

        _html += `<tr>
                    <td><img src="${game_tokens[i].logo}" width="34" height="35"/></td>
                    <td>${game_tokens[i].Symbol}</td>
                    <td>${game_tokens[i].Name}</td>
                    <td>${game_tokens[i].Address}</td>
                    <td>${game_tokens[i].Tags}</td>
                    <td>${
                        linksy
                    }</td>
                    <td>${
                        timestampx
                    }</td>
                    <td style="text-align:center">
                    <label class="switch">
                        <input type="checkbox" focus 
                            name=${game_tokens[i].Address} 
                            value=${game_tokens[i].Address}  
                            onChange={${handleChange()}}>
                        <span class="slider round"></span>
                    </label>
                </td>
                </tr>`;

            })


    }
*/

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



                        {gamedict.map((item) => (
                            <tr>
                                <img src={`${item.logo}`} width="34" height="35"></img>
                                <td>{item.Symbol}</td>
                                <td>{item.Name}</td>
                                <td>{item.Address}</td>
                                <td>{item.Tags}</td>
                                <input value={item.Address} type="checkbox" onChange={handleCheck} />
                                <span className={isChecked(item.Address)}>{item.Symbol}</span>
                            </tr>
                        ))}


                        


                    </table>
                    
                </div>
            
            }
        </div>
    )

}

export default GameFetch