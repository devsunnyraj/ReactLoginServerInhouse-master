import React,{useState, useContext, useEffect} from "react";

import Header from "./Header/Header"
import LoginForm from "./LoginForm/LoginForm";
import Footer from "./Footer/Footer";
import SignupForm from "./SignupForm/SingupForm"

import WelcomePage from "../Pages/WelcomePage/WelcomePage";

import '../styles/global.css'

import { loginContext } from "../contexts/loginContext";

import { loginDone } from "../contexts/loginDone";

const App = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [isLoginDone,setIsLoginDone] = useState(false)

    const [userName,setUserName] = useState("")

    console.log(userName);

    return(
        <div className="mainContainer">
            <loginDone.Provider value={{isLoginDone,setIsLoginDone,setUserName}}>
            {
                isLoginDone ? 
                <WelcomePage userName={userName}/> :
                <>
                    <Header/>
                    <loginContext.Provider value={{isLogin, setIsLogin}}>
                        {!isLogin ? <LoginForm/> : <SignupForm/> }
                    </loginContext.Provider>
                    <Footer/>
                </>
            }
            </loginDone.Provider>
        </div>
    )
}

export default App