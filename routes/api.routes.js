const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User.model");
const Image = require("../models/Image.model")
const uploadCloud = require("../config/cloudinary");


// Sign Up
router.post("/signup", (req, res) =>{
     console.log("Hi there ", req.body)
    const {username, password, email} = req.body;

    bcrypt
        .genSalt(saltRounds)
        .then( (salt) => bcrypt.hash(password, salt) )
        .then( (hashedPassword) => {
            User.create({
                username,
                email,
                password: hashedPassword
            })
        })
})

// Sign In
router.post("/signin", (req, res) =>{
    console.log('welcome in', req.session)
    const {username, password} = req.body;
    User.findOne({username})
        .then(username =>{
            if( bcrypt.compareSync(password, username.password) ){
                req.session.currentUser = username;
                res.status(200).json(req.session);
                // console.log(req.session)
            }
            else{ console.log('false')}
        } )
    })

// Log Out
router.post("/logout", (req, res) =>{
    res.clearCookie("connect.sid");
    req.session.destroy();
    console.log('session destroyed:', req.session)
})

// Get Auth
router.get("/auth" , (req, res) =>{
    console.log('hi')
    if(req.session){
        console.log(req.session)
        return res.status(200).json(req.session.currentUser);
    }
    else{
        return 
    }
})

// Get Images
router.get("/image", (req, res) =>{
    // console.log("Asking for Images")

    Image.find()
        .then(response => res.status(200).json(response) )
        .catch((err) => console.log(err));
})


// Upload Image 
router.post("/upload", uploadCloud.single("imageUrl"), (req, res, next) => {
    console.log("This is the Image", req.body)
    console.log("upload image link is: ", req.file);
    const {name} = req.body;
    
    const tags = JSON.parse(req.body.tags)
    const imageUrl = req.file.path;

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
    Image.create({name, imageUrl, tags})
    .then( (response) => {
         console.log("This is the Image", response)
         res.status(200).json({message: 'image uploaded'})
    })
    .catch(err => console.error(err))

  });
  



// router.post("/image", (req, res) =>{

    
// }) 


module.exports = router;