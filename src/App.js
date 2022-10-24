import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import { GlobalStyle } from "./GlobalStyles";
import HabitsScreen from "./HabitsScreen";
import TodayScreen from "./TodayScreen";
import Context from "./Context";
import { useState } from "react";


function App() {

  const [userInfo, setUserInfo] = useState({})

  return (
    <Context.Provider value={[userInfo, setUserInfo]}>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen/>}/>
          <Route path="/cadastro" element={<RegisterScreen/>} />
          <Route path="/habitos" element={<HabitsScreen/>} />
          <Route path="/hoje" element={<TodayScreen/>} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
