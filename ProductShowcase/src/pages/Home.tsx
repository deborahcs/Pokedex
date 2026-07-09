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
            id: id // atribuindo o valor da variável 'id'
          };
        });

        setPokemons(pokemonsWithId);
      } catch (error) {
        console.error("Erro ao buscar pokémons:", error);
      } finally {
        setLoading(false); // desligando o loading
      }
    }

    fetchPokemons();
  }, []);
  // Se o estado de carregamento for verdadeiro, exibe apenas uma mensagem
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8"> {/* p-8 resolucao para telas grandes */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Pokédex
      </h1>
      
      {/* max-w-7xl centraliza o grid em telas gigantes e não deixa esticar muito */}
      <div className="max-w-7xl mx-auto"> 
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {pokemons.map((pokemon) => (
          <li 
  key={pokemon.id} 
  className="group border bg-white p-4 rounded-3xl flex flex-col items-center shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-gray-100"
>
  <img 
    className="w-28 h-28 object-contain transition-transform duration-300 group-hover:scale-110"
    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
    alt={pokemon.name} 
  />
  
  <div className="mt-4 text-center">
    <span className="text-xs text-gray-400 font-mono">#{String(pokemon.id).padStart(3, '0')}</span>
    <Link 
      to={`/details/${pokemon.name}`} 
      className="block text-lg font-bold capitalize text-gray-700 hover:text-blue-600 transition-colors"
    >
      {pokemon.name}
    </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}