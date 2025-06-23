import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { app } from "../firebase";
import '../styles/dashboard.css';

const auth = getAuth(app);
const db = getFirestore(app);

export default function Dashboard() {
  const [perfis, setPerfis] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Usuário logado:", user.uid);
        setUserId(user.uid);
        await carregarPerfis(user.uid);
      } else {
        console.log("Usuário deslogado");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  async function carregarPerfis(uid) {
    console.log("Carregando perfis do usuário:", uid);
    const q = query(collection(db, "perfis"), where("id_usuario", "==", uid));
    const snapshot = await getDocs(q);
    const lista = [];
    snapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() });
    });
    console.log("Perfis encontrados:", lista);
    setPerfis(lista);
  }

  async function criarPerfil() {
    const nome = prompt("Nome do perfil:");
    const data_nascimento = prompt("Data de nascimento (YYYY-MM-DD):");
    if (!nome || !data_nascimento) return;
    await addDoc(collection(db, "perfis"), {
      id_usuario: userId,
      nome,
      data_nascimento
    });
    carregarPerfis(userId);
  }

  async function editarPerfil(id, nomeAtual) {
    const novoNome = prompt("Novo nome:", nomeAtual);
    if (!novoNome) return;
    await updateDoc(doc(db, "perfis", id), {
      nome: novoNome
    });
    carregarPerfis(userId);
  }

  async function excluirPerfil(id) {
    if (confirm("Deseja excluir este perfil?")) {
      await deleteDoc(doc(db, "perfis", id));
      carregarPerfis(userId);
    }
  }

  function handleLogout() {
    signOut(auth).then(() => navigate("/login"));
  }

  function entrarPerfil(id) {
    navigate(`/filmes?id=${id}`);
  }
  

  return (
    <div className="dashboard-container">
      <h1>Quem está assistindo?</h1>
      <div className="perfis-grid">
        {perfis.map((perfil) => (
          <div key={perfil.id} className="perfil-card">
            <img
              className="perfil-img"
              src={perfil.imagem || "https://i.imgur.com/wSqKOVx.jpeg"}
              alt={perfil.nome}
              style={{ cursor: "pointer" }}
              onClick={() => entrarPerfil(perfil.id)}
            />
            <div
              className="perfil-nome"
              style={{ cursor: "pointer" }}
              onClick={() => entrarPerfil(perfil.id)}
            >
              {perfil.nome}
            </div>
            <div className="perfil-buttons">
              <button onClick={() => editarPerfil(perfil.id, perfil.nome)}>Editar</button>
              <button onClick={() => excluirPerfil(perfil.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
  
      <button className="add-perfil-button" onClick={criarPerfil}>
        Adicionar Perfil
      </button>
      <button className="logout-button" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}

