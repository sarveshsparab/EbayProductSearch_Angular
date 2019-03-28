var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('sync-request');
var urlencode = require('urlencode');

const cx = process.env.GOOGLE_CUSTOM_SEARCH_CX;
const apiKey = process.env.GOOGLE_IMAGE_SEARCH_API_KEY;

// Primary endpoint to make the external API call and return the captured JSON response
router.get('/:query', function (req, res, next) {
  try {

    console.log('Reached /photos with params : ' + req.params.query);

    var queryStr = req.params.query;

    let url = 'https://www.googleapis.com/customsearch/v1?';
    url += 'q=' + encodeURI(queryStr);
    url += '&cx=' + cx;
    url += '&imgSize=huge';
    url += '&imgType=news';
    url += '&num=8';
    url += '&searchType=image';
    url += '&key=' + apiKey;

    console.log('URL formed: ' + url);
    data = request("GET", url);

    response = JSON.parse(data.getBody().toString('utf8'));
    console.log('Response: ');
    console.log(response);
    res.send(response);
  } catch (e) {
    console.log(e);
    res.status(400).send("Error");
  }
});

// A dummy endpoint to simulate failure with code
router.get('/fail/:code', function (req, res, next) {
  res.status(req.params.code).send("Error Forced!");
});

module.exports = router;
