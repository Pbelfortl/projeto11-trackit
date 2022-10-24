import { Container } from "./GlobalStyles"
import TopBar from "./TopBar"
import BottomBar from "./BottomBar"
import styled from "styled-components"
import { topcolor } from "./constants/colors"


export default function HistoricScreen () {
    return (
        <Container>
            <TopBar/>
                <HistoricBox>
                    <Title>
                        Histórico
                    </Title>
                    <Text>
                        Em breve você poderá ver o histórico dos seus hábitos aqui!
                    </Text>
                </HistoricBox>
            <BottomBar/>
        </Container>
    )
}

const HistoricBox = styled.div`
    margin-top: 100px;
    color: ${topcolor};
    width: 340px;

`

const Title = styled.div`
    font-size: 23px;
    font-weight: 400;
`

const Text = styled.div`
    margin-top: 20px;
    font-size: 18px;
    font-weight: 400;
    color: #666666;
`