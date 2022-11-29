document.querySelector("#btn").addEventListener("click",function(){
    city=document.querySelector(".search-bar").value;
    weather.fetchWeather(city);
    document.querySelector(".mapouter").style.display="block";
   });
   
   
   
   let weather={
       apiKey:"246ddc204e774299abd36645854b69fc",
       fetchWeather: function(city){
           fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
           .then((response) => response.json())
           .then((data) => this.display(data));
       },
   
       display:function(data){
           const {name} =data;
           const {icon,description}=data.weather[0];
           const {temp,humidity,temp_min,temp_max} =data.main;
           const{speed}=data.wind;
           document.querySelector(".city").innerText="Weather in "+name;
           document.querySelector(".temp").innerText=temp+"°C";
           document.querySelector(".description").innerText=description;
           document.querySelector(".humidity").innerText="Humidity: "+humidity+"%";
           document.querySelector(".wind").innerText="Wind Speed: "+speed+" km/h";
           document.querySelector(".icon").src=`http://openweathermap.org/img/wn/${icon}@2x.png`;
           document.querySelector("#gmap_canvas").src=`https://maps.google.com/maps?q=${name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
           document.querySelector(".mintemp").innerText="Min Temp: "+temp_min+"°C";
           document.querySelector(".maxtemp").innerText="Max Temp: "+temp_max+"°C";
           this.weekly(data);
           let week=["SUN","MON","TUE","WED","THU","FRI","SAT"];
           let date=new Date();
           let dayname=date.getDay();
           document.querySelector(".dayname").innerText=week[dayname];
       },
   
       weekly:function(data){
           console.log(data.coord.lon);
       fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&exclude=minutely,hourly&appid=246ddc204e774299abd36645854b69fc`).then((res)=>res.json()).then((newdata)=>this.displayweekly(newdata));
       },
       displayweekly: function(newdata){
           document.querySelector("#weeklydata").innerHTML=null;
           let arr=newdata.daily;
           let week=["SUN","MON","TUE","WED","THU","FRI","SAT"];
           let date=new Date();
           let name=date.getDay();
           console.log(week[name]);
           arr.forEach(function(elem,index){
               name++;
               if(name==week.length){
                   name=0;
               }
               if(index!=7){
                   let box=document.createElement("div");
                   let day=document.createElement("h1");
                   day.innerText=week[name];
                   let icon=document.createElement("img");
                   icon.src=`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`;
                   let maxtemp=document.createElement("h2");
                   maxtemp.innerText=`${elem.temp.max}°C`;
                   let mintemp=document.createElement("h2");
                   mintemp.innerText=`${elem.temp.min}°C`;
       
                   box.append(day,icon,maxtemp,mintemp);
                   document.querySelector("#weeklydata").append(box);
               }
               
           });
       }
   };
   






   function getLocation() {
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
        const crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getLocationWeather(crd.latitude, crd.longitude);
      }
}
getLocation();


function getLocationWeather(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ea0b40845fe07cfa8afdfbfc170c3ec1`;

fetch(url)
    .then(function(res){
    return res.json();
})
.then(function(res){
    console.log(res);
    append(res);
})
.catch(function(err){
    console.log(err);
});
}