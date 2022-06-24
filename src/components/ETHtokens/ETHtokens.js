import React, { useState, useEffect } from 'react';
import {useEthAPI} from './EthMinted'

import axios from "axios";

function ETHtokens() {

    let elementz = []
    const [elements, setElements] = useState([])

    const {data} = useEthAPI();
    //console.log(data)
    useEffect(() => {
        
        const filterETHData = async () => {
    
            try {
  
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
        
                    //console.log(element.coingecko)
        
                    if (element.coingecko === undefined) {
                        //console.log(element)
        
                        if (element.address) {
                            //console.log(element.address)
                            elementz.push(element.address)
                        }
                    }
                    
                }

                //console.log(elementz)

                for (let i = 0; i < elementz.length; i++) {
                    console.log(elementz[i])

                    axios.get(`https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=${elementz[i]}&apikey=W6AW3WVVV6IJKGSDN6GGV1FMVTIS4VF8RV`)

                    .then((data)=>{
                        console.log(data);                        
                    })
                    .catch(error =>console.log(error)) 
                    
                }



  
            } catch (error) {
              console.log(error)
            }
          };
      
          filterETHData();

    }, []);


    
    return (
        <div>
            <h1>hey</h1>
        </div>
    );
}

export default ETHtokens;