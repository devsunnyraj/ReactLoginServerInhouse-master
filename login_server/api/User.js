const express = require("express")
const router = express.Router()

//mongodb user model
const User = require('../models/User')

const bcrypt = require("bcrypt")

// Signup 
router.post("/signup",(req,res)=>{
    let {name,email,password,dateOfBirth} = req.body

    name = name.trim()
    email = email.trim()
    password = password.trim()
    dateOfBirth = dateOfBirth.trim()

    if(name == "" || email == "" || password == "" || dateOfBirth == ""){
        res.json({
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            status : "FAILED",
            message : "Empty input Fields"
        })
    }else if(!/^[a-zA-Z]*$/.test(name)){
        res.json({
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            status : "FAILED",
            message : "Invalid Name Entered"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            status : "FAILED",
            message : "Invalid Email Entered"
        })
    }else if(!new Date(dateOfBirth).getTime()){
        res.json({
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            status : "FAILED",
            message : "Invalid D.O.B. Entered"
        })
    }else if(password.length < 8){
        res.json({
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            status : "FAILED",
            message : "Password is too short!"
        })
    }else {
        User.find({email}).then(result=>{
            if(result.length){
                res.json({
                    statusCode: 200,
                    headers: {'Content-Type': 'application/json'},
                    status : "FAILED",
                    message : "User with same email already exists"
                })
            }else{
                const saltRounds = 10
                bcrypt.hash(password,saltRounds).then(hashedPassword=>{
                    const newUser = new User({
                        name,
                        email,
                        password : hashedPassword,
                        dateOfBirth
                    })

                    newUser.save().then(result=>{
                        res.json({
                            statusCode: 200,
                            headers: {'Content-Type': 'application/json'},
                            status : "SUCCESS",
                            message : "Signup Successfull",
                            data: result
                        })
                    }).catch(err=>{
                        res.json({
                            statusCode: 200,
                            headers: {'Content-Type': 'application/json'},
                            status : "FAILED",
                            message : "An error occured while saving User"
                        })
                    })
                    
                }).catch(err=>{
                    res.json({
                        statusCode: 200,
                        headers: {'Content-Type': 'application/json'},
                        status : "FAILED",
                        message : "An error occured while hashing password"
                    })
                })
            }
        }).catch(err=>{
            console.log(err)
            res.json({
                statusCode: 200,
                headers: {'Content-Type': 'application/json'},
                status : "FAILED",
                message : "An error occured while checking for existing user"
            })
        })
    }
})


// Signin
router.post("/signin",(req,res)=>{
    let {email,password} = req.body

    email = email.trim()
    password = password.trim()

    if(email == "" || password == ""){
        res.json({
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            status: "FAILED",
            message : "Empty Credentails"
        })
    }else{
        User.find({email}).then(data=>{
            if(data.length){
                const hashedPassword = data[0].password
                bcrypt.compare(password,hashedPassword).then(result=>{
                    if(result){
                        res.json({
                            statusCode: 200,
                            headers: {'Content-Type': 'application/json'},
                            status: "SUCCESS",
                            message : "Signin Successful",
                            data:data
                        })
                    } else{
                        res.json({
                            statusCode: 200,
                            headers: {'Content-Type': 'application/json'},
                            status : "FAILED",
                            message :"Invalid password Entered"
                        })
                    }
                }).catch(err=>{
                    res.json({
                        statusCode: 200,
                        headers: {'Content-Type': 'application/json'},
                        status: "FAILED",
                        message: "An error occured while comparing passwords"
                    })
                })
            } else{
                res.json({
                    statusCode: 200,
                    headers: {'Content-Type': 'application/json'},
                    status : "FAILED",
                    message : "Invalid Credentials Entered"
                })
            }
        }).catch(err=>{
            res.json({
                statusCode: 200,
                headers: {'Content-Type': 'application/json'},
                status: "FAILED",
                message: "An error occured while checking for exisitng user"
            })
        })
    }
})

module.exports = router