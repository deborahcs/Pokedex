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
      setPokemons(response.data.results);
    }

    fetchPokemons();
  }, []);

  return (
    <div>
      <h1>Página Home Lista de Pokémons</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <Link to="/details">{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}