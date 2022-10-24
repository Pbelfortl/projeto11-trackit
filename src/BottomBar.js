import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { softblue } from "./constants/colors";

export default function BottomBar () {
    const navigate = useNavigate()
    return (
        <BottomBox>
            <Link to='/habitos'>Hábitos</Link>
            <button onClick={()=>navigate('/hoje')}>Hoje</button>
            <Link to='/historico'>Histórico</Link>
        </BottomBox>
    )
}

const BottomBox = styled.div`
    height: 70px;
    width: 375px;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    color: ${softblue};
    font-size: 18px;
    font-weight: 400;
    button{
        width: 91px;
        height: 91px;
        border-radius:50%;
        background-color: ${softblue};
        margin-bottom: 40px;
        border:none;
        color:white;
        font-size: 18px;
        box-sizing: border-box;
        cursor: pointer;
    }
    a{
        text-decoration: none;
        color: ${softblue};
    }
`