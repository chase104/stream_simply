const express = require('express');
const router = express.Router();
const path = require('path');
const fetch = require("node-fetch");

router.get('/', (req, res) => {
  client.query('SELECT * FROM users', function(error, result){
    console.log(result);

  })
})
