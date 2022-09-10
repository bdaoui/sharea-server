const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User.model");
const uploadCloud = require("../config/cloudinary");


// Sign Up

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

// Sign In

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


// Log Out

router.delete("/logout", (req, res) =>{
    res.clearCookie("connect.sid");
    req.session.destroy();
})
    

// Get Auth

router.get("/auth" , (req, res) =>{
    if(req.session.currentUser){
        return res.status(200).json(req.session);
    }

    else{
        return false
    }

})


// Upload Image 

router.post("/image", uploadCloud.single(`image`), (req, res) =>{
    console.log("Hi, I'm Uploading an Image")
    console.log(req.body)
    console.log(req.file)
    const {name} = req.body;
    const {path} = req.file;

    Image.create({
        name,
        image: path,
    })
    .catch(err => console.error(err))

}) 


module.exports = router;