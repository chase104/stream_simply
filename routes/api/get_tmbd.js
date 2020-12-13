const express = require("express");
const router = express.Router();
const path = require("path");
bodyParser = require('body-parser');

const request = require("request");

const uTellyApi = require("../../config/keys").uTellyApi;
const omdbApi = require("../../config/keys").omdbApi;


router.post("/makeSearch", (req, res) => {
  console.log(req.body);
  let options
  if (req.body.data == undefined || null) {
     options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&page=2&include_adult=false"
    }
  } else {
    console.log("it's valid");
     options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/search/movie?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&query=${req.body.data}&page=1&include_adult=false`
    }
  }

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
})



router.post("/makeCategorySearch", async (req, res) => {
  let options
  console.log("Req.body:", req.body);

  let gteDate = req.body.years[0] + "-01-01";
  let lteDate = req.body.years[1] + "-12-31"
  console.log("gte: ", gteDate);
  console.log("lte: ", lteDate);

  if (req.body.include_previous) {
    if (req.body.include_genres) {
      let addGenres = req.body.genres.join()
      console.log("include previous and genres");
      options = {
        method: "GET",
        typeOf: "previous&genres",
        genres: req.body.genres,
        years: req.body.years,
        url: `https://api.themoviedb.org/3/search/movie?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&query=${req.body.previous_search}&page=1&include_adult=false`
      }
    } else  {
      let addGenres = req.body.genres.join('|')
      console.log("addgenres", addGenres);
      console.log("include previous no genres");
      if (addGenres != null || addGenres != undefined) {
        options = {
          method: "GET",
          typeOf: "previous&nogenres",
          years: req.body.years,
          genres: req.body.genres,
          url: `https://api.themoviedb.org/3/search/movie?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&query=${req.body.previous_search}&page=1&with_genres=${addGenres}`
        }
      } else {
        options = {
          method: "GET",
          typeOf: "previous&nogenres",
          years: req.body.years,
          genres: req.body.genres,
          url: `https://api.themoviedb.org/3/search/movie?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&query=${req.body.previous_search}&page=1`
        }
      }

    }
  } else {
    if (req.body.include_genres) {
      console.log("no previous yes genres");

      let addGenres = req.body.genres.join()
      console.log("addGenres: ", addGenres);
      options = {
        method: "GET",
        typeOf: "no-previous&yes-genres",
        years: req.body.years,
        addGenres: addGenres,
        url: `https://api.themoviedb.org/3/discover/movie?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=${gteDate}&release_date.lte=${lteDate}&with_genres=${addGenres}`
      }
    } else  {
      console.log("no-previous&no-genres");
      let addGenres = req.body.genres.join('|')
      options = {
        method: "GET",
        addGenres: addGenres,
        years: req.body.years,
        typeOf: "no-previous&no-genres",
        url: `https://api.themoviedb.org/3/discover/movie?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=${gteDate}&release_date.lte=${lteDate}&with_genres=${addGenres}`
      }
    }
  }






  if (options.typeOf === "previous&genres") {
        console.log("previous&genres");
        console.log(options.genres);
          const callLoop = async () => {
            const moviess = []
            const lastCall = (movies) => {
              if (res.headersSent){
                console.log("null send");
              } else {
                console.log("sending");
                res.send(movies)
              }
            }
                for (var i=1; moviess.length < 20 && i < 10; i++) {
                  options.url = `https://api.themoviedb.org/3/search/movie?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&query=${req.body.previous_search}&page=${i}&include_adult=false`
                  console.log(i)
                  console.log(options)
                  var counter = 0

                   request(options, function(error, response, body){
                      console.log("running request NUMBER:", i )
                      console.log(options);
                      JSON.parse(body).results.map((item) => {
                        const d = new Date(item.release_date)
                        const date = d.getFullYear()
                        const dateMatch = (date > options.years[0] && date < options.years[1]) ? true : false;
                        console.log(item.release_date, item.genre_ids);
                        if (options.genres.every(v => item.genre_ids.includes(v)) && dateMatch && item.id !=265147) {
                          console.log("match");
                          moviess.push(item)
                        }
                      })
                      counter++
                      console.log("COUNTER COUNTER COUNTER COUNTER", counter);
                      console.log("movies length: ", moviess.length);
                      if (moviess.length >= 20 || counter >= 9) {
                        console.log("moviess length", moviess.length);
                        lastCall(moviess)
                      }
                    })
                  }
          }
        callLoop()

      } else if (options.typeOf === "previous&nogenres"){
        console.log("previous&nogenres");
        const callLoopTwo = async () => {
          const moviess = []
          const lastCall = (movies) => {
            if (res.headersSent){
              console.log("null send");
            } else {
              console.log("sending");
              console.log(options);
              console.log("movies", movies);
              res.send(movies)
            }
          }
              for (var i=1; moviess.length < 20 && i < 15; i++) {
                options.url = `https://api.themoviedb.org/3/search/movie?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&query=${req.body.previous_search}&page=${i}&include_adult=false`
                console.log(i)
                console.log(options)
                var counter = 0
                 request(options, function(error, response, body){
                    console.log("running request NUMBER:", i )
                    console.log(options);
                    JSON.parse(body).results.map((item) => {
                      console.log(item.release_date, item.genre_ids);
                      const d = new Date(item.release_date)
                      const date = d.getFullYear()
                      const dateMatch = (date > options.years[0] && date < options.years[1]) ? true : false;
                      let genreMatch
                      if (options.genres.length > 0) {
                         genreMatch = item.genre_ids.some(r=> options.genres.indexOf(r) >= 0)
                      } else {
                         genreMatch = true
                      }
                      if (dateMatch && item.id != 265147) {
                        if (genreMatch){
                          moviess.push(item)
                        } else {
                          console.log("date matched, but not genre");
                        }
                      } else {
                        console.log(date);
                        console.log("false");

                      }
                    })
                    counter++
                    console.log("COUNTER COUNTER COUNTER COUNTER", counter);
                    console.log("movies length: ", moviess.length);
                    if (moviess.length >= 20 || counter >= 14) {
                      console.log("moviess length", moviess.length);
                      lastCall(moviess)
                    }
                  })
                }
        }
      callLoopTwo()






      } else if (options.typeOf === "no-previous&yes-genres") {


        const callLoopTwo = async () => {
          const moviess = []
          const lastCall = (movies) => {
            if (res.headersSent){
              console.log("null send");
            } else {
              console.log("sending");
              res.send(movies)
            }
          }

              for (var i=1; moviess.length < 20 && i < 15; i++) {
                console.log(i)
                options.url = `https://api.themoviedb.org/3/discover/movie?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}&release_date.gte=${gteDate}&release_date.lte=${lteDate}&with_genres=${options.addGenres}`
                console.log(options)
                var counter = 0
                 request(options, function(error, response, body){
                    console.log("running request NUMBER:", i )
                    counter++
                    console.log("COUNTER COUNTER COUNTER COUNTER", counter);

                    console.log(options);
                    JSON.parse(body).results.map((item) => {
                      console.log(item.release_date, item.genre_ids);
                      const d = new Date(item.release_date)
                      const date = d.getFullYear()
                      const dateMatch = (date > options.years[0] && date < options.years[1]) ? true : false;
                      if (dateMatch && item.id != 265147) {
                        console.log(date);
                        console.log("match");
                        moviess.push(item)
                      } else {
                        console.log(date);
                        console.log("false");

                      }
                    })
                    console.log("movies length: ", moviess.length);
                    if (moviess.length >= 20 || counter >= 14) {
                      console.log("moviess length", moviess.length);
                      lastCall(moviess)
                    }
                  })
                }
        }
      callLoopTwo()


    } else if(options.typeOf === "no-previous&no-genres") {
      console.log("no previous or genres");
      const callLoopTwo = async () => {
        const moviess = []
        const lastCall = (movies) => {
          if (res.headersSent){
            console.log("null send");
          } else {
            console.log("sending");
            res.send(movies)
          }
        }

            for (var i=1; moviess.length < 20 && i < 15; i++) {
              console.log(i)
              options.url = `https://api.themoviedb.org/3/discover/movie?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}&release_date.gte=${gteDate}&release_date.lte=${lteDate}&with_genres=${options.addGenres}`
              console.log(options)
              var counter = 0
               request(options, function(error, response, body){
                  console.log("running request NUMBER:", i )
                  counter++
                  console.log("COUNTER COUNTER COUNTER COUNTER", counter);

                  console.log(options);
                  JSON.parse(body).results.map((item) => {
                    console.log(item.release_date, item.genre_ids);
                    const d = new Date(item.release_date)
                    const date = d.getFullYear()
                    const dateMatch = (date > options.years[0] && date < options.years[1]) ? true : false;
                    if (dateMatch && item.id != 265147) {
                      console.log(date);
                      console.log("match");
                      moviess.push(item)
                    } else {
                      console.log(date);
                      console.log("false");

                    }
                  })
                  console.log("movies length: ", moviess.length);
                  if (moviess.length >= 20 || counter >= 14) {
                    console.log("moviess length", moviess.length);
                    lastCall(moviess)
                  }
                })
              }
      }
    callLoopTwo()

    }



  });



router.get("/carousel_one", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&page=2"
  }
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
})

router.get("/carousel_two", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/now_playing?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&page=2"
  }
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
})

router.get("/carousel_three", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&page=2&with_genres=28"
  }
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
})

router.get("/carousel_four", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/top_rated?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&page=1"
  }
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
})
router.get("/carousel_five", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/movie/week?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&page=1"
  }
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
})
module.exports = router;
