
function searchWeather(event){
    event.preventDefault();
    const getLocation = document.querySelector('input').value;
    const erroMsg = document.querySelector('#error');
    const forecast = document.querySelector('#forecast');
    const locationFromAPI = document.querySelector('#location');
    forecast.textContent = 'Loading...'
    fetch(`/weather?address=${getLocation}`).then((res)=>{
    res.json().then((data)=>{
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
