import { useParams } from "react-router-dom";

// Componente responsavel por exibir as informacoes de um Pokemon especifico
export function Details() {
    //Captura o parametro 'name' que foi passado na URL
    const { name } = useParams();

  return (
    <div>
      <h1>Página de Detalhes do Pokémon</h1>
      <p>Você clicou no: {name}</p>
    </div>
  )
}