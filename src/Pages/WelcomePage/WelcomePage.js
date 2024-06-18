import React,{useContext} from "react";

import './WelcomePage.css'

import { loginDone } from "../../contexts/loginDone";

const WelcomePage = ({userName}) => {

    const loginDoneStatus = useContext(loginDone)

    return(
        <div className="welcomeText">Welcome
            <span className="welcomeTextName">{" "+userName+ " !"}</span>
            <button className="logOutButton" onClick={()=>loginDoneStatus.setIsLoginDone(false)}>Log out</button>
        </div>
    )
}

export default WelcomePage