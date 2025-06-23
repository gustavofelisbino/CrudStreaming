import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/plano.css";

export default function Plano() {
  const [plano, setPlano] = useState(null);
  const [perfilNome, setPerfilNome] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idPerfil = searchParams.get("id");

  useEffect(() => {

    async function carregarPlano() {
      setLoading(true);
      try {
        if (!perfilData.plano_id) {
          alert("Nenhum plano vinculado a este perfil.");
          setPlano(null);
          setLoading(false);
          return;
        }

        const planoRef = doc(db, "planos", perfilData.plano_id);
        const planoSnap = await getDoc(planoRef);
        if (!planoSnap.exists()) {
          alert("Plano vinculado não encontrado.");
          setPlano(null);
          setLoading(false);
          return;
        }

        setPlano(planoSnap.data());
      } catch (error) {
        console.error("Erro ao carregar plano:", error);
        alert("Erro ao carregar plano.");
      }
      setLoading(false);
    }

    carregarPlano();
  }, [idPerfil, navigate]);

  function voltar() {
    navigate(`/filmes?id=${idPerfil}`);
  }

  if (loading) return <p>Carregando plano...</p>;

  return (
    <div className="plano-container">
      <header>
        <h1>Plano de {perfilNome}</h1>
      </header>
      {plano ? (
        <div className="plano-info">
          <h2>{plano.nome}</h2>
          <p><strong>Preço:</strong> R$ {plano.preco}</p>
          <p><strong>Descrição:</strong> {plano.descricao}</p>
        </div>
      ) : (
        <p>Este perfil não possui plano vinculado.</p>
      )}
      <button onClick={voltar} className="btn-voltar">Voltar</button>
    </div>
  );
}
