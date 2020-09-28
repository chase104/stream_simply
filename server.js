const express = require('express');
const request = require('request');
const path = require('path')

const app = express();

// Initialize Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



const featuredMovie = require('./routes/api/featured_movie')
// Get featuredMovie Route
app.use('/getFeaturedMovie', featuredMovie);

// Set Static Folders
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
// app.get('/', (req, res) => {
//   res.sendFild(path.join(__dirname, 'client', 'build', 'index.html'))
// })





const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
