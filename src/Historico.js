import styled from "styled-components";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Historico() {
    return (
        <>
            <NavBar />
            <Titulo>
                <div>Historico</div>
            </Titulo>
            <Txt>
            Em breve você poderá ver o histórico dos seus hábitos aqui!
            </Txt>
            <Footer />

        </>

    )

}



const Titulo = styled.div`
    margin: 80px 20px 10px 20px;
    width: 148px;
    height: 29px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;`

const Txt = styled.div`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;
width: 360px;
height: 74px;
color: #666666;
margin:0 15px;
    display:flex;
    text-align: left;
`

const Topo = styled.div`
width: 375px;
height: 70px;
display: flex;
align-items: center;
justify-content: space-between;
background: #126BA5;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
.Logo{
    font-family: 'Playball', cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 38.982px;
    line-height: 49px;
    color: #FFFFFF;

    margin-left: 18px;
}`