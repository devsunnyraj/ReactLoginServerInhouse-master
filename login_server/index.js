//mongoDB
require('./config/db')

const cors = require('cors')

const app = require("express")()
const port = process.env.PORT || 4000;

const UserRouter = require("./api/User")

app.use(cors(
    {origin: "http://localhost:3000"}
))

// Accepting Post from Data

const bodyParser = require("express").json
app.use(bodyParser())

app.use('/user',UserRouter)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})


exports.handler = async (event) => {
        var res ={
            "statusCode": 200,
            "headers": {
                "Content-Type": "*/*"
            }
        };
        res.body = "gugus";
        return res;
    };