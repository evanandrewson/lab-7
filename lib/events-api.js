const request = require('superagent');

const BASE_URL = 'https://www.eventbriteapi.com/v3/events/search?token=';
const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;

module.exports = {
    getEvents(lat, lng) {
        const url = `${BASE_URL}${EVENTBRITE_API_KEY}&location.latitude=${lat}&location.longitude=${lng}`;

        return request
            .get(url)
            .then(res => {
                return formatEvents(res.body);
            });
    }
};

function formatEvents(response) {
    const data = response.events;
    return data.map(formatEventDetails);
}

function formatEventDetails(event) {
    return {
        link: event.url,
        name: event.name.text,
        event_date: event.start.local,
        summary: event.description.text
    };
}