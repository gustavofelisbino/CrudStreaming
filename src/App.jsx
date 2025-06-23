import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Filmes from "./pages/Filmes";
import Cadastro from "./pages/Cadastro";
import Player from "./pages/Player";
import Plano from "./pages/Plano";
import CadastroFilme from "./pages/CadastroFilme";
import EditarFilmes from "./pages/EditarFilmes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/player" element={<Player />} />
        <Route path="/plano" element={<Plano />} />
        <Route path="/cadastrofilme" element={<CadastroFilme />} />
        <Route path="/editarfilmes" element={<EditarFilmes />} />
      </Routes>
    </BrowserRouter>
  );
}
