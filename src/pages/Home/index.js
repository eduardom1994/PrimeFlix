import { useEffect, useState } from 'react';
import api from '../../services/api'
//URL da API /movie/now_playing?api_key=1cc6e3588c6bc498e41a1cbe995e7e7b=pt-BR

export default function Home(){

    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        async function loadFIlmes(){
            const response = await api.get("movie/now_playing",{
                params:{
                    api_key:"1cc6e3588c6bc498e41a1cbe995e7e7b",
                    language:"pt-BR",
                    page:1,
                }
            })

        console.log(response.data.results)
        }
        loadFIlmes();
    },[])

    

    return (
        <h1>Bem vindo a Home</h1>
    );
}