const session = require("express-session");
const MongoStore = require("connect-mongo");


module.exports = app => {
app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

    cookie: {
        maxAge: 60000
      },
    
    store: new MongoStore({
        mongoUrl: process.env.DB_URI || "mongodb://localhost/sharea",
        ttl: 14 * 24 * 60 * 60 
    })
}))

}