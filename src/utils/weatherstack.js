const request = require('request')

const weatherstack = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ab1c9a0c7242fdea8b2ea88bf7c32fdf&query=' + latitude + ',' + longitude
    request ({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ', it is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The relative humidity is ' + body.current.humidity + ' percent.')
        }
    })
}

module.exports = weatherstack