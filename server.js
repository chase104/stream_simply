const express = require('express');
const request = require('request');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();

if (process.env.NODE_ENV === 'production') {
// Exprees will serve up production assets
app.use(express.static('client/build'));

// Express serve up index.html file if it doesn't recognize route

app.get('*', (req, res) => {
 res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
}


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


app.listen(port, () => console.log(`Server started on port ${port}`))
