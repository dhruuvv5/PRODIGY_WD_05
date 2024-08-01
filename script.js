let currentCity = "Delhi";
let units = "metric";

let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime p");
let weather__forecast = document.querySelector(".weather__forecast p");
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon img");
let weather__minmax = document.querySelector(".weather__minmax");
let weather__realfeel = document.querySelector(".weather__realfeel");
let weather__humidity = document.querySelector(".weather__humidity");
let weather__wind = document.querySelector(".weather__wind");
let weather__pressure = document.querySelector(".weather__pressure");
let weather__search = document.querySelector(".weather__search");

weather__search.addEventListener("submit", (e) => {
  let search = document.querySelector(".weather__searchform");
  e.preventDefault();
  currentCity = search.value;
  getWeather();
  search.value = "";
});

document.querySelector(".unit__celsius").addEventListener("click", () => {
  if (units !== "metric") {
    units = "metric";
    getWeather();
  }
});

document.querySelector(".unit__fahrenheit").addEventListener("click", () => {
  if (units !== "imperial") {
    units = "imperial";
    getWeather();
  }
});

function convertCountryCode(country) {
  let regionName = new Intl.DisplayNames(["en"], { type: "region" });
  return regionName.of(country);
}

function convertTimestamp(timestamp, timezone) {
  const convertTimeZone = timezone / 3600;
  const date = new Date(timestamp * 1000);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimeZone >= 0 ? "-" : "+"}${Math.abs(
      convertTimeZone
    )}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

function getWeather() {
  const API_KEY = "0200a57fdfb26ff521ed56dd1de1afdc";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
      datetime.innerHTML = convertTimestamp(data.dt, data.timezone);
      weather__forecast.innerHTML = data.weather[0].main;
      weather__temperature.innerHTML = `${data.main.temp.toFixed()}&deg`;
      weather__icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&deg</p>
                                   <p>Max: ${data.main.temp_max.toFixed()}&deg</p>`;
      weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&deg`;
      weather__humidity.innerHTML = `${data.main.humidity.toFixed()}%`;
      weather__wind.innerHTML = `${data.wind.speed}${
        units === "imperial" ? "mph" : "m/s"
      }`;
      weather__pressure.innerHTML = `${data.main.pressure} hPa`;
    });
}

document.addEventListener("DOMContentLoaded", getWeather);
