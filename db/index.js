const express = require("express");
const app = express();
const mongoose = require("mongoose");


// Connection to MongoDb

mongoose
    .connect(process.env.DB_URI)
    .then( response =>{
        console.log(`Connected to Mongo ${response.connections[0].name}`)
    })
    .catch( err=> console.log("Error in Mongo connection, ", err));
 



module.exports = mongoose;