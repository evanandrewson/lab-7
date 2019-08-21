require('dotenv').config();

const express = require('express');
const cors = require('cors');

const mapsApi = require('./lib/maps-api');
const weatherApi = require('./lib/weather-api');

const app = express();
const PORT = process.env.PORT;
app.use(cors());

app.get('/location', (request, response) => {
    const search = request.query.search;
    mapsApi.getLocation(search)
        .then(location => {
            response.json(location);
        })
        .catch(err => {
            response.status(500).json({
                error: err.message || err
            });
        });
});

app.get('/weather', (request, response) => {
    const latitude = request.query.latitude;
    const longitude = request.query.longitude;
    
    weatherApi.getForecast(latitude, longitude)
        .then(forecast => {
            response.json(forecast);
        })
        .catch(err => {
            response.status(500).json({
                error: err.message || err
            });
        });
});

app.listen(PORT, () => {
    console.log('server running on port', PORT);
});
