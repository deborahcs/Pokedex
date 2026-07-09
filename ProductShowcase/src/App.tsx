// Importando as ferramentas de roteamento que criam a navegacao da aplicacao
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importando os componentes de pagina da aplicacao
import { Home } from './pages/Home';
import { Details } from './pages/Details';

export default function App() {
  return (
    // BrowserRouter gerencia o historico de navegacao da aplicacao na web
    <BrowserRouter>
      
      {/* Routes atua como um container que agrupa e gerencia todas as rotas possiveis */}
      <Routes>
        
        {/* Route define o caminho na URL e o componente que sera renderizado na tela */}
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        
      </Routes>
      
    </BrowserRouter>
  )
}