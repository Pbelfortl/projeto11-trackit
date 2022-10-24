import styled, { createGlobalStyle } from "styled-components"
import { softblue } from "./constants/colors"

export const GlobalStyle = createGlobalStyle`
    body{
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Lexend Deca', sans-serif;
    }
`

export const Container = styled.div`
    box-sizing: border-box;
    width: 375px;
    max-width: 375px;
    height: 667px;
    max-height: 667px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    border: solid 1px #D4D4D4;
    position: relative;
    background-color: #F2F2F2;
`

export const ContainerLog = styled.div`
    width: 375px;
    max-width: 375px;
    height: 667px;
    max-height: 667px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    border: solid 1px #D4D4D4;
    position: relative;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: ${props => props.inputstatus?0.5:1};
    input{
        width: 303px;
        height: 45px;
        margin: 3px;
        border-radius: 5px;
        border: solid 1px #D4D4D4;
        font-size: 20px;
        box-sizing: border-box;
        ::placeholder{
            color: #D4D4D4;
        }
    }
    button{
        width: 303px;
        height: 45px;
        margin: 3px;
        border-radius: 5px;
        display:flex;
        align-items: center;
        justify-content: center;
        border: none;
        color:white;
        font-size: 20px;
        font-family: 'Lexend Deca', sans-serif;
        background-color: ${softblue};
    }  
`