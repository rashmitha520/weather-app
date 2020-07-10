

window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureSection=document.querySelector(".temperature");
    const temperatureSpan=document.querySelector(".temperature span");
    let locationTimezone = document.querySelector(".location-timezone");
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(position=>{
    long=position.coords.longitude;
    lat=position.coords.latitude;
   
   const proxy='http://cors-anywhere.herokuapp.com/';
    const api=`${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c2e43a5c20b2b909d5f44b67b61560f3`;
    fetch(api)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
             console.log(data);
             const {temp} = data.main;
             temperatureDegree.textContent=(temp-273.16);
             temperatureDescription.textContent=data.weather[0].description;
             locationTimezone.textContent=data.name;
             let fahrenheit=(temp-273.16) * (9/5)+32;
            setIcon(data.weather[0].main,document.querySelector('.icon'));
            temperatureSection.addEventListener('click',()=>{
                if(temperatureSpan.textContent==="C")
                {    temperatureDegree.textContent=Math.floor(fahrenheit);
                    temperatureSpan.textContent="F";
                    
                }else{
                    temperatureDegree.textContent=Math.floor(temp-273.16);
                    temperatureSpan.textContent="C";   
                }
            });
        
            });
           
});

}
function setIcon(icon,iconid){
    const skycons = new Skycons({color:"white"});
    const currentIcons = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconid,Skycons[currentIcons]);
}
});
