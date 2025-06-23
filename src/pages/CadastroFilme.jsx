import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CadastroFilme() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    imagem: "",
    categoria: "",
    ano_lancamento: "",
    classificacao: "",
    tipo: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await addDoc(collection(db, "conteudos"), {
        ...form,
        ano_lancamento: Number(form.ano_lancamento),
      });
      alert("Filme cadastrado com sucesso!");
      navigate("/cadastro");
    } catch (err) {
      alert("Erro ao cadastrar: " + err.message);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "30px auto", color: "white" }}>
      <h1>Cadastro de Filme</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <input
          name="titulo"
          type="text"
          placeholder="Título"
          required
          value={form.titulo}
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          required
          value={form.descricao}
          onChange={handleChange}
          style={{ ...inputStyle, height: 80 }}
        />
        <input
          name="imagem"
          type="url"
          placeholder="URL da Imagem"
          required
          value={form.imagem}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="categoria"
          type="text"
          placeholder="Categoria"
          required
          value={form.categoria}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="ano_lancamento"
          type="number"
          placeholder="Ano de Lançamento"
          required
          value={form.ano_lancamento}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="classificacao"
          type="text"
          placeholder="Classificação (ex: 16+)"
          required
          value={form.classificacao}
          onChange={handleChange}
          style={inputStyle}
        />
        <select
          name="tipo"
          required
          value={form.tipo}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Tipo de Conteúdo</option>
          <option value="filme">Filme</option>
          <option value="serie">Série</option>
        </select>
        <button
          type="submit"
          style={{
            background: "#e50914",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: 10,
  borderRadius: 5,
  border: "none",
};
