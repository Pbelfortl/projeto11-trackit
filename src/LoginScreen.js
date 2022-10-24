import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./images/trackitLogo.png"
import { ContainerLog, Form} from "./GlobalStyles";
import { softblue } from "./constants/colors";
import axios from "axios";
import BASE_URL from "./constants/urls";
import { useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import Context from "./Context";

export default function LoginScreen() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [inputstatus, setInputStatus] = useState(false)
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useContext(Context)

    function enter(event) {
        event.preventDefault()
        setInputStatus(true)
        axios.post(`${BASE_URL}/auth/login`, {email:email, password:password})
            .then((ans) => loading(ans.data))
            .catch(ans => fail(ans.response.data.message))
    }

    function loading(ans) {
        setInputStatus(false)
        setUserInfo(ans)
        console.log(userInfo)
        navigate('/hoje')

    }

    function fail(message) {
        setInputStatus(false)
        alert(message)
    }

    return (
        <ContainerLog>
            <LoginInfo softBlue={softblue}>
                <img src={Logo} alt='TrackIt' />
                <Form softblue={softblue} inputstatus={inputstatus} onSubmit={enter}>
                    <input type='email' placeholder="email" required onChange={e => setEmail(e.target.value)} disabled={inputstatus}></input>
                    <input type='password' placeholder="senha" required onChange={e => setPassword(e.target.value)} disabled={inputstatus}></input>
                    <button type='submit'>{(inputstatus)?<ThreeDots color="white"/>:'Entrar'}</button>
                </Form>
                <br />
                <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
            </LoginInfo>
        </ContainerLog>
    )
}

const LoginInfo = styled.div`
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