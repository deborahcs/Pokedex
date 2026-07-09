// Interface usada na lista da Home
export interface Pokemon {
  name: string;
  url: string;
  id: number;
}

// Interface usada na pagina de detalhes com os dados completos
export interface PokemonDetails {
    // Nome do pokemon
    name: string;
    // Obj contendo os links das imagens
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };
    // Lista de tipos
    types: {
        type: {
            name: string;
        };
    }[];
    // Altura em decimetros
    height: number;
    weight: number;
}