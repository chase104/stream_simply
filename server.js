require('dotenv').config()
const express = require('express');
const request = require('request');
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require("cors");

const passport = require('passport');
const session = require('express-session');
const router = express.Router();
const initializePassport = require('./passport-config');
const client = require('./db');
const app = express();
const cookieParser = require('cookie-parser')

initializePassport(passport,
     async email =>  {
     const findUser = await client.query('SELECT * FROM users WHERE email = $1', [email])
     console.log(findUser)
     return findUser
     },
     async id =>  {
     const findUser = await client.query('SELECT * FROM users WHERE id = $1', [id])
     console.log(findUser)
     return findUser
   }
)



// Initialize Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(session({
  secret: process.env.SECRET_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(cookieParser(process.env.SECRET_SECRET));
app.use(passport.initialize())
app.use(passport.session())


//----------------------------------------END OF MIDDLEWARE ----------------------------------//

//----------------------------------------START OF ROUTES------------------------------------//

//check if user is logged in
app.get('/checkUser', function(req,res) {
  console.log("checking user");
  if(req.user) {
    res.json({
      loggedIn: true
    })
  } else {
    res.json({
      loggedIn: false
    })
  }
})

//get user
app.get('/getuser', (req, res) => {
  console.log(req.body);
  console.log(req.user);
  res.json(req.user)
})


app.get('/userinfo', (req, res) => {
  console.log("req:", req);
  console.log("user:", req.user);
  res.json({
    ...req.user,
  })
})

// Get featuredMovie Route
const featuredMovie = require('./routes/api/featured_movie')
app.use('/getFeaturedMovie', featuredMovie);

// Set Static Folders
app.use(express.static(path.join(__dirname, 'client', 'build')))


//Get user db route
app.post('/signup', async function(req, res){
    console.log("running registration");
    console.log(req);
    console.log(req.body);
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = await client.query("INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *",
    [req.body.firstname, req.body.lastname, req.body.email, hashedPassword]);

    res.json({
      exists: false,
      newUser: newUser
    })
    client.end();
})





app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("info coming");
    console.log(info);
    if (err) throw err
    if (!user) res.json({
      message: "no user with that email",
      loggedIn: false
    })
    else {
      req.logIn(user, err =>{
        if (err) console.log(err)
        res.json({
          message: "successfully Authenticated",
          loggedIn: true
        });
        console.log(req.user)
      })
    }
  })(req, res, next);
})



app.get('/logout', function(req,res) {
  console.log("logging out");
  req.logOut();
  res.send("logged out")
})

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
//-------------------------------------END OF ROUTES-------------------------------//



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
