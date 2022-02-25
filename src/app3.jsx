import react, {useEffect, useState} from 'react'

const App = () =>{


    const datos = [
        {"Address":"jkcnkjsdcnsd",
        "Name": "Bob",
        "Symbol": "ANA",
        "Tags": ["ana","nashi"],
        "logo": "https://youtube.com",
        "Extrensions":["1", "2", "3"],
        "Category": "No Tag Bitch!"}
    ]
    const [tokens, setTokens] = useState(null); //todavía no llegaron los datos de la API...



    useEffect(() =>{
        console.log("ANANASHI");
        setTokens(datos);
    }, []) //THIS makes it stop itterating..



    return(

        <div>
            <h1>SPL Token Registry!</h1>
        </div>
    )



}

export default App