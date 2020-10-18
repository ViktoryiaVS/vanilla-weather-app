
    var clockElement = document.getElementById('clock');
    var options={ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZoneName:'short'};

    function clock() {
        clockElement.textContent = new Date().toLocaleString(options);
    }

    clock();

    setInterval(clock, 1000);



var unit_C = "ºC"
var unit_F = "ºF"
var isCelsius=true;

let unitCs = document.querySelector("#unit-c");
let unitFs = document.querySelector("#unit-f");
unitCs.addEventListener("click", clickC);
unitFs.addEventListener("click", clickF);



function clickC(event){
  event.preventDefault();
  if(!isCelsius){
    console.log(unitCs);
    unitCs.style.fontWeight="bold"
    unitFs.style.fontWeight="lighter"
    unitCs.style.color="black"
    unitFs.style.color="gray"
    isCelsius=true;
    weatherCity(lastCity);
  }
  
}


function clickF(event){
  event.preventDefault();
  if(isCelsius){
    console.log(unitFs);
    unitFs.style.fontWeight="bold"
    unitCs.style.fontWeight="lighter"
    unitFs.style.color="black"
    unitCs.style.color="gray"
    isCelsius=false;
    weatherCity(lastCity);
    
  }


}




let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", withprompt);

var lastCity="Moscow"

weatherCity(lastCity);

function withprompt(event) {
  event.preventDefault();
  let city = document.querySelector("input").value;

  city = city.toLowerCase();
  weatherCity(city);
}

function weatherCity(city) {
  let cityTitle = document.querySelector(".current-city");
  cityTitle.innerHTML = "The weather in " + toTitleCase(city);
  let apiKey = "3ae683693189f51a58a818582cf53045";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${getUnits()}`;

  axios.get(weatherUrl).then(process);

  let weatherForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${getUnits()}`;

  axios.get(weatherForecastUrl).then(forecast);


}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}




function getUnit(){
  if(isCelsius) {
    return  unit_C;
  }
  return unit_F;
}

function getUnits(){
  if(isCelsius) {
    return "metric"
  }
  return "imperial"
}

function process(response) {
   console.log(response);
  let temperatures = document.querySelectorAll(".currentWeather .temperature");
  console.log(temperatures);
  for(i = 0; i < temperatures.length; i++) {
    temperatures[i].textContent = `${response.data.main.temp}`+ getUnit();
  }
  console.log(temperatures);

  let feels_like = document.querySelector(".currentWeather .feels-like");
  feels_like.textContent = `${response.data.main.feels_like}`+ getUnit();

  let humidity = document.querySelector(".currentWeather .humidity");
  humidity.textContent = `${response.data.main.humidity}`;

  let pressure = document.querySelector(".currentWeather .pressure");
  pressure.textContent = `${response.data.main.pressure}`;


  let weatherIcon = document.querySelector(".currentWeather img");


  let newIcon =
    "http://openweathermap.org/img/wn/" +
    response.data.weather[0].icon +
    "@2x.png";
  weatherIcon.src = newIcon;
  console.log(weatherIcon);

  let time = document.querySelector(".asoftime");
  time.innerHTML = "as of  " + new Date().toLocaleString(options);
}


function forecast(response) {
  console.log(response);
  let  list = response.data.list;

  for(i = 0; i < list.length-8; i=i+8) {
    let cssday=".day"+(i/8+1);
    
    document.querySelector(cssday+" .asof").textContent=`${list[i].dt_txt}`;

    document.querySelector(cssday+" .temp").textContent=`${list[i].main.temp}${getUnit()}`;

    document.querySelector(cssday+" .icon").innerHTML='<img class="weatherIcon" src="http://openweathermap.org/img/wn/'
    +`${list[i].weather[0].icon}`
    +'@2x.png" height="50px"></img>';



  }

}
