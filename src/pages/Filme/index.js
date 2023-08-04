import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import './filme.css'

import api from '../../services/api'

export default function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadingFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"1cc6e3588c6bc498e41a1cbe995e7e7b",
                    language:"pt-BR"
                }
            })
            .then((response)=>{
                setFilme(response.data)
                setLoading(false);
            })
            .catch(()=>{
                navigate("/",{ replace: true })
                return;
            })
        }
        loadingFilme();

        return () => {
            console.log("Componente foi desmontado")
        }
    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some( (filmeSalvo)=> filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.warning("Esse filme ja está na sua lista")
            return;
        };

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso")
        
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
             <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target='blank'>
                    Trailer
                    </a>
                </button>
            </div>
        </div>

    );
}