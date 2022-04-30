let temp;
let description;
let feelsLike;
let wind;
let humidity;

async function getWeatherData(location) {
  let response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=486c9beaf76f78b114fb560ce37bf6fa`,
    {
      mode: "cors",
    }
  );
  let data = await response.json();
  temp = data.main.temp;
  description = data.weather[0].main;
  feelsLike = data.main.feels_like;
  wind = data.wind.speed;
  humidity = data.main.humidity;

  //console.log(data);

  return data;
}

const data = getWeatherData("London").then((data) => {
  console.log(data.main.temp);
});
