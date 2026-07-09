# **Descrição**

Este projeto foi criado para estudar sobre Desenvolvimento Web. O objetivo era criar uma interface para listar e pesquisar Pokémons consumindo dados da API (https://pokeapi.co/). Assim criando uma Pokédex Online.

Meu aprendizado neste projeto foi muito grande pois pude me familiarizar com o React, Typescript e o Tailwind CSS. 

# O que entendi de cada um?

- React: Biblioteca Javascript para usada para construir interfaces de usuário. Pude ver como ela facilita a criação das páginas web de forma rápida, dinâmica e com alta escalabilidade.

- Typescript: Uma linguagem de programação baseada no Javascript, sendo versão mais robusta com recursos extras que ajudam na visulização de erros por oferecer de tipagem estática.

- Tailwind CSS: Framework que permite criar elementos de uma forma mais fácil, rápida e padronizada. Usando classes já prontas do que o CSS comum.

# Estruturação do Projeto:

- Pages: Aqui estão os componentes de páginas. O arquivo Home.tsx é responsável por mostrar a "fachada" do site. Enquando o Details.tsx focam nos detalhes de um Pokémon específico. Separando-os desta forma consigo diferenciar e caso haja necessidade de mudar futuramente, fica mais simples do que deixar no arquivo principal App.tsx que apenas gerencia tudo.

- Services: O services ficou focado na comunicação com a API externa e assim evitando que o endereço completo fosse chamado repetidamente a cada acesso.

- Types: Nele armazeno as definições dos tipos. Para que o formato das informções seja claro.

# Como compilar e Executar

> É necessário ter o Node.js instalado.
> Clonando o repositório
```
git clone https://github.com/deborahcs/Pokedex.git
```

> Acesse a pasta do Projeto
```
cd Pokedex
```
> Instale as dependências
```
npm install
```
> Inicie o servidor de desenvolvimento
```
npm run dev
```

# Dificuldades pelo caminho:

Como não estava familiarizada com ferramentas de Frontend, precisei ver muitas coisas do completo zero. Mas acredito que a base que possuo me ajudou a não achar tudo um bicho de sete cabeças. Recorri a IA com os códigos mas pude entender com clareza muitos pontos. Como tipar as variáveis, normas no Typescript, OPP e etc. 

O que precisei ver com mais afinco foram os designs que gostaria de deixar diferente e em como alguns momentos conflitavam, como na parte de busca onde a princípio não conseguia ver o texto digitado. A resolução também me fez quebrar um pouco a cabeça para consertar pois não estava preenchendo a tela. 

O projeto foi muito importante para que eu visse a minha capacidade de construir algo mesmo sem conhecer a fundo. Pesquisando e tentando no passo a passo para enviar um bom trabalho.