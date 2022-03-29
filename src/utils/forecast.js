const request = require('request');
const forecast = (lat,lon,callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=724a04e19a915b32a57058fda37daa39&units=imperial';
    request({url,'json':true},(error,{body})=>{
        if(error){
            callback('unable to connect to weather service.');
        }else if(body.error){
            callback('unable to find the location.')
        }else{
            // console.log(body)
            callback(undefined,body.weather[0].description+".It is currently "+body.main.temp+' degrees out.' + '\nTodays max-temp is '+body.main.temp_max +  ' degrees,  Todays min-temp is '+body.main.temp_min+' degrees.')
        }
    })
}

module.exports = forecast;