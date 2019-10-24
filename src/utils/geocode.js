const request = require('request')

const geocode = (address, callback) =>{
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGVlcGFra3VtYXJhY2luIiwiYSI6ImNrMXdiajI2dzAwMnEzZG9jbTUzZ2tkeWQifQ.uAUTA48GylYiAhKNEynw7A&limit=1'
    request({ url:geocodeUrl, json: true }, (error, {body} ={}) => {
        if(error){
            callback('unable to connect to geocode service', undefined)
        }else if(body.features.length === 0){
            callback('unable to find location. Try another search', undefined)
        }else{
            callback(undefined, {
               latitude: body.features[0].center[1],  
               longitude: body.features[0].center[0],
               location: body.features[0].place_name
            })
        }
        })
}

module.exports = geocode