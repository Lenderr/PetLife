import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";

const LoginRegister = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [action, setAction] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      navigate("/inicio");
    } catch (err) {
      setError("Login falhou. Verifique suas credenciais.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/users/register", {
        username,
        email,
        password,
      });
      alert("Cadastro bem-sucedido! Agora faça login.");
      setAction("");
    } catch (err) {
      setError("Erro ao registrar usuário. Tente novamente.");
    }
  };

  return (
    <div className={`wrapper ${action}`}>
      {/* Tela de Login */}
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Exibe a mensagem de erro */}
          <div className="input-field">
            <input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdEmail className="icon" />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          <div className="register-Link">
            <p>
              Não tem uma conta?{" "}
              <a href="#" onClick={() => setAction("active")}>
                Registre-se
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Tela de Registro */}
      <div className="form-box register">
        <form onSubmit={handleRegister}>
          <h1>Registrar</h1>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Exibe a mensagem de erro */}
          <div className="input-field">
            <input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdEmail className="icon" />
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Nome"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div>
            <button type="submit">Registrar</button>
          </div>
          <div className="register-Link">
            <p>
              Já tem uma conta?{" "}
              <a href="" onClick={() => setAction("")}>
                Logar
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
