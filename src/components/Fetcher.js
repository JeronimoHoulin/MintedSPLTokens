import headerone from './recivrr'
//console.log(headerone)
import React, { Component } from 'react';

class anashi extends Component {
  render() {
    const data = 'this shit is ur data mf';

    return (
      <div>
        <headerone yourdatax={data} />
      </div>
    );
  }
}

export default anashi



/*
import {Axios} from 'react'

fetchEmployeesAxios = () => {
    this.setState({...this.state, isFetching: true});
    Axios.get("https://domain.in/api/employees")
    .then(response => {
       this.setState({employees: response.data, isFetching:  false})
    })
    .catch(exception => {
       console.log(exception);
       this.setState({...this.state, isFetching: false});
    });
  };
  
  export default fetchEmployees = this.fetchEmployeesAxios; 
  
*/
/*
FetchDataAxios = () => {
    this.setState({...this.state, isFetching: true});
    axios.get("https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json")
    .then(response => {
       this.setState({Tokens: response.data.tokens, isFetching:  false})
    })
    .catch(exception => {
       console.log(exception);
       this.setState({...this.state, isFetching: false});
    });
  };
  
FetchData = this.FetchDataAxios;
*/
/*
export async function getSPLs () {

    const res = await fetch("https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json");
    const json = await res.json();
    const tokens = json.tokens
    return tokens;
}
export default {getSPLs};
*/





/*
import react from 'react'


const data_mini = ""
let url ="https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json"
fetch(url)
.then(response => response.json())
.then(data => {
    //console.log(data.tokens)
    let token_list = data.tokens;
    //console.log(token_list.length);
                        //NOW THE TOKENS ARE ALL ADED TO " tokens "
    data_mini.push(token_list)
    //console.log(data_mini)
})
.catch((error) => {
console.error('The error is:', error);
});



console.log("this is pre-data"+ data_mini)


export const DATA = data_mini
*/
/*
import React,{useEffect,useState} from 'react';
import axios from 'axios';

export const DATA=()=>{

    let data_mini = []
    useEffect(()=>{
        axios.get('https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json')
            .then(res=>{
                console.log(res)

                let token_list = res.tokens;
                //console.log(token_list.length);
                                    //NOW THE TOKENS ARE ALL ADED TO " tokens "
                data_mini.push(token_list)


            })
            .catch(err=>{
                console.log(err);
            })
    },[])
    return(
            data_mini
    )
}

export default DATA;
*/