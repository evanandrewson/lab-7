require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
app.use(cors());

app.get('/location', (request, response) => {
    try {
        const location = request.query.location;
        const result = getLatitudeLongitude(location);
        response.status(200).json(result);
    }
    catch(err) {
        response.status(500).send('Sorry something went wrong, please try again');
    }
});

app.get('/weather', (request, response) => {
    try {
        const weather = request.query.weather;
        const result = getWeather(weather);
        response.status(200).json(result);
    }
    catch(err){
        response.status(500).send('Sorry something went wrong, please try again', request.query);
    }
});

const geoData = require('./data/geo.json');
const weatherData = require('./data/darksky.json');

function getLatitudeLongitude() {
    return toLocation(geoData);
}

function getWeather(){
    return toWeather(weatherData);
}

function toLocation() {
    const firstResult = geoData.results[0];
    const geometry = firstResult.geometry;

    return {
        formatted_query: firstResult.formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
    };
}

function toWeather() {
    const daily = weatherData.daily;
    const data = daily.data;
    const dataResults = data.map((value) => {
        return {
            time: new Date(value.time).toISOString(),
            forecast: value.summary
        };
    });
    return dataResults;
}

app.listen(PORT, () => {
    console.log('server running on port', PORT);
});
