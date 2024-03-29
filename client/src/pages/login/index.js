import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import jwt from "jsonwebtoken";

import Layout from "../../components/layout";
import { Container, Content, Logo, Input, Button,ErrorWarning } from "./styles";
import thoughtsicon from '../../../src/img/thoughtsicon.png';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigation = useNavigate();

  console.log({username, password});
  const handleLogin = async event => {
      event.preventDefault();

    if (!username || !password) return;

    try {
      const response = await axios.post("http://localhost:3333/login", {
        username,
        password
    });

    localStorage.setItem("SESSION_TOKEN", response.data.token); 
    
    console.log(jwt.decode(response.data.token));

    return navigation(",,/home");
    } catch (e) {
      console.error(e);

      if (e.response.status === 404) {
        setError("Nome de usuário não encontrado.");
      } else if (e.response.status === 400) {
        setError("Senha incorreta.");
      }
      setPassword("");
    }
  };

return (
  <Layout>
    <Container>
      <Content>
        {error && <ErrorWarning>{error}</ErrorWarning>}
        <div>
          <label>Usuário</label>
          <Input
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label>Senha</label>
          <Input
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div>
          <a href="/register">Criar conta</a>
          <Button onClick={handleLogin} type="submit">Entrar</Button>
        </div>
      </Content>
    </Container>
  </Layout>
);
};