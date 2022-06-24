import React, { useEffect, useState, useMemo } from 'react'
import axios from "axios";
import "./meme.css";

import {db} from '../../../firebase'
import { collection, doc, getDocs, setDoc } from "firebase/firestore"; 


const parse = require('html-react-parser');


function convertUnixTime(unix) {
    if(typeof unix === 'string'){
        return("Loading...")
    }
    let a = new Date(unix * 1000),
        year = a.getFullYear(),
        months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
        month = months[a.getMonth()],
        date = a.getDate()

    return `${month} ${date}, ${year}`;
  }

  
function MemeFetch (){

    const [show, setShow] = useState(false)
    const [memedict, setMemedict] = useState([]) 

    const [infox, setInfo] = useState([])
    const [preshow, setPreshow] = useState([])
    const infocollectionRef = collection(db, 'memetokens')

    const [checked, setChecked] = useState([]);
    const [unchecked, setUnchecked] = useState([]);


    async function updateFiret(adrsxy) {
        //await addDoc(infocollectionRef,{address: 'anasheei2225345', viewed: true});
        // Add a new document in collection "memetokens" with id 'addressX'
        await setDoc(doc(db, "memetokens", adrsxy), {
            address: adrsxy,
            viewed: true
        });
    }

    async function updateFiref(adrsxy) {
        //await addDoc(infocollectionRef,{address: 'anasheei2225345', viewed: true});
        // Add a new document in collection "memetokens" with id 'addressX'
        await setDoc(doc(db, "memetokens", adrsxy), {
            address: adrsxy,
            viewed: false
        });
    }


    useEffect(()=>{
        const getInfo = async () => {
            const info = await getDocs(infocollectionRef)
            //console.log(info)
            setInfo(info.docs.map((doc) => ({...doc.data(), id: doc.id})))
            infox.map((info) => {
                //console.log(info)
                if(info.viewed == true){
                    setPreshow(info.address)
                }
            })

        }
        getInfo(); 

    }, [])

    //console.log(preshow)

    ///////// UPDATE LIST OF CHECKED ITEMS TO FIREBASE
    //console.log(unchecked)

    checked.map((adrs)=>{
        //console.log(adrs)
        updateFiret(adrs)
    })

    unchecked.map((adrs)=>{
        //console.log(adrs)
        updateFiref(adrs)

    })





    // Add/Remove checked item from list
    function handleCheck(event) {
        var updatedList = [...checked];
        var unupdatedList = [...unchecked];

        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        }else if(!event.target.checked){
            //if UNchecked
            unupdatedList = [...unchecked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        //console.log(updatedList);
        setChecked(updatedList);
        setUnchecked(unupdatedList);

    }


    // Generate string of checked items
    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";

    // Return classes based on whether item is checked
    var isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";






    let meme_tokens = [];
    let adrs_arr = []


    useEffect(() => { 
        let url ="https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json"
        fetch(url)
        .then(response => response.json())
        .then(data => {
            //console.log(data.tokens)
            let token_list = data.tokens;
            //console.log(token_list.length);
                                  //NOW THE TOKENS ARE ALL ADED TO " tokens "

                                  
            const token_300 = token_list.slice(-1500);
            //console.log(token_300)


            for(let i=0; i<token_300.length; i++){

                //////////////////////////////////////////////////
                const regex_meme = [/fun/, /meme/, /joke/, /gif/];
                const tags_meme = token_300[i].tags;
                //let matchin = regex_meme.some(rx => rx.test(tags));
                //console.log(matchin);
            
                if(regex_meme.some(rx => rx.test(tags_meme))===true && token_300[i].extensions){
                    
                    meme_tokens.push({
                        ID:i,
                        Address:token_300[i].address,
                        Name: token_300[i].name,
                        Symbol: token_300[i].symbol,
                        Tags: token_300[i].tags,
                        logo: token_300[i].logoURI,
                        Extensions:token_300[i].extensions,
                        Timestamp: "Loading...",
                        Category: "Meme"
                      })
                }

            }

            let time_arr = []
            //console.log(memez)

            for(let i=0; i<meme_tokens.length;i++){
                adrs_arr.push(meme_tokens[i].Address)
            }
            //console.log(adrs_arr)


            if(meme_tokens.length !== 0){

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
                            
                            //PUSH INTO MEME DICTIONARY
                            meme_tokens[i]["Timestamp"] = convertUnixTime(timest)

                        }else{
                            meme_tokens[i]["Timestamp"] = "No time found..."
                        }

                        //console.log(time_arr.length)
                        //console.log(meme_tokens)
                        setMemedict(meme_tokens)
                        //console.log(memedict)

                        ////////////////////////////////////////////////////////////////////////////////////// TABLE

                        
                    })                
                }

                for(let i = 0; i < meme_tokens.length; i++){
                    [meme_tokens[i].Extensions].map(links=>{
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

                        meme_tokens[i]["Linkks"] = linksy



        

        
        
                })}


                setMemedict(meme_tokens)
                //console.log(memedict)

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


    //JSON.stringify(memedict)
    //console.log(memedict)

    infox.map((item)=>{
        //console.log(item)
        if(item.viewed === true){
            //console.log(item.address)

            memedict.map((itm)=>{
                if(itm.Address === item.address){
                    //console.log(itm.Address)
                    itm[`statez`] = 'checked'
                    //console.log(itm[`statez`])
                }
            })

        }

    })


    useEffect(()=>{
        setMemedict(memedict)
    }, [])




    return(

        <div className="memetable">

            <h2>{`There are ${memedict.length} newly minted MEME tokens.`}</h2>
            <button onClick={() => setShow(!show)}>
                Toggle: {show ? 'Hide' : 'Show'}
            </button>    

            {
            show && 
                <div className = "meme_table">
                    
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



                        {memedict.map((item) => (
                            <tr>
                                <img src={`${item.logo}`} width="34" height="35"></img>
                                <td>{item.Symbol}</td>
                                <td>{item.Name}</td>
                                <td>{item.Address}</td>
                                <td>{item.Tags}</td>
                                <td>{parse(`${item.Linkks}`)}</td>
                                <td>{item.Timestamp}</td>
                                <td>
                                    <input class="toggle" defaultChecked={item.statez} value={item.Address} id={item.Address} type="checkbox" onChange={handleCheck} />
                                </td>

                            </tr>
                        ))}


                        


                    </table>
                    
                </div>
            
            }
        </div>
    )

}

export default MemeFetch