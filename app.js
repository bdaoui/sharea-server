const express = require("express");
const app = express();

const cors = require("cors");

// Env file

require("dotenv/config");


// Setting Port
const PORT = process.env.PORT || 3001;

// Connect to db

require("./db");

// Session

require("./config/session")(app);

// In-node built body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors 

app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "http://localhost:3000",
    })
  );


// Routes

const AllRoutes = require("./routes/api.routes");
app.use("/api", AllRoutes);



app.listen( PORT, () =>{
    console.log("Server is listening on port ", PORT)
})

module.exports = app;