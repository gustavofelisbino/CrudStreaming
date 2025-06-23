import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/cadastro.css";

export default function Cadastro() {
  const [filmes, setFilmes] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idPerfil = searchParams.get("id");

  useEffect(() => {
    async function carregarFilmes() {
      const conteudoRef = collection(db, "conteudos");
      const snapshot = await getDocs(conteudoRef);
      const listaFilmes = [];
      snapshot.forEach((docSnap) => {
        listaFilmes.push({ id: docSnap.id, ...docSnap.data() });
      });
      setFilmes(listaFilmes);
    }
    carregarFilmes();
  }, []);

  function irParaNovoFilme() {
    navigate(`/CadastroFilme?id=${idPerfil}`);
  }
  
  function irParaEditarFilme(idFilme) {
    navigate(`/EditarFilmes?id=${idPerfil}&filmeId=${idFilme}`);
  }
  
  return (
    <div className="cadastro-container">
      <header>
        <h1>Cadastro de Filmes</h1>
      </header>

      <main>
        <button className="btn-novo-filme" onClick={irParaNovoFilme}>
          + Novo Filme
        </button>

        <div className="lista-filmes">
          {filmes.map((filme) => (
            <div key={filme.id} className="filme-item">
              <img
                src={filme.imagem || "https://via.placeholder.com/120x80?text=Sem+imagem"}
                alt={filme.titulo}
                className="filme-thumb"
              />
              <span className="filme-titulo">{filme.titulo}</span>
              <button
                className="btn-editar-filme"
                onClick={() => irParaEditarFilme(filme.id)}
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
