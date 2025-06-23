import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/player.css";

export default function Player() {
  const [titulo, setTitulo] = useState("Carregando...");
  const [descricao, setDescricao] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const [perfilId, setPerfilId] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idFilme = searchParams.get("id");
  const perfil = searchParams.get("perfil");

  useEffect(() => {
    if (!idFilme) {
      alert("Filme não especificado.");
      navigate("/filmes");
      return;
    }
    setPerfilId(perfil);

    async function carregarFilme() {
      const filmeRef = doc(db, "conteudos", idFilme);
      const filmeSnap = await getDoc(filmeRef);
      if (filmeSnap.exists()) {
        const filmeData = filmeSnap.data();
        setTitulo(filmeData.titulo || "Sem título");
        setDescricao(filmeData.descricao || "");
        setUrlVideo(filmeData.url || "");
      } else {
        alert("Filme não encontrado.");
        navigate("/filmes");
      }
    }

    carregarFilme();
  }, [idFilme, perfil, navigate]);

  function voltar() {
    if (perfilId) {
      navigate(`/filmes?id=${perfilId}`);
    } else {
      navigate("/filmes");
    }
  }

  return (
    <div className="player-container">
      <header className="player-header">
        <h1>{titulo}</h1>
        <button onClick={voltar} className="btn-voltar">
          Voltar
        </button>
      </header>

      <main className="video-wrapper">
        {urlVideo ? (
          <video controls src={urlVideo} className="video-player" />
        ) : (
          <p>Vídeo indisponível.</p>
        )}
        <p className="descricao">{descricao}</p>
      </main>
    </div>
  );
}
