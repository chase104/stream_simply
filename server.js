require("dotenv").config();
const express = require("express");
const request = require("request");
const path = require("path");
const bcrypt = require("bcrypt");
const cors = require("cors");
const axios = require('axios')
const passport = require("passport");
const session = require("express-session");
const router = express.Router();
const initializePassport = require("./passport-config");
const client = require("./db");
const app = express();
const cookieParser = require("cookie-parser");

initializePassport(
  passport,
  async email => {
    const findUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return findUser;
  },
  async id => {
    const findUser = await client.query("SELECT * FROM users WHERE id = $1", [
      id
    ]);
    return findUser;
  }
);

// Initialize Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

app.use(
  session({
    secret: process.env.SECRET_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(cookieParser(process.env.SECRET_SECRET));
app.use(passport.initialize());
app.use(passport.session());

//----------------------------------------END OF MIDDLEWARE ----------------------------------//

//----------------------------------------START OF ROUTES------------------------------------//

//check if user is logged in
app.get('/checkUser', function(req,res) {
  if(req.user) {
    res.json({
      loggedIn: true,
      user: req.user
    })

  } else {
    res.json({
      loggedIn: false
    });
  }
});

//get user
app.get("/getuser", (req, res) => {
  res.json(req.user);
});

app.get("/userinfo", (req, res) => {
  if (!req.user){
    res.json(false)
  } else {
    let initials = req.user.firstname.charAt(0).toUpperCase() + req.user.lastname.charAt(0).toUpperCase()
    res.json({
      ...req.user,
      initials: initials
    })
  }

})


// Get featuredMovie Route
const featuredMovie = require("./routes/api/featured_movie");
app.use("/getFeaturedMovie", featuredMovie);


const getTmbd = require("./routes/api/get_tmbd")
app.use("/getTmbd", getTmbd)


app.post("/getMovieAvailability", function (req, res) {
  const options = {
    method: "GET",
    url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup',
    params: {source_id: req.body.movieId, source: 'tmdb', country: 'us'},
    headers: {
    'x-rapidapi-key': process.env.REACT_APP_UTELLY_API_KEY,
    'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'
  }
}
      axios.request(options).then(function (response) {
        res.json({
          response: response.data
        })
      }).catch(function (error) {
      	console.error(error);
      });
  })

app.post("/search", function (req, res) {
  res.send("search results")
})

// Set Static Folders
app.use(express.static(path.join(__dirname, "client", "build")));

//Get user db route
app.post("/signup", async function(req, res) {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await client.query(
    "INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *",
    [req.body.firstname, req.body.lastname, req.body.email, hashedPassword]
  );

  res.json({
    exists: false,
    newUser: newUser
  });

});

app.put("/servicesupdate", async function(req, res){
  const servicesUpdate = await client.query(
    "UPDATE users SET services = $1 WHERE id = $2", [req.body.services, req.user.id]
  )
  res.json({
    update: servicesUpdate
  })
})

app.put("/personalupdate", async function(req, res){
  const format = require('pg-format')
  const columnStatements = []
  const infoStatements = []
    for (var prop in req.body) {
      try {
        const sqlStatement = format('UPDATE users SET %I = %L where id = %L', `${prop}`, `${req.body[prop]}`, `${req.user.id}`)
         const query = await client.query(
           sqlStatement
         )
        res.json({
          update: query
        })
      } catch (error) {
        console.log(error);
      }
    }
})

app.put("/setfavorite", async function(req, res){

  const format = require('pg-format')
   if (req.body.typeOf == "ADD") {
      const sqlStatement = format('UPDATE users SET %I = %s WHERE id = %L', "favorites", `favorites || '{${req.body.movieId}}'`, `${req.user.id}`)
      try {
        const favoritesUpdate = await client.query(
          sqlStatement
        )
        res.json({
          update: favoritesUpdate
        })
      } catch (error) {
        console.log(error);
      }
    } else if (req.body.typeOf == "REMOVE"){
      const sqlStatement = format('UPDATE users SET %I = %s WHERE id = %L', "favorites", `array_remove(favorites, ${req.body.movieId})`, `${req.user.id}`)
      try {
        const favoritesUpdate = await client.query(
          sqlStatement
        )
        res.json({
          update: favoritesUpdate
        })
      } catch (error) {
        console.log(error);
      }
    }
})

app.put("/setbookmark", async function(req, res){
  const format = require('pg-format')
   if (req.body.typeOf == "ADD") {
      const sqlStatement = format('UPDATE users SET %I = %s WHERE id = %L', "watchlist", `watchlist || '{${req.body.movieId}}'`, `${req.user.id}`)
      try {
        const watchlistUpdate = await client.query(
          sqlStatement
        )
        res.json({
          update: watchlistUpdate
        })
      } catch (error) {
        console.log(error);
      }
    } else if (req.body.typeOf == "REMOVE"){
      const sqlStatement = format('UPDATE users SET %I = %s WHERE id = %L', "watchlist", `array_remove(watchlist, ${req.body.movieId})`, `${req.user.id}`)
      try {
        const watchlistUpdate = await client.query(
          sqlStatement
        )
        res.json({
          update: watchlistUpdate
        })
      } catch (error) {
        console.log(error);
      }
    }
})

app.get("/getFavorites", function (req, res) {
  let favoritesArr = req.user.favorites
  let foundMoviesArr = []
  //reach out and get movies by ID
  let arrLength = favoritesArr.length
  let counter = 0
  for (var i=0; i<favoritesArr.length; i++){
    let options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${favoritesArr[i]}?api_key=${process.env.TMDB_KEY}&language=en-US`
    }
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        foundMoviesArr.push(JSON.parse(body))
        counter++
        if (counter === arrLength) {
          res.json({
            movies: foundMoviesArr,
            watchlist: req.user.watchlist
          })
        }
      }
    })
  }
})

app.get("/getWatchlist", function (req, res) {
  console.log(req.user);
  let watchlistArr = req.user.watchlist
  console.log("favorites: ", watchlistArr);
  let foundMoviesArr = []
  //reach out and get movies by ID
  let arrLength = watchlistArr.length
  let counter = 0
  console.log("arrLength:", arrLength);
  for (var i=0; i<watchlistArr.length; i++){
    let options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${watchlistArr[i]}?api_key=${process.env.TMDB_KEY}&language=en-US`
    }
    console.log(options);
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("body.id: ",body.id);
        foundMoviesArr.push(JSON.parse(body))
        counter++
        console.log("counter:", counter, "arrLength", arrLength);
        if (counter === arrLength) {
          res.json({
            movies: foundMoviesArr,
            favorited: req.user.favorites
          })
        }
      }
    })
  }
})

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("info coming");
    console.log(info);
    if (err) throw err;
    if (!user)
      res.json({
        message: "no user with that email",
        loggedIn: false
      });
    else {
      req.logIn(user, err => {
        if (err) console.log(err);
        res.json({
          message: "successfully Authenticated",
          loggedIn: true
        });
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.get("/logout", function(req, res) {
  console.log("logging out");
  req.logOut();
  res.send("logged out");
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
//-------------------------------------END OF ROUTES-------------------------------//

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
