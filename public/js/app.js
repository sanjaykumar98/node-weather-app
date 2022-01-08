
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
        // getLocation.textContent = '';
        forecast.innerHTML = `<h5>Weather updates at ${data.location}</h5>
                              <p>Temperature : ${data.forecast}</p>
                              <p>Wind speed : ${data.wind_speed}</p>
                              <p>Humidity : ${data.humidity}</p>
                              <p>UV index : ${data.uv_index}</p>
                              <p>Localtime : ${data.localtime}</p>
                              `;  
        // locationFromAPI.textContent = data.location; 
        erroMsg.textContent = ''; 
       }
    });
});
}
