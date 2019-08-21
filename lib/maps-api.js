// const request = require('superagent');

const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

module.exports = {
    getLocation(search) {
        // return request
        //     .get(BASE_URL)
        //     .query({ address: search })
        //     .query({ key: GEOCODE_API_KEY })
        //     .then(res => {
        //         return toLocation(res.body, search);
        //     });
        const url = `${BASE_URL}?address=${search}&key=${GEOCODE_API_KEY}`;
        return toLocation(url, search);
    }
};

function toLocation(geoData, search) {
    const firstResult = geoData.results[0];
    const geometry = firstResult.geometry;

    return {
        search_query: search,
        formatted_query: firstResult.formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
    };
}