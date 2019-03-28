var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('sync-request');
var urlencode = require('urlencode');

const apiKey = process.env.GEO_NAMES_USER_NAME;

// Primary endpoint to make the external API call and return the captured JSON response
router.get('/:start', function (req, res, next) {
    try {

        console.log('Reached /zipAuto with params : ' + req.params.start);

        var zipStart = req.params.start;
        const url = 'http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=' + zipStart +
            '&username=' + apiKey + '&country=US&maxRows=5';

        console.log('URL formed: ' + url);
        data = request("GET", url);

        response = JSON.parse(data.getBody().toString('utf8'));
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
