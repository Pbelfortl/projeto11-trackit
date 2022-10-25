import { Container } from "./GlobalStyles"
import TopBar from "./TopBar"
import { useContext, useEffect, useState } from "react"
import Context from "./Context"
import BottomBar from "./BottomBar"
import styled from "styled-components"
import axios from "axios"
import BASE_URL from "./constants/urls"
import { topcolor } from "./constants/colors"
import checkBox from "./images/checkbox.svg"
import userProgress from "./userProgress"


export default function TodayScreen () {

    const today = new Date()
    const weekDays = ['Domingo','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const weekDay = today.getDay()
    const day = today.getDate()
    const month = today.getMonth()
    const [userInfo, setUserInfo] = useContext(Context)
    const [todayTasks, setTodayTasks] = useState([])
    const [date, setDate] = useState(`${weekDays[weekDay]}, ${day}/${month+1}`)
    let doneTasks = 0
    const [progress, setProgress] = useState(doneTasks)
    let refresh = 0
    const [refreshState, setRefreshState] = useState(refresh)
    

    useEffect (()=> {
        axios.get(`${BASE_URL}/habits/today`,{ headers: { Authorization: `Bearer ${userInfo.token}`}})
            .then(ans => isDone(ans.data))
            .catch(ans => alert(ans.response.data.message))
    }, [refreshState, progress])

    function isDone (ans) {
        doneTasks = 0
        console.log(ans)
        setTodayTasks(ans)
        ans.forEach(element => {
            if(element.done===true){
                doneTasks++
            }
        });
        setProgress(doneTasks)
        userProgress.done = doneTasks
        userProgress.tasks = todayTasks.length
    }

    return(
        <Container>
            <TopBar/>
            <TodayDate>
                    {date} <br/>
                    <Progress progress={progress}>
                         {progress===0? 'Nenhum hábito concluído ainda' : `${parseInt(progress*100/(todayTasks.length))}% dos hábitos concluídos`}
                    </Progress>
            </TodayDate>
            <TodayContainer>
                {todayTasks.map((T) => 
                    <Today key={T.id} 
                        id={T.id} 
                        name={T.name} 
                        current={T.currentSequence} 
                        highest={T.highestSequence} 
                        done={T.done}  
                        userInfo={userInfo} 
                        refresh={refresh}
                        setRefreshState={setRefreshState}></Today>)}                
            </TodayContainer>
            <BottomBar/>
        </Container>
    )
}

function Today ({id, name, current, highest, done, refresh, userInfo, setRefreshState}) {

    const [doneState, setDoneState] = useState(done)

    function doneTask (doneState) {

        if(doneState === false){
            axios.post(`${BASE_URL}/habits/${id}/check`,{}, {headers: { Authorization: `Bearer ${userInfo.token}`}})
                .then(refreshPage(doneState))
                .catch(ans => alert(ans.response.data.message))
        }else{
            axios.post(`${BASE_URL}/habits/${id}/uncheck`,{}, {headers: { Authorization: `Bearer ${userInfo.token}` }})
                .then(refreshPage(doneState))
                .catch(ans => alert(ans.response.data.message))
        }
    }

    function refreshPage (ans) {
        setDoneState(!ans)
        setRefreshState(refresh++)
    }
    
    return(
        <Task doneState={doneState}>
            {name}
            <Sequence>
                Sequência atual: {current}<br/>
                Seu recorde: {highest}
            </Sequence>
            <ion-icon src={checkBox} onClick={()=> doneTask(doneState)}/>
        </Task>
    )

}



const Task = styled.div`
    box-sizing: border-box;
    padding: 13px;
    width: 340px;
    height: 94px;
    max-height: 90px;
    display: flex;
    flex-direction: column;
    background-color: white;
    margin-bottom: 15px;
    position: relative;
    justify-content: center;
    font-size: 20px;
    color: #666666;
    font-weight: 600;
    border-radius: 5px;
    ion-icon{
        position: absolute;
        right: 4px;
        width: 85px;
        height: 85px;
        cursor: pointer;
        color: ${props => props.doneState ? '#8FC549' : '#E7E7E7'};
    }

`

const TodayDate = styled.div`
    color: black;
    background-color: white;
    width: 340px;
    height: 50px;
    align-items: left;
    background-color: #F2F2F2;
    color: ${topcolor};
    font-size: 23px;
    font-weight: 400;
    position: absolute;
    top: 80px;
`
const Progress = styled.div`
    font-size: 18px;
    font-weight: 400;
    color: ${props => props.progress!==0 ? '#8FC549' : '#BABABA'};
`

const TodayContainer = styled.div`
    margin-top: 140px;
    height: 420px;
    max-height: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    position: relative;
    align-items: center;
    ::-webkit-scrollbar {
        display: none;
    }
`

const Sequence = styled.div`
    display: flex;
    font-size: 13px;
    margin-top: 5px;
`