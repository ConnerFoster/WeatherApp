const main = document.getElementById("content");
const searchBtn = document.getElementById("search-btn");
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const errorText = document.getElementById("err");

async function getWeatherData(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${location}`,
    {
      mode: "cors",
    }
  );
  if (response.status == 400) {
    errorText.style.visibility = "visible";
    return;
  } else {
    errorText.style.visibility = "hidden";
    const data = await response.json();

    return data;
  }
}

function displayContent(location) {
  getWeatherData(location).then((data) => {
    const description = data.current.condition.text;
    const temp = Math.round(data.current.temp_f);
    const feelLike = Math.round(data.current.feelslike_f);
    const wind = Math.round(data.current.wind_mph);
    const humidity = data.current.humidity;
    let location = `${data.location.name}, ${data.location.country}`;

    if (data.location.country === "United States of America") {
      location = `${data.location.name}, ${data.location.region}`;
    }
    main.classList.add("fade-in");
    main.innerHTML = `
        <h2>${description}</h2>
        <h1 id="desc">${location.toUpperCase()}</h1>
        <h1>${temp} &#8457</h1>
        <h3>FEELS LIKE: ${feelLike} &#8457</h3>
        <h3>WIND: ${wind} MPH</h3>
        <h3>HUMIDITY: ${humidity}%</h3>
        `;
  });
  main.classList.remove("fade-in");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  displayContent(input.value);
});

//window.addEventListener("load", () => {
displayContent("london");
//});

//center search bar on mobile and figure out error
