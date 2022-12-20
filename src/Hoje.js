import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Vector from "./assets/Vector.png"
import { useLoginProvider } from "./Context/Auth"
import Footer from "./Footer";
import NavBar from "./NavBar";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function Hoje() {
    const {token, porcentagem, setPorcentagem} = useLoginProvider();
    const [hoje, setHoje] = useState([]);
    const navigate = useNavigate();
    const [atualizar, setAtualizar] = useState(false);
    const porcento = Math.round(porcentagem*(hoje.length)/100);

    function handlePorcentage(habitos) {
        const concluído = habitos.filter((element) => element.done).length;
        let qtdd;

        if (habitos.length === 0) {
            qtdd = 0;
        } else {
            qtdd = Math.round(concluído*100/(habitos.length));
        }

        setPorcentagem(qtdd);
    }

    function perm() {
        const config = {headers: {'Authorization': `Bearer ${token}`}};
        axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config)
            .then((res) => {setHoje(res.data); handlePorcentage(res.data);})
            .catch(() => navigate('/'));
    }
    useEffect(perm, [atualizar]);

    function concluido(habito, i) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/${i}check`, {}, config)
            .then(() => {setAtualizar(!atualizar)});
    }

    function todosHabitos(habitos) {
        const sequenciaAtual = habitos.currentSequence;
        const recorde = habitos.highestSequence;
        const finalizado = ( (sequenciaAtual === recorde) && (sequenciaAtual !== 0) );
        
        return (
            <HabitosHoje key={habitos.id}
                               done={habitos.done}
                               finalizado={finalizado}>
                <ContainerHabitos>
                    <h1>{habitos.name}</h1>
                    <p>
                        Sequência atual: <span>{sequenciaAtual} dia{[0, 1].includes(sequenciaAtual) }</span>
                    </p>
                    <p>
                        Seu recorde: <span>{recorde} dia{[0, 1].includes(recorde)}</span>
                    </p>
                </ContainerHabitos>
                <div>
                    {<img src={Vector} onClick={() => {concluido(habitos, habitos.done ? 'un' : '')}} />}               
                </div>
            </HabitosHoje>
        );
    }

    function Descrição() {
        if (porcento === 0) {
            return 'Nenhum hábito concluído ainda';
        } else {
            return `${Math.round(porcento*100/(hoje.length))}% dos hábitos concluídos`;
        }
    }

    const Semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    return (
        <>
            <NavBar/>
            <ContainerHoje qntddporcento={porcento === 0}>
                <Data >{Semana[dayjs().day()]}, {dayjs().format('DD/MM')}</Data>
                <h3><Descrição/></h3>
                <section>
                    {hoje.map(todosHabitos)}
                </section>
            </ContainerHoje>
            <Footer/>
        </>
    );
}

const ContainerHoje = styled.div`
    margin-top: 70px;
    width: 100%;
    height: 844px;
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    h3 {
        margin-bottom: 28px;
        width: 340px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 18px;
        line-height: 22px;
        color: ${({qntddporcento}) => qntddporcento ? '#BABABA' : '#8FC549'};
    }
    section {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
`;
const ContainerHabitos = styled.div`
    display: flex;
    justify-content: space-between;
`
const HabitosHoje = styled.div`
    width: 340px;
    height: 120px;
    background: #FFFFFF;
    border-radius: 5px;
    display:flex;
    justify-content: center;
    align-items: center;
    div{
        margin-left: 15px;
        width: 240px;
        display: flex;
        flex-direction: column;
        h1 {
            margin-bottom: 10px;
            font-family: 'Lexend Deca', sans-serif;
            font-size: 20px;
            line-height: 5px;
            color: #666666;
        }
        p {
            font-family: 'Lexend Deca', sans-serif;
            font-size: 13px;
            line-height: 16px;
            color: ${({done}) => done ? '#8FC549' : '#666666'};
        }
    }
    div:nth-of-type(2) {
        margin-right: 13px;
        width: 69px;
        height: 69px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #E7E7E7;
        border-radius: 5px;
        background-color: ${({done}) => done ? '#8FC549' : '#EBEBEB'};
    }
    img{
        width: 40px;
        height: 40px;

    }
`;

const Data = styled.div`
        margin-top: 28px;
        width: 340px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;`