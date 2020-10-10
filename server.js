const express = require('express');
const request = require('request');
const path = require('path')
const { Client } = require('pg')
const bcrypt = require('bcrypt')
require('dotenv').config();

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



app.get("/signup", function (req, res) {
  console.log('here');
})




const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
