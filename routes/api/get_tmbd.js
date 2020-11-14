const express = require("express");
const router = express.Router();
const path = require("path");

const request = require("request");

const uTellyApi = require("../../config/keys").uTellyApi;
const omdbApi = require("../../config/keys").omdbApi;


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

router.get("/carousel_two", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/now_playing?api_key=4a0f0029d366912b50a509d879bc1675&language=en-US&page=2"
  }
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log({ body });
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
      console.log({ body });
      res.send(body);
    }
  });
})
module.exports = router;
