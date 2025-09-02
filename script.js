// "https://api.openweathermap.org/data/2.5/weather?q=grmany"
const apiKey = "fb4ac1ce5f44c1e6b9f542013d86edd1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchIcon = document.querySelector(".search-icon");
getWeather("japan");
async function getWeather(cityName) {
  try {
    const response = await fetch(
      apiUrl + `&q=${cityName}` + `&appid=${apiKey}`
    );
    if (response.ok) {
      let data = await response.json();
      document.querySelector(".temp").textContent = `${data.main.temp} °C`;
      document.querySelector(".city").textContent = `${data.name}`;
      document.querySelector(
        ".humidity-val"
      ).textContent = `${data.main.humidity} %`;
      document.querySelector(
        ".speed-val"
      ).textContent = `${data.wind.speed} m/s`;
      updateWeatherImg(data);
      document.querySelector("input[type='text']").value = "";
    } else {
      throw new Error();
    }
  } catch (err) {
    document.querySelector(".w-img").setAttribute("src", "imgs/not_found.svg");
    document.querySelector(".temp").textContent = `-- °C`;
    document.querySelector(".city").textContent = `Not Found !`;
    document.querySelector(".humidity-val").textContent = `-- %`;
    document.querySelector(".speed-val").textContent = `-- m/s`;
  }
}
searchIcon.onclick = function () {
  let city = document.querySelector("input[type='text']").value.trim();
  if (city) {
    getWeather(city);
  }
};
document
  .querySelector("input[type='text']")
  .addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let city = document.querySelector("input[type='text']").value.trim();
      if (city) getWeather(city);
    }
  });
function updateWeatherImg(data) {
  let weatherState = data.weather[0].main;
  let img = document.querySelector(".w-img");
  if (weatherState === "Clear") {
    img.setAttribute("src", "imgs/sun.svg");
  } else if (weatherState === "Clouds") {
    img.setAttribute("src", "imgs/clouds.svg");
  } else if (["Rain", "Thunderstorm"].includes(weatherState)) {
    img.setAttribute("src", "imgs/rain.svg");
  } else if (weatherState === "Snow") {
    img.setAttribute("src", "imgs/snow.svg");
  } else if (weatherState === "Drizzle") {
    img.setAttribute("src", "imgs/drizzle.svg");
  } else if (["Mist", "Fog", "Haze"].includes(weatherState)) {
    img.setAttribute("src", "imgs/mist.svg");
  }
  img.style.display = "block";
}
