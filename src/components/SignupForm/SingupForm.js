import React, { useState, useContext, useRef } from "react";
import './SingupForm.css'

import axios from "axios";

import { loginContext } from "../../contexts/loginContext";

const LoginForm = () => {

    const statusTextRef = useRef()

    const loginStatus = useContext(loginContext)

    const [emailValue,setEmailValue] = useState('')
    const [passValue,setPassValue] = useState('')
    const [dateOfBirth,setdateOfBirth] = useState('')
    const [userName,setUserName] = useState('')
    const [statusValue, setStatusValue] = useState("Enter your credentials !")


    const handleSubmit = () => {
        const url = "http://localhost:4000/user/signup";

        const credentials = {
            email : emailValue,
            password : passValue,
            dateOfBirth : dateOfBirth,
            name: userName
        }
        
        axios
        .post(url,credentials)
        .then((response)=>{
            const result = response.data;
            const {message,status,data}=result


            setStatusValue(message)

            if(status === "SUCCESS"){
                setEmailValue("")
                setPassValue("")
                setUserName("")
                setdateOfBirth("")
                statusTextRef.current.classList.remove("statustextFail")
                statusTextRef.current.classList.add("statustextSuccess")
                setStatusValue(message+" Please Login !")
            }
        })
        .catch(error=>{
            console.log("Error");
            console.log(error);
        })
    }

    return(
        <div id="RegisterMainDiv">
                <input type="text" required placeholder="Enter userName" className="input-field formComponent" value={userName} onChange={e => setUserName(e.target.value)}/>
                <input type="email" required placeholder="Enter your email address" className="input-field formComponent" value={emailValue} onChange={e => setEmailValue(e.target.value)}/>
                <input type="password" required placeholder="Enter the password" className="input-field formComponent" value={passValue} onChange={e => setPassValue(e.target.value)}/>
                <input type="date" required placeholder="Enter the D.O.B." className="input-field formComponent" value={dateOfBirth} onChange={e => setdateOfBirth(e.target.value)}/>
                <button style={{cursor:"pointer"}} className="formComponent" onClick={handleSubmit}>Signup</button>
                <span ref={statusTextRef} className="statustextFail formComponent">{statusValue}</span>
                <span style={{cursor:"pointer",textDecoration:"underline"}} className="signuptext formComponent" onClick={()=>loginStatus.setIsLogin(false)}>Already have an account? Signin Now !</span>
        </div>
    )
}

export default LoginForm