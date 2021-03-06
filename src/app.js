const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const request = require('request');
const getForecast = require('./utils/forecast');
const geoCode = require('./utils/geocode');

const port = process.env.PORT || 3000;
// defining paths for Express
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//set up of handlebars engine and views path
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//static directory to serve
app.use(express.static(publicDirPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sanjay'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Sanjay'
    });
});



app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'We can help you!',
        name:'Sanjay'
    });
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    res.send({
        products:[]
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'Address is required'
        });
    }
    geoCode(req.query.address,(error,{lat,lon,location} = {})=>{
        if(error){
            return  res.send({
                error:error
            });
        }
        getForecast(lat,lon,(error,response)=>{
            if(error){
               return res.send({
                error:error
              });
            }
            const forecast = ` ${response.current.temperature} degrees but feels like ${response.current.feelslike} degrees`;
            res.send({ 
                forecast,
                location,
                city:response.request['query'],
                address:req.query.address,
                wind_speed:response.current.wind_speed,
                humidity:response.current.humidity,
                uv_index:response.current.uv_index,
                localtime:response.location.localtime
            }); 
            // console.log(location);
            // console.log(`Its ${response.current.weather_descriptions[0]} and temperature is ${response.current.temperature} degrees`)
            // console.log(response.current);
        }); 
    });
    
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
    title:'404',
    message:'404 Not found in Help !',
    name:'Sanjay'
});
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'404 Not found !',
        name:'Sanjay'
    });
})





app.listen(port,()=>{
    console.log(`Server is running in ${port}`);
});