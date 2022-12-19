import { useState } from "react";
import styled from "styled-components";
import logo from "./assets/logo.png"
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export default function Cadastro() {
  const [disabled, setDisabled] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  function criar(e) {
    e.preventDefault();
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", form)
      .then((res) => {
        navigate("/");
        setDisabled(false);

      })
      .catch((error) => {
        setDisabled(false);
        alert(error);
      });
  }
  function handleForm({ value, name }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  return (
    <TelaLogin>
      <img src={logo} alt="logo" />
      <form onSubmit={criar}>
      <input
          placeholder="email"
          name="email"
          type="email"
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        />
        <input
          placeholder="senha"
          name="password"
          type="password"
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        />
        <input
          placeholder="nome"
          name="name"
          type="text"
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        />
        <input
          placeholder="foto"
          name="image"
          type="url"
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        />
            
            <button type="submit"> Cadastrar </button>
      </form>
      <Link to='/'><p> Já tem uma conta? Faça login! </p></Link>
    </TelaLogin>
  );
}

const TelaLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lexend Deca", sans-serif;
  img {
    width: 250px;
    margin: 50px auto;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input::placeholder{
    color:#DBDBDB;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-size: 20px;
    line-height: 25px;
}
input{
    display: flex;
    margin:  6px auto;
    width: 303px;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    
}
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin:  auto;
    width: 303px;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    background-color: #52B6FF;
    color: #FFFFFF;
    font-size: 21px;
    line-height: 26px;
  }
  p {
    margin-top: 24px;
    font-style: normal;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52b6ff;
  }
`;