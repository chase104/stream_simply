const express = require('express');
const request = require('request');
const app = express();



app.get('/getFeaturedMovie', (req, res) => {

var options = {
  method: 'GET',
  url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup',
  qs: {term: 'bojack', country: 'us'},
  headers: {
    'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
    'x-rapidapi-key': '12e1e06344mshbbfb57c2be00fdfp16c653jsnc7ee0c0aab1d',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
	 if (!error && response.statusCode == 200) {
     res.send(body)

   }

});

  })

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
