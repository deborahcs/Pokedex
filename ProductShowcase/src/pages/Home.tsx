import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Pokemon } from '../types/pokemon';
import { Link } from 'react-router-dom';

// Componente principal que renderiza a lista de Pokemons da API
export function Home() {
  // Cria o estado para armazenar a lista de pokemons
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  // Cria um estado para saber se a pagina ainda esta carregando dados
  const [loading, setLoading] = useState(true); 


  // Executa a busca na API assim que o componente e montado na tela
  useEffect(() => {
    async function fetchPokemons() {
        try {
            // Liga o indicador de carregamento
            setLoading(true);
            // Faz chamada na API buscando os primeiros 151 pokemons
            const response = await api.get('/pokemon', {
                params: { limit: 151 }
            });
      
            // Definimos o formato do que vem da API
            const results = response.data.results as {
                name: string; url: string }[];

            // Transforma os dados brutos no formato do obj pokemon
        const pokemonsWithId: Pokemon[] = results.map((pokemon) => {
          // Extrai o ID do pokemon a partir da URL fornecida pela API
          const id = parseInt(pokemon.url.split('/').filter(Boolean).pop() || '0');
        
          return {
            name: pokemon.name,
            url: pokemon.url,
            id: id // Aqui atribuímos o valor da variável 'id'
          };
        });

        setPokemons(pokemonsWithId);
      } catch (error) {
        console.error("Erro ao buscar pokémons:", error);
      } finally {
        setLoading(false); // Agora sim, desligamos o loading!
      }
    }

    fetchPokemons();
  }, []);
  // Se o estado de carregamento for verdadeiro, exibe apenas uma mensagem
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Página Home Lista de Pokémons</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            {/* Exibe a imagem do pokemon usando o ID extraido */}
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
              alt={pokemon.name} 
            />
            {/* Cria o link dinamico p/ a pagina de detalhes */}
            <Link to={`/details/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}