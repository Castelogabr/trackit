import { useState } from "react";
import { ThreeDots } from 'react-loader-spinner'
import styled from "styled-components";
import logo from "./assets/logo.png"
import { Link, useNavigate } from "react-router-dom";
import { useLoginProvider } from "./Context/Auth";


export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin } = useLoginProvider();
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await handleLogin(email, password);
        navigate("/habitos")
    };

    return (
        <TelaLogin>
            <img src={logo} />
            <Formulario>
                <form onSubmit={handleSubmit} >
                    <div>
                        <input disabled={loading ? 'disabled' : null} name="email"
                            type="email"
                            placeholder="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <input disabled={loading ? 'disabled' : null} name="password"
                            type="password"
                            placeholder="senha"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button disabled={loading ? 'disabled' : null} type="submit" >
                        {loading ? (
                            <ThreeDots
                            height="13"
                            width="51"
                            radius="9"
                            color="white"
                            ariaLabel="loading"
                            wrapperStyle
                            wrapperClass
                            />
                        ) : (
                            'Entrar'
                        )}                </button>

                </form>
            </Formulario>
            <Link to='/cadastro'><span>Não tem uma conta? Cadastre-se!</span></Link>
        </TelaLogin>
    )

}

const TelaLogin = styled.div`
img{
    display: flex;
    margin: 50px auto;
}
span{
    text-decoration-line: underline;
    color: #52B6FF;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 25px auto;
    font-family: 'Lexend Deca';

}
`

const Formulario = styled.div`
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
input::placeholder{
    color:#DBDBDB;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-size: 20px;
    line-height: 25px;
}
button{
    display: flex;
    justify-content: center;
    align-items: center;
    margin:  auto;
    width: 303px;
    height: 45px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    background-color: #52B6FF;
    color: #FFFFFF;
    font-size: 21px;
    line-height: 26px;
    cursor: pointer

}
`