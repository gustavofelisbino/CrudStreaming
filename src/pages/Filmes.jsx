import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/filmes.css";

export default function Filmes() {
  const [perfilNome, setPerfilNome] = useState("Perfil");
  const [perfilImagem, setPerfilImagem] = useState("https://i.imgur.com/wSqKOVx.jpeg");
  const [filmes, setFilmes] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idPerfil = searchParams.get("id");

  useEffect(() => {
    async function carregarPerfil() {
      if (!idPerfil) return;
      const perfilRef = doc(db, "perfis", idPerfil);
      const perfilSnap = await getDoc(perfilRef);
      if (perfilSnap.exists()) {
        const dados = perfilSnap.data();
        setPerfilNome(dados.nome);
        if (dados.imagem) setPerfilImagem(dados.imagem);
      }
    }

    async function carregarFilmes() {
      const conteudoRef = collection(db, "conteudos");
      const snapshot = await getDocs(conteudoRef);
      const listaFilmes = [];
      snapshot.forEach(docSnap => {
        listaFilmes.push({ id: docSnap.id, ...docSnap.data() });
      });
      setFilmes(listaFilmes);
    }

    carregarPerfil();
    carregarFilmes();
  }, [idPerfil]);

  function toggleMenu() {
    setMenuAberto(!menuAberto);
  }

  function verPlano(e) {
    e.stopPropagation();
    navigate("/plano");
  }

  function sair(e) {
    e.stopPropagation();
    const idUsuario = localStorage.getItem("usuarioLogadoId");
    if (idUsuario) {
      navigate(`/dashboard?usuario=${idUsuario}`);
    } else {
      navigate("/login");
    }
  }

  function abrirPlayer(idFilme) {
    navigate(`/player?id=${idFilme}&perfil=${idPerfil}`);
  }

  function irParaCadastro() {
    navigate(`/cadastro?id=${idPerfil}`);
  }

  useEffect(() => {
    function handleClickFora() {
      setMenuAberto(false);
    }
    if (menuAberto) {
      document.addEventListener("click", handleClickFora);
    }
    return () => {
      document.removeEventListener("click", handleClickFora);
    };
  }, [menuAberto]);

  return (
    <div className="filmes-container">
      <header className="filmes-header">
        <h1>Filmes</h1>
        <div
          className="perfil-wrapper"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
          style={{ cursor: "pointer" }}
        >
          <img src={perfilImagem} alt={perfilNome} />
          <span>{perfilNome}</span>
          {menuAberto && (
            <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
              <button onClick={verPlano}>Ver Plano</button>
              <button onClick={sair}>Sair</button>
            </div>
          )}
        </div>
      </header>

      <div className="container">
        <div className="grid">
          {filmes.map((filme) => (
            <div
              key={filme.id}
              className="card"
              onClick={() => abrirPlayer(filme.id)}
            >
              <img
                src={filme.imagem || "https://via.placeholder.com/300x250?text=Sem+imagem"}
                alt={filme.titulo}
              />
              <div className="card-title">{filme.titulo}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-cadastro-float" onClick={irParaCadastro}>
        +
      </button>
    </div>
  );
}
