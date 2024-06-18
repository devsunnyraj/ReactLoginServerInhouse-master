import React, { useState, useContext, useRef} from "react";
import './LoginForm.css'

import axios from "axios";

import { loginContext } from "../../contexts/loginContext";

import { loginDone } from "../../contexts/loginDone";

const LoginForm = () => {

    const statusTextRef = useRef()

    const loginStatus = useContext(loginContext)

    const loginDoneStatus = useContext(loginDone)

    const [emailValue,setEmailValue] = useState('')
    const [passValue,setPassValue] = useState('')

    const [statusValue, setStatusValue] = useState("Enter your credentials !")

    const handleSubmit = () => {
        const url = "http://localhost:4000/user/signin";

        const credentials = {
            email : emailValue,
            password : passValue
        }
        
        axios
        .post(url,credentials)
        .then((response)=>{
            const result = response.data;
            const {message,status,data}=result
            setStatusValue(message)

            if(status === "SUCCESS"){
                statusTextRef.current.classList.remove("statustextFail")
                statusTextRef.current.classList.add("statustextSuccess")
                setStatusValue(message)
                loginDoneStatus.setIsLoginDone(true)
                loginDoneStatus.setUserName(data[0].name)
            }

        })
        .catch(error=>{
            console.log("Error");
            console.log(error);
        })
    }

    return(
        <div id="RegisterMainDiv">
                <input type="email" required placeholder="Enter your email address" className="input-field formComponent" value={emailValue} onChange={e => setEmailValue(e.target.value)}/>
                <input type="password" required placeholder="Enter the password" className="input-field formComponent" value={passValue} onChange={e => setPassValue(e.target.value)}/>
                <button style={{cursor:"pointer"}} className="formComponent" onClick={handleSubmit}>Login</button>
                <span ref={statusTextRef} className="statustextFail formComponent">{statusValue}</span>
                <span style={{cursor:"pointer",textDecoration:"underline"}} className="signuptext formComponent" onClick={()=>loginStatus.setIsLogin(true)}>Don't have an account? Signup Now !</span>
        </div>
    )
}

export default LoginForm