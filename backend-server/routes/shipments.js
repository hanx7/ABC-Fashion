var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    // Make a GET request to the API with Basic Authentication
    const response = await axios.get('https://abc-fashion-v2-bzwn2mw5ya-km.a.run.app/shipments', {
      auth: {
        username: 'pipelabs',
        password: 'h04Kp5NNm4qN'
      }
    });
    // Send the data received from the API as the response
    res.json(response.data);
  } catch (error) {
    // If there's an error, send an error response
    console.error('Error fetching data:', error);
    res.status(500).json({error: 'An error occurred while fetching data'});
  }
});

module.exports = router;
