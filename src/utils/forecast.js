const request = require('request')


const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/c61763f749f1e7493f21496d9dc8039d/'+lat+','+long+'?units=si&lang=en'
    request({ url, json: true }, (error, {body} = {}) => {
        if(error){
            callback('unable to connect to weather service', undefined)
        }else if(body.error){
            callback('unable to find location', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary+'  It is currently '+body.currently.temperature + ' degrees out. There is ' +body.currently.precipProbability +'% chance of rain.')
        }
    })
}

module.exports = forecast
