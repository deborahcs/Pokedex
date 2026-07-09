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
   // resolucao
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center">
        {/* Nome com destaque */}
        <h1 className="text-4xl font-black capitalize text-gray-800 mb-4">{pokemon.name}</h1>
        
        {/* Imagem com fundo circular */}
        <div className="bg-gray-50 rounded-full w-48 h-48 mx-auto flex items-center justify-center mb-6 border-4 border-gray-100">
          <img 
            className="w-40 h-40 object-contain"
            src={pokemon.sprites.other["official-artwork"].front_default} 
            alt={pokemon.name} 
          />
        </div>
        
        {/* Informacoes em grid de duas colunas */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-xl">
            <p className="text-xs text-blue-600 font-bold uppercase">Altura</p>
            <p className="text-lg font-semibold text-gray-700">{pokemon.height / 10}m</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl">
            <p className="text-xs text-blue-600 font-bold uppercase">Peso</p>
            <p className="text-lg font-semibold text-gray-700">{pokemon.weight / 10}kg</p>
          </div>
        </div>

        {/* Tipos com badges */}
        <div className="flex justify-center gap-2">
          {pokemon.types.map((t) => (
            <span key={t.type.name} className="px-4 py-1 bg-gray-800 text-white rounded-full text-sm font-medium capitalize">
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}