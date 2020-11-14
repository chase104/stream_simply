const express = require("express");
const router = express.Router();
const path = require("path");

const request = require("request");

const uTellyApi = require("../../config/keys").uTellyApi;
const omdbApi = require("../../config/keys").omdbApi;

// router.get("/", (req, res) => {
//   var options = {
//     method: "GET",
//     url:
//       "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup",
//     qs: { term: "bojack", country: "us" },
//     headers: {
//       "x-rapidapi-host":
//         "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
//       "x-rapidapi-key": process.env.REACT_APP_UTELLY_API_KEY,
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       useQueryString: true
//     }
//   };

//   request(options, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//       res.send(body);
//     }
//   });
// });

router.get("/", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&page=1"
      // "https://api.themoviedb.org/3/trending/tv/week?api_key=4a0f0029d366912b50a509d879bc1675"
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log({ body });
      res.send(body);
    }
  });
});

router.get("/carousel_one", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&page=2"
  }
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log({ body });
      res.send(body);
    }
  });
})

module.exports = router;
