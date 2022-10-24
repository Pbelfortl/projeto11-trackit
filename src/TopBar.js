import styled from "styled-components"
import { useContext } from "react"
import Context from "./Context"
import { topcolor } from "./constants/colors"


export default function TopBar () {

    const [userInfo, setUserInfo] = useContext(Context)

    return(
        <Bar>
            <Logo>TrackIt</Logo>
            <img src={userInfo.image} />
        </Bar>
    )
}

export const Bar = styled.div`
    box-sizing: border-box;
    display:flex;
    width: 375px;
    height: 70px;
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${topcolor};
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    img{
        width: 51px;
        height:51px;
        border-radius:50%;
    }
`
const Logo = styled.div`
    font-family: 'Playball', sans-serif;
    font-size: 39px;
    color:white;
`
const UserImg = styled.div`
`