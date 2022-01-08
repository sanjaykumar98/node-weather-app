
function searchWeather(event){
    event.preventDefault();
    const getLocation = document.querySelector('input').value;
    const erroMsg = document.querySelector('#error');
    const forecast = document.querySelector('#forecast');
    const locationFromAPI = document.querySelector('#location');
    fetch(`http://localhost:4000/weather?address=${getLocation}`).then((res)=>{
    res.json().then((data)=>{
        forecast.textContent = 'Loading...'
        erroMsg.textContent = ''; 
       if(data.error){
            erroMsg.textContent = data.error;
            forecast.textContent = '';  
            locationFromAPI.textContent = ''; 
       }else{        
        getLocation.textContent = '';
        forecast.textContent = data.forecast;  
        locationFromAPI.textContent = data.location; 
        erroMsg.textContent = ''; 
       }
    });
});
}
