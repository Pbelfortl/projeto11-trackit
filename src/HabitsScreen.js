import { Container } from "./GlobalStyles"
import TopBar from "./TopBar"
import BottomBar from "./BottomBar"
import styled from "styled-components"
import { softblue, topcolor } from "./constants/colors"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import BASE_URL from "./constants/urls"
import Context from "./Context"
import trash from "./images/trash-outline.svg"
import { ThreeDots } from "react-loader-spinner";


export default function HabitsScreen() {

    let habit
    const weekDay = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
    let habitsDays = []
    const [show, setShow] = useState(false)
    const [userInfo, setUserInfo] = useContext(Context)
    const [habitsList, setHabitsList] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [inputstatus, setInputStatus] = useState(false)
    let counter = 0

    useEffect(() => {
        axios.get(`${BASE_URL}/habits`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
            .then(ans => refreshPage(ans.data.reverse()))
            .catch(ans => alert(ans.response.data.message))
    }, [refresh])

    function refreshPage (ans) {
        setHabitsList([...ans])
        setInputStatus(false)
        setShow(false)
        setRefresh(counter++)
    }

    function submitHabit(event) {
        event.preventDefault()
        if (habitsDays.length === 0) {
            alert("Selecione pelo menos um dia!")
            return
        }
        setInputStatus(true)
        axios.post(`${BASE_URL}/habits`, { name: habit, days: habitsDays }, { headers: { Authorization: `Bearer ${userInfo.token}` } })
            .then(setRefresh(counter++))
            .catch(ans => alert(ans.response.data.message))
        habitsDays = []
        habit = undefined
    }

    function deleteHabit(id) {
        
        if(window.confirm('Deseja excluir a tarefa?')){
            axios.delete(`${BASE_URL}/habits/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } })
            .then(setRefresh(counter++))
            .catch(ans => alert(ans.response.data.message))   
        }
    }

    return (
        <Container>
            <TopBar />
            <HabitsContainer>
                <MyHabits>Meus Hábitos<button onClick={() => setShow(true)}>+</button></MyHabits>
                {show === true &&
                    <CreateHabit inputstatus={inputstatus}>
                        <form onSubmit={submitHabit}>
                            <input type='text' placeholder="nome do hábito" maxLength="24" onChange={e => habit = (e.target.value)} disabled={inputstatus}></input>
                            <Week>
                                {weekDay.map((day, i) => <Days key={i} day={day} index={i} weekDay={weekDay} habitsDays={habitsDays}></Days>)}
                            </Week>
                            <SaveHabit>
                                <CancelButton type="button" onClick={() => (setShow(false))}>Cancelar</CancelButton>
                                <SaveButton type="submit">{inputstatus? <ThreeDots color="white" width='50px'/>: 'Salvar'}</SaveButton>
                            </SaveHabit>
                        </form>
                    </CreateHabit>}
                {habitsList.length===0 && 
                    <Message>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Message>}
                <Habits>
                    {habitsList.map((H) => <Task key={H.id}>{H.name}
                        <Week>{weekDay.map((D, i) => (H.days.includes(i)) ?
                            <Day key={i} selected={true}>{D}</Day> :
                            <Day key={i}>{D}</Day>)}</Week>
                        <img src={trash} alt="trash" onClick={() => deleteHabit(H.id)} />
                    </Task>)}
                </Habits>
            </HabitsContainer>
            <BottomBar />
        </Container>
    )
}

function Days({ day, index, habitsDays }) {

    const [selected, setSelect] = useState(false)

    function selectDay(day) {

        if (habitsDays.includes(day)) {
            const ind = habitsDays.indexOf(day)
            habitsDays.splice(ind, 1)
            setSelect(!selected)
        } else {
            habitsDays.push(day)
            setSelect(!selected)
            console.log(habitsDays)
        }
    }

    return (
        <Day type="button" selected={selected} onClick={() => selectDay(index)}>{day}</Day>
    )
}

const MyHabits = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: ${topcolor};
    width: 340px;
    justify-content: space-between;
    font-size: 23px;
    font-weight: 400;
    margin-bottom: 10px;
    button{
        cursor: pointer;
        border: none;
        background-color: ${softblue};
        width: 40px;
        height: 35px;
        color: white;
        border-radius: 5px;
        font-size: 27px;
    }

`
const HabitsContainer = styled.div`
    margin-top: 70px;
    padding-top: 30px;
    max-height: 490px;
    overflow: hidden;
`
const CreateHabit = styled.div`
    box-sizing: border-box;
    display: flex;
    box-sizing: border-box;
    width: 340px;
    height: 180px;
    padding: 18px;
    background-color: white;
    border-radius: 8px;
    flex-direction: column;
    opacity: ${props => props.inputstatus? 0.5: 1};
    input{
        width: 303px;
        height: 45px;
        border-radius: 5px;
        border: solid 1px #D4D4D4;
        color: gray;
        font-size: 20px;
        box-sizing: border-box;
        outline: 0;
        ::placeholder{
            color: #D4D4D4;
        }
    }
`
const Week = styled.div`
    display: flex;
    margin-top: 7px;
`
const SaveHabit = styled.div`
    box-sizing: border-box;
    width: 303px;
    height: 30px;
    display:flex;
    margin-top: 30px;
    justify-content: end;
`
const CancelButton = styled.button`
    width: 84px;
    height: 35px;
    border-radius: 5px;
    background-color: white;
    color: ${softblue};
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-right: 10px;
`
const SaveButton = styled.button`
    width: 84px;
    height: 35px;
    border-radius: 5px;
    background-color: ${softblue};
    color: white;
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Day = styled.button`
        width: 30px;
        display: flex;
        height: 30px;
        border: solid 1px #D4D4D4;
        color:  ${props => (props.selected) ? 'white' : '#D4D4D4'};
        background-color: ${props => (props.selected) ? '#D4D4D4' : 'white'};
        border-radius: 6px;
        font-size: 20px;
        margin-right: 3px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 20px;
        font-weight: 400;
`
const Habits = styled.div`
    overflow-y: scroll;
    max-height: 415px;
    ::-webkit-scrollbar {
        display: none;
    }
`
const Task = styled.div`
    box-sizing: border-box;
    border-radius: 8px;
    width: 340px;
    height: 90px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 5px;
    margin-top: 10px;
    position: relative;
    padding: 15px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: #666666;
    img{
        width: 17px;
        height: 19px;
        top: 8px;
        right: 8px;
        position: absolute;
        cursor: pointer;
    }
`
const Message = styled.div`
    margin-top: 15px;
    width: 335px;
    height: 75px;
    font-size: 18px;
    color: #666666;
    padding-left: 5px;
`