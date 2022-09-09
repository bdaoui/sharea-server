const router = require("express").Router();
const bcrypt = require("bcrypt");
const { response } = require("../app");
const saltRounds = 10;
const User = require("../models/User.model");



router.post("/signup", (req, res) =>{
     console.log("Hi there ", req.body)
    const {username, password, email} = req.body;
    bcrypt
        .genSalt(saltRounds)
        .then( (salt) => bcrypt.hash(password, salt) )
        .then( (hashedPassword) => 
        {
            User.create({
                username,
                email,
                password: hashedPassword
            })

        })

})

router.post("/signin", (req, res) =>{
    console.log("Loggin in? ", req.body)

    const {username, password} = req.body;
  
    User.findOne({username})
        .then(user =>{
            if( bcrypt.compareSync(password, user.password) ){
                req.session.currentUser = user;
                console.log(req.session)
            }
            else{ console.log('false')}
        } )
    
    })
    

router.get("/auth" , (req, res) =>{
    res.send(req.session.user);

})





module.exports = router;