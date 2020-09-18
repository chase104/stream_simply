const express = require('express');
const request = require('request');
const path = require('path');
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;
const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO setup mongooseDB
// TODO connect to mongooseDB
// TODO create user model
// TODO add passport middleware

//        --ROUTE LOGIC--

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  // '*' will be used on any and every route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//        --ROUTES--

//        --SERVER--
app.listen(port, () => console.log(`server running on port ${port}`));
