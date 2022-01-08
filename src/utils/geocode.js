const request = require('request');

const geoCode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoiaW1zYW5qYXk5OCIsImEiOiJja3h6dzYxZDkzOGpwMnFwNDEycG40ZWI4In0.85HYEzd-B5b4vbvml91WhQ&limit=1'
    request({url,json:true},(error,{body})=>{    
         const geoData = body;
        if(error){
            callback('Unable to connect!',undefined);
        }else if(geoData.features.length === 0){
            callback('Unable to find location please try with another one!',undefined);
        }else{
            callback(undefined,{
                lat:geoData.features[0].center[1],
                lon:geoData.features[0].center[0],
                location:geoData.features[0].place_name
            });
            // console.log(`Lattitude for ${location} is ${lat}  Longitude for ${location} is ${lan}`);    
        }
    });
}

module.exports = geoCode;