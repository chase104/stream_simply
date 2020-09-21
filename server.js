const express = require('express');
const request = require('request');

const path = require('path')

const app = express();

// Initialize Body Parser
app.use(express.json())
app.use(express.urlencoded( { extended: false }))

// Set Static Folders
app.use(express.static(path.join(__dirname, 'client', 'build')))


app.get('/', (req, res) => {
  res.sendFild(path.join(__dirname, 'client', 'build', 'index.html'))
})
// app.use(express.static())
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
    })
  })




const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
