import React, { useEffect } from "react"
import styled from "styled-components";
import NavBar from "./NavBar"
import Footer from "./Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Habito from "./Habito";
import { useLoginProvider } from "./Context/Auth"
import Semana from "./Semana"
import { BiTrash } from "react-icons/bi";

export default function Habitos() {
    const [clicado, setClicado] = useState(false);
    const [habitos, setHabitos] = useState([]);
    const { token } = useLoginProvider();
    const Navigate = useNavigate();

    useEffect(() => {
        const autenticar = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", autenticar)
            .then((props) => {
                setHabitos(props.data)
                Navigate("/habitos");
            })
            .catch((e) => {
                Navigate("/");
                window.location.reload();
            });
    }, [Navigate, token])


    return (
        <>
            <NavBar />
            <PageContainer>
                <Topo>
                    <span>Meus hábitos</span>
                    <button onClick={() => setClicado(true)}>+</button>
                </Topo>
                <Habito setClicado={setClicado} clicado={clicado} />
                {habitos.length === 0 ? <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p> : (
                    habitos.map((props, i) => <HabitosSalvos habits={props} key={i} i={i} />)
                )
                }
            </PageContainer>
            <Footer />
        </>
    )
}

function HabitosSalvos({ habits }) {
    const [habit, setHabit] = useState(undefined);
    const { token } = useLoginProvider();
    const Navigate = useNavigate();

    function deleteHabit(habito) {
        if (window.confirm("Apagar hábito?")) {
            const autenticar = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}`,autenticar)
            .then(() => {axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",autenticar)
                .then((res) => {
                    Navigate("/hoje")
                    setHabit(res.data)
                })
            })
            .catch((err) => alert(err.response.data.message));
        }
    }

    return (

        <Container>
            <ContainerHabitos>
                <h1>{habits.name}</h1>
                <Habits>
                    {Semana.map((props, i) =>
                        <DiaSemana key={i} Letra={habits.days.includes(i) ? true : false} CorDeFundo={habits.days.includes(i) ? true : false}>
                            {props}
                        </DiaSemana>
                    )}
                    <BiTrash onClick={() => deleteHabit(habits)} />
                </Habits>
            </ContainerHabitos>
        </Container>

    )

}

const PageContainer = styled.div`
    box-sizing: border-box;
    height: 527px;
    width: 375px;
    padding: 0px 17px;
    span{
        width: 148px;
        height: 29px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
    }
    button {
        color:white;
        font-size: 20px;
        height: 40px;
        width: 50px;
        background: #52B6FF;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        }        
    
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }

`

const Topo = styled.div`
    margin-top: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 85px;
`

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
     h1{
        font-family: 'Lexend Deca';
        font-size: 20px;
        color: #666666;
        margin-bottom: 10px;
    }
`

const ContainerHabitos = styled.div`
    display: flex;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    height: 91px;
    margin-bottom: 15px;
    background-color: #FFFF;
    border: none;
    border-radius: 5px;
     h1{
        margin-right: 100px;
    }


`
const Habits = styled.div`
    display: flex;
    svg{
        margin-left: 30px;
        font-size: 30px;
    }
`
const DiaSemana = styled.div`  
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin-right: 4px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-size: 20px;
    color: ${props => props.Letra ? "#FFFFFF" : "#DBDBDB"};
    background-color: ${props => props.CorDeFundo ? "#CFCFCF" : "#FFFFFF"};
`