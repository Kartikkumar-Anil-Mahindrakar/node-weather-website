const request = require('request')
const geocode = (address,callback)=>{
    const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(address)}&limit=1&appid=724a04e19a915b32a57058fda37daa39`
    request({url:geocodeURL,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to geocoding api',undefined);
        }else if(body.error || !body[0]){
            callback('could not find the city',undefined);
        }else{
            callback(undefined,{"Latitude":body[0].lat,
             "Longitude":body[0].lon,
            "Location":body[0].state
        })       
            // console.log(response.body)
        }
        // callback(error,response);
    })
}

module.exports = geocode; 