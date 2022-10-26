import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { softblue } from "./constants/colors";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import userProgress from "./userProgress";
import { useEffect, useState } from "react";


export default function BottomBar() {
    const navigate = useNavigate()
    const [progress, setProgress] = useState(userProgress)

    function refreshBar() {
        navigate('/hoje')
        setProgress(userProgress)
        console.log(userProgress)
    }

    return (
        <BottomBox>
            <Link to='/habitos'>Hábitos</Link>
            <button onClick={() => refreshBar()}>
                <CircularProgressbar
                    value={progress.done !== 0 && parseInt(progress.done * 100 / (progress.tasks))}
                    text={`Hoje`}
                    background
                    backgroundPadding={2}
                    styles={buildStyles({
                        backgroundColor: softblue,
                        textColor: "white",
                        pathColor: 'white',
                        trailColor: softblue,
                        textSize: '25px'
                    })}
                />
            </button>
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
    font-size: 20px;
    font-weight: 400;
    button{
        width: 91px;
        height: 91px;
        border-radius:50%;
        background-color: ${softblue};
        margin-bottom: 40px;
        border:none;
        color:white;
        box-sizing: border-box;
        cursor: pointer;
    }
    a{
        text-decoration: none;
        color: ${softblue};
    }
`