const express = require('express');
const request = require('request');
const path = require('path')
const { Client } = require('pg')

const app = express();





// Initialize Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect(function(error) {
  console.log("connected to db");
});

// app.post('/registeruser', function(req, res) => {
//
// })

// Get featuredMovie Route
const featuredMovie = require('./routes/api/featured_movie')
app.use('/getFeaturedMovie', featuredMovie);

// Set Static Folders
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
//Get user db route
app.post('/signup', function(req, res){
  client.query('SELECT * FROM users;', (err, result) => {
      res.json(result)
    client.end();
  });
})







// app.get('/', (req, res) => {
//   res.sendFild(path.join(__dirname, 'client', 'build', 'index.html'))
// })
app.get("/signup", function (req, res) {
  console.log('here');
})




const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
