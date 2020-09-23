const express = require('express');
const router = express.Router();
const path = require('path');

const request = require('request');

const uTellyApi = require('../../config/keys').uTellyApi;
const omdbApi = require('../../config/keys').omdbApi;

router.get('/', (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup',
    qs: {term: 'bojack', country: 'us'},
    headers: {
      'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
      'x-rapidapi-key': '12e1e06344mshbbfb57c2be00fdfp16c653jsnc7ee0c0aab1d',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      useQueryString: true
    }
  };

      request(options, function (error, response, body) {
      	 if (!error && response.statusCode == 200) {
           res.send(body)
         }
      })

})

module.exports = router;
