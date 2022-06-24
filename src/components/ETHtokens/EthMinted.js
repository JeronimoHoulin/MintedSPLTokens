import React, {useState, useEffect, createContext, useContext} from 'react';

const ETHcontext = createContext();

function EthMinted({children}) {

    const [data, setData] = useState()

    // ETH TOKENS

    useEffect(() => {
        const fetchETHData = async () => {
    
          try {

            fetch('https://api.ethplorer.io/getTokensNew?apiKey=EK-ta3i1-PxtLNoE-S9CGy')
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                setData(data)
            })
            .catch(error =>console.log(error))

          } catch (error) {
            console.log(error)
          }
        };
    
        fetchETHData();
    }, []);

    //console.log(data)
        
    return (
        <>
        <ETHcontext.Provider value={{data}}>
            {children}
        </ETHcontext.Provider>
            
        </>
    );
}


export default EthMinted;




export function useEthAPI() {
    const context = useContext(ETHcontext);
    if (context === undefined) {
      throw new Error("Context must be used within a Provider");
    }
    return context;
  }

  export const MyConsumer = ETHcontext.Consumer;