import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Pokemon } from '../types/pokemon';
import { Link } from 'react-router-dom';

// Componente principal que renderiza a lista de Pokemons da API
export function Home() {
  // Cria o estado para armazenar a lista de pokemons
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  // Executa a busca na API assim que o componente e montado na tela
  useEffect(() => {
    async function fetchPokemons() {
      const response = await api.get('/pokemon');
      
      // Definimos o formato do que vem da API
      const results = response.data.results as { name: string; url: string }[];

      const pokemonsWithId: Pokemon[] = results.map((pokemon) => {
        const id = parseInt(pokemon.url.split('/').filter(Boolean).pop() || '0');
        
        return {
          name: pokemon.name,
          url: pokemon.url,
          id
        };
      });

      setPokemons(pokemonsWithId);
    }

    fetchPokemons();
  }, []);

  return (
    <div>
      <h1>Página Home Lista de Pokémons</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
              alt={pokemon.name} 
            />
            <Link to={`/details/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}