require('dotenv').config();
const express = require("express") ;
const app = express() 
const cors = require("cors") ;
const todoRouter = require("./src/routes/todo");
const connection = require("./src/db/connection/mongo");
require("./src/routes/mqttHandler")

app.use(cors()) ;
app.use(express.json()) ;
app.use(express.urlencoded()) ;

app.use("/", todoRouter) ;

app.listen(5000, async() => {
    await connection ;
    console.log("server start at 5000")
}) ; 
   