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
    try {
        const weather = request.query.weather;
        const result = getWeather(weather);
        response.status(200).json(result);
    }
    catch(err){
        response.status(500).send('Sorry something went wrong, please try again', request.query);
    }
});

const weatherData = require('./data/darksky.json');


function getWeather(){
    return toWeather(weatherData);
}



function toWeather() {
    const daily = weatherData.daily;
    const data = daily.data;
    const dataResults = data.map((value) => {
        return {
            time: new Date(value.time * 1000).toISOString(),
            forecast: value.summary
        };
    });
    return dataResults;
}

app.listen(PORT, () => {
    console.log('server running on port', PORT);
});
