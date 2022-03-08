import React, { useEffect, useState, useMemo } from 'react'
import axios from "axios";
import {COLUMNS} from './game_cols'
import {useTable} from 'react-table'


function GameFetch (){

    const [show, setShow] = useState(false)

    const [gamedict, setGamedict] = useState([]) 



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


            let game_tokens = [];
            let adrs_arr = []



            for(let i=0; i<token_300.length; i++){

                //////////////////////////////////////////////////
                const regex_game = [/utility/, /game/, /p2e/, /play/, /p2e/];
                const tags_game = token_300[i].tags;
                //let matchin = regex_game.some(rx => rx.test(tags));
                //console.log(matchin);
            
                if(regex_game.some(rx => rx.test(tags_game))===true){
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
            console.log(adrs_arr)



            if(game_tokens.length>0){
                let from = 0
                let to = game_tokens.length

                async function getTimer(from){
                    if(from<to){
                    
                        await axios.all(adrs_arr.slice(from,from+5).map((adresx) => axios.get(`https://public-api.solscan.io/account/transactions?account=${adresx}`))).then(
                            (data) => {
                                //console.log(data);
                                data.map((item)=>{
                                    if(item.data.length > 0){
                                        //console.log(item.data)
                                        let timest = item.data[item.data.length-1].blockTime;
                                        var date = new Date(timest * 1000);

                                        var month = date.getUTCMonth();
                                        var day = date.getUTCDay();
                                        var year =date.getUTCFullYear();
                                        var hours = date.getHours();
                                        var minutes = "0" + date.getMinutes();
                                        var seconds = "0" + date.getSeconds();
                                        
                                        // Will display time in 10:30:23 format
                                        var formattedTime =  year +"/"+ month +"/"+day +"  "+ hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);                                    //console.log(timest)
                                        
                                        time_arr.push(formattedTime)

                                    }else{
                                        time_arr.push("No time found...")

                                    }
                                    
                                })
                                
                            }
                        );
                    }
                    from +=5

                    for(let i=0; i<game_tokens.length;i++){
                        game_tokens[i]["Timestamp"] = time_arr[i]
                    }
        
                    let game_dict = game_tokens
                    setGamedict(game_dict)

                    console.log(game_dict)
                }

                setInterval(function () { getTimer(from, to); }, 4500);



            }  




        })
        .catch((error) => {
          console.error('The error is:', error);
        });




    }, [])


    
    console.log(gamedict.length)
    
    const columns = useMemo(()=> COLUMNS, [])
    const data = useMemo(()=>gamedict)

    //console.log(data)

    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps,
        getTbableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance

    return(
        <div className="gametable">

            <h2>{`There are ${gamedict.length} newly minted GAME tokens.`}</h2>
            <button onClick={() => setShow(!show)}>
                Toggle: {show ? 'Hide' : 'Show'}
            </button>    

            {

            show && 
                <div className = "game_table">
                      {JSON.stringify(gamedict)}
                    <table {...getTableProps()}>
                      <thead>
                          {
                              headerGroups.map((headerGroup)=>(
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderGroupProps()}>
                                                {column.render('Header')}
                                            </th>
                                        ))}

                            </tr>
                        ))}
                      </thead>

                      <tboady {...getTbableBodyProps()}>
                          {
                              rows.map((row)=> {
                                  prepareRow(row)
                                  return (                        
                                  <tr {...row.getRowProps}>
                                    {
                                      row.cells.map((cell)=>{
                                        return <td {...cell.getCellProps}>{cell.render('cell')}</td>
                                      })
                                    }
                                </tr>)
                              })
                          }

                      </tboady>
                    </table>
                </div>
            
            }
        </div>

    )

}

export default GameFetch