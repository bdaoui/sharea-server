const session = require("express-session");
const MongoStore = require("connect-mongo");


module.exports = app => {
app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: new MongoStore({
        mongoUrl: process.env.DB_URI || "mongodb://localhost/sharea",
        ttl: 60 * 60 * 24
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
      },
    
   
}))

}