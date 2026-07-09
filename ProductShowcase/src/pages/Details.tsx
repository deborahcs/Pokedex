import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from '../services/api';
import type { PokemonDetails } from "../types/pokemon";

// Componente responsavel por exibir as informacoes de um Pokemon especifico
export function Details() {
    //Captura o parametro 'name' que foi passado na URL (ex: /details/pikachu)
    const { name } = useParams();
    // Cria estado para armazenar os dados do pokemon (inicia como null pois ainda nao buscamos)
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    // Cria estado para gerenciar o carregamento da pagina
    const [loading, setLoading] = useState(true);

  // Busca os detalhes sempre que o nome na URL mudar
  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        // Faz a chamada na API buscando especificamente o pokemon pelo nome
        const response = await api.get(`/pokemon/${name}`);
        // Salva os dados retornados no nosso estado
        setPokemon(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      } finally {
        // Desliga o carregamento apos a busca
        setLoading(false);
      }
    }

    fetchDetails();
  }, [name]); // O 'name' aqui garante que a busca refaca se o usuario mudar de pokemon

  // Enquanto a API responde, mostra essa mensagem
  if (loading) return <div>Carregando detalhes...</div>;
  
  // Se nao encontrar o pokemon, exibe aviso
  if (!pokemon) return <div>Pokémon não encontrado.</div>;

  return (
    <div>
      {/* Exibe o nome do pokemon */}
      <h1>{pokemon.name}</h1>
      
      {/* Exibe a imagem oficial de alta qualidade vinda da API */}
      <img 
        src={pokemon.sprites.other["official-artwork"].front_default} 
        alt={pokemon.name} 
      />
      
      {/* Divide por 10 para converter as unidades da API (decimetros/hectogramas) para metros/kg */}
      <p>Altura: {pokemon.height / 10}m</p>
      <p>Peso: {pokemon.weight / 10}kg</p>
      
      {/* Mapeia a lista de tipos do pokemon e transforma em um texto separado por virgula */}
      <div>
        Tipos: {pokemon.types.map((t) => t.type.name).join(', ')}
      </div>
    </div>
  )
}