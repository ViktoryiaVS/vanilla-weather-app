
let searchButton = document.querySelector("button");
searchButton.addEventListener("click", withprompt);
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", withprompt);

weatherCity("Moscow");

function withprompt(event) {
  event.preventDefault();
  let city = document.querySelector("input").value;

  city = city.toLowerCase();
  weatherCity(city);
}

function weatherCity(city) {
  let cityTitle = document.querySelector("#current-city");
  cityTitle.innerHTML = "Currently in " + toTitleCase(city) + ":";
  let apiKey = "3ae683693189f51a58a818582cf53045";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(weatherUrl).then(process);
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function process(response) {
  console.log(response);

  let currentWeather = document.querySelector(".currentWeather");

  let temperature = currentWeather.firstChild;
  let weatherIcon = document.querySelector(".currentWeather img");
  console.log(weatherIcon);
  temperature.textContent = `${response.data.main.temp}ºC`;

  let newIcon =
    "http://openweathermap.org/img/wn/" +
    response.data.weather[0].icon +
    "@2x.png";
  weatherIcon.src = newIcon;
  console.log(weatherIcon);

  let time = document.querySelector("mytime");
  time.innerHTML = formatDate();
}

function formatDate() {
  let myDate = new Date();
  let timeHour = myDate.getHours();
  let timeMin = myDate.getMinutes();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[myDate.getDay()];
  let returnDate = `${day} ${timeHour}:${timeMin}`;

  return returnDate;
}
