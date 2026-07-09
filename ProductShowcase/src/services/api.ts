import axios from 'axios';
// Cria e exporta uma instancia do axios ja configurada
// Definimos a baseURL p/ não precisar digitar o link completo da PokeApi para cada chamada
export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});