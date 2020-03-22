const request = require ('request');

/**
 * x -> longitude
 * y -> latitude 
 */
const forecast = (x, y, callback) => {
    const coordinates = x + ',' + y;

    const params = {
        units: 'si',
        lang: 'hi',
        getParams() {
            return '?' + 'units=' + this.units + '&' /* + 'lang=' + this.lang */;
        }
    };
    
    const url = 'https://api.darksky.net/forecast/05a237f58bf37d900e6b79cff0822a45/' + coordinates + params.getParams();

    // console.log(url);
    // return;

    request({
        url, 
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to get the weather data', undefined);
        } else if (body.error) {
            callback('Unable to find the location', undefined);
        } else {
            const weatherData = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. Temperature High today is ' + body.daily.data[0].temperatureHigh + ' and Temperature Low today is ' + body.daily.data[0].temperatureLow;
            callback(undefined, weatherData);
        }

    });
}

module.exports = forecast;