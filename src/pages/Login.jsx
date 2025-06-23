import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import '../styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const cred = await signInWithEmailAndPassword(auth, email, senha);
      localStorage.setItem("usuarioLogadoId", cred.user.uid);
      navigate("/dashboard");
    } catch (err) {
      alert("Erro no login: " + err.message);
    }
  };

  const handleCadastro = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      localStorage.setItem("usuarioLogadoId", cred.user.uid);
      alert("Usuário cadastrado com sucesso!");
      navigate("/dashboard");
    } catch (err) {
      alert("Erro no cadastro: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>

        <hr style={{ margin: "20px 0", borderColor: "#333" }} />

        <button onClick={handleCadastro} className="cadastro-button">
          Cadastrar Novo Usuário
        </button>
      </div>
    </div>
  );
}
