const request = require('request');

const forecast = (lat,lon,callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=b739135ddde7551cc4771e876dc79605&query=${encodeURI(lat)},${encodeURI(lon)}`;
    request({url,json:true},(error,{body})=>{
        // const data = JSON.parse(response.body);
        
        // console.log(response.body)
        if(error){
            callback('Unable to connect!',undefined);
        }else if(body.success === false){
           callback(undefined,body);
        } else{
            callback(undefined,body);
        }
    });
}

module.exports = forecast;

