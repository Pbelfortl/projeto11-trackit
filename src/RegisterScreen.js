import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./images/trackitLogo.png"
import { ContainerLog, Form } from "./GlobalStyles";
import { softblue } from "./constants/colors";
import  BASE_URL from "./constants/urls";
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function RegisterScreen() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [name, setName] = useState()
    const [url, setUrl] = useState()
    const navigate = useNavigate()
    const [inputstatus, setInputStatus] = useState(false)

    function register(event) {
        event.preventDefault()
        setInputStatus(true)
        axios.post(`${BASE_URL}/auth/sign-up`, { email: email, name: name, image: (url===undefined)?'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png':url, password: password})
            .then(() => success())
            .catch( ans => fail(ans.response.data.message))
        
    }

    function success () {
        setInputStatus(false)
        navigate('/')
    }

    function fail (message) {
        setInputStatus(false)
        alert (message)
    }

    return (
        <ContainerLog>
            <RegisterInfo softBlue={softblue}>
                <img src={Logo} alt='TrackIt' />
                <Form inputstatus={inputstatus} softblue={softblue} onSubmit={register}>
                    <input type='email' placeholder="email" required onChange={e => setEmail(e.target.value)}></input>
                    <input type='password' placeholder="senha" required onChange={e => setPassword(e.target.value)}></input>
                    <input type='text' placeholder="nome" required onChange={e => setName(e.target.value)}></input>
                    <input type='text' placeholder="foto" onChange={e => setUrl(e.target.value)}></input>
                    <button type="submit">{(inputstatus)?<ThreeDots color="white"/>:'Cadastrar'}</button>
                </Form>
                <br />
                <Link to="/">Já tem uma conta? Entre aqui!</Link>
            </RegisterInfo>
        </ContainerLog>
    )
}

const RegisterInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
    img{
        width: 180px;
        height: 180px;
    }
    a{
        color: ${props => props.softblue};
    }
    button{
        cursor: pointer;
    }
`