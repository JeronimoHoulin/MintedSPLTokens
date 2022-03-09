import React, { useEffect, useState, useMemo } from 'react'
import axios from "axios";
import {COLUMNS} from './game_cols'
import {useTable} from 'react-table'

//THIS WILL BE THE RENDERED DICT IN RETURN

function GameFetch (){

    const [show, setShow] = useState(false)

    //const [gamedict, setGamedict] = useState([]) 
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

            const token_300 = token_list.slice(-500);





            for(let i=0; i<token_300.length; i++){

                //////////////////////////////////////////////////
                const regex_game = [/utili/, /game/, /p2e/, /play/, /p2e/];
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
            //console.log(adrs_arr)


            if(game_tokens.length != 0){

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
                            console.log(time_arr)
                            
                            //console.log(timest)
                            
                            //PUSH INTO GAME DICTIONARY
                            game_tokens[i]["Timestamp"] = timest

                            //console.log(game_tokens)
                            //Final_game_Dict.push(game_tokens)

                        }else{
                            time_arr.push("No time found...")
                        }
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


            /*
            let game_dict = game_tokens
            setGamedict(game_dict)

            console.log(game_dict)
            */



        })
        .catch((error) => {
          console.error('The error is:', error);
        });




    }, [])


    
    console.log(game_tokens)
    
    const columns = useMemo(()=> COLUMNS, [])
    const data = useMemo(()=>game_tokens)

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

            <h2>{`There are ${game_tokens.length} newly minted GAME tokens.`}</h2>
            <button onClick={() => setShow(!show)}>
                Toggle: {show ? 'Hide' : 'Show'}
            </button>    

            {

            show && 
                <div className = "game_table">
                      {JSON.stringify(game_tokens)}
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