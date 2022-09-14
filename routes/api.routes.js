const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User.model");
const Image = require("../models/Image.model")
const uploadCloud = require("../config/cloudinary");
const { get } = require("mongoose");


// Sign Up
router.post("/signup", (req, res) =>{
    console.log("Hi there ", req.body)
    const {username, password, email} = req.body;
    bcrypt
        .genSalt(saltRounds)
        .then( (salt) => bcrypt.hash(password, salt) )
        .then( (hashedPassword) => {
            User.create({ username, email, password: hashedPassword })
        })
});

// Sign In
router.post("/signin", (req, res) =>{
    console.log('welcome in', req.session)
    const {username, password} = req.body;
  
    User.findOne({username})
        .then(username =>{
            if( bcrypt.compareSync(password, username.password) ){
                req.session.currentUser = username;
<<<<<<< HEAD
                console.log(req.session)
                res.status(200).json(username);
                // console.log(req.session)
            }
            else{ console.log('false')}
        } )
        .catch(err => console.log(err))
    })
=======
                res.status(200).json(username);
            }
            else{ console.log('false')}
        })
});
>>>>>>> 375dabd5a3b4f4666776244dd149545f8716660f

// Log Out
router.post("/logout", (req, res) =>{
    console.log(req.session)
    //res.clearCookie("connect.sid");
    req.session.destroy();
    console.log('session destroyed:', req.session)
});

// Get Auth
router.get("/auth" , (req, res) =>{
<<<<<<< HEAD

    console.log(req.session)
    res.status(200).json(req.session.currentUser);
   
})

router.get("/auth/:id", (req, res) =>{
    const {id} = req.params;
    User.findById(id)
        .then(response =>{
            req.session.currentUser = response;
            res.json(response)
        })
        .catch(err => console.log(err));
})
=======
    console.log('hi')
    if(req.session){
        return res.status(200).json(req.session.currentUser);
    }
    else{
        return 
    }
});
>>>>>>> 375dabd5a3b4f4666776244dd149545f8716660f

// Get Images
router.get("/image", (req, res) =>{
    Image.find()
        .then(response => res.status(200).json(response) )
        .catch((err) => console.log(err));
});


// Upload Image 
router.post("/upload", uploadCloud.single("imageUrl"), (req, res, next) => {
    const {name} = req.body;
    const tags = JSON.parse(req.body.tags)
    const imageUrl = req.file.path;
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    Image.create({name, imageUrl, tags})
    .then( (response) => {
         console.log("This is the Image", response)
         res.status(200).json({message: 'image uploaded'})
    })
    .catch(err => console.error(err))
});
  
router.post("/profile", (req, res) => {
    const {location, occupation, info, id} = req.body;
    if (!location && !occupation && !info){
        res.status(500).json({message: 'Please enter input'})
    }
    User.findByIdAndUpdate({ _id:id }, { location: location, occupation: occupation, info: info})
        .then( (res) => console.log(res))
        .catch((err) => console.log(err))
})



module.exports = router;