import React, { useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { useLoginProvider } from "./Context/Auth"
import Semana from "./Semana"
import { useNavigate } from "react-router-dom"

export default function Habito({ setClicado, clicado }) {

    const [nome, setNome] = useState("");
    const [dias, setDias] = useState([]);
    const [desabilitar, setDesabilitar] = useState(false);
    const { token } = useLoginProvider();
    const Navigate = useNavigate();

    function Habito() {

        setDesabilitar(true);
        const autenticar = { headers: { Authorization: `Bearer ${token}` } }
        const Habitos = {
            name: nome,
            days: dias
        }

        if (Habitos.name !== "" && Habitos.days.length > 0) {
            axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", Habitos, autenticar)
                .then(() => {
                    Navigate("/hoje")
                    setDesabilitar(false);
                    setClicado(false);
                    setDias([]);
                    setNome("");
                })
                .catch((err) => {
                    alert(err.response.data);
                    setDesabilitar(false);
                });

        } else if (Habitos.name !== "" || (Habitos.days.length >= 0)) {
            alert("Preencha os campos corretamente!");
            setDesabilitar(false);
        }

    }

    function Selecionar(props) {

        if (dias.includes(props)) {
            let array = dias.filter((e) => e !== props);
            setDias([...array]);
        } else {
            setDias([...dias, props]);
        }

    }


    return (
        <PaginaHabitos mostrar={clicado}>
            <input type="text" placeholder="nome do hábito" value={nome} onChange={(e) => setNome(e.target.value)} disabled={desabilitar}></input>
            <DiasSemana dias={dias} selecionado={Selecionar} />
            <ContainerBotoes>
                <button onClick={() => setClicado(false)}>Cancelar</button>
                <button onClick={Habito}>Salvar</button>
            </ContainerBotoes>
        </PaginaHabitos>

    )

}

function DiasSemana({ dias, selecionado }) {

    return (

        <ContainerDias>
            {Semana.map((props, i) =>
                <Dia key={i}
                    onClick={() => selecionado(i)}
                    backgroundColor={dias.includes(i) ? true : false}
                    letraCor={dias.includes(i) ? true : false}> {props}
                </Dia>)}

        </ContainerDias>


    )


}

const PaginaHabitos = styled.div`
    box-sizing: border-box;
    padding: 5px;
    width: 340px;
    height: 180px;
    background-color: #FFF;
    border: 0px solid;
    border-radius: 5px;
    display: ${props => props.mostrar ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 27px;
    line-height: 34px;
     input{
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin: 15px 0px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-size: 18px;
    }

`

const ContainerBotoes = styled.div`
    margin-left: 140px;
    width: 170px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
     button:nth-child(1){
        width: 84px;
        height: 35px;
        border-radius: 5px;
        background: #FFFFFF;
        color:#52B6FF;
        margin-right: 10px;
;
    }
     button:nth-child(2){
        width: 84px;
        height: 35px;
        background: #52B6FF;
        border-radius: 5px;
    }
`

const Dia = styled.div`
    font-family: 'Lexend Deca';
    font-size: 20px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 4px;
    margin-bottom: 29px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    color: ${props => props.letraCor ? "#FFFFFF" : "#DBDBDB"};
    background-color: ${props => props.backgroundColor ? "#CFCFCF" : "#FFFFFF"};

`

const ContainerDias = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;


`