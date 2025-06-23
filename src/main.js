import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getCurrentWeather, getForecast } from "./api/weather.js";
import { formatCurrentWeather, formatForecast } from "./utils/formatters.js";
import {
  showInfo,
  showForecast,
  showAlert,
  resetDisplay,
} from "./ui/display.js";

document.querySelector("#app").innerHTML = `
  <div id="container">
      <form id="search">
        <i class="fa-solid fa-location-dot"></i>
        <input
          type="search"
          name="city_name"
          id="city_name"
          placeholder="Buscar cidade"
        />
        <button type="submit">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      <div id="weather">
        <h1 id="title"></h1>

        <div id="infos">
          <div id="temp">
            <img id="temp_img" src="" alt="Imagem do tempo" />

            <div>
              <p id="temp_value"></p>
              <p id="temp_description"></p>
            </div>
          </div>

          <div id="other_infos">
            <div class="info">
              <i id="temp_max_icon" class="fa-solid fa-temperature-high"></i>

              <div>
                <h2>Temp. max</h2>
                <p id="temp_max"></p>
              </div>
            </div>
            <div class="info">
              <i id="temp_min_icon" class="fa-solid fa-temperature-low"></i>

              <div>
                <h2>Temp. min</h2>
                <p id="temp_min"></p>
              </div>
            </div>
            <div class="info">
              <i id="humidity_icon" class="fa-solid fa-droplet"></i>

              <div>
                <h2>Umidade</h2>
                <p id="humidity"></p>
              </div>
            </div>
            <div class="info">
              <i id="wind_icon" class="fa-solid fa-wind"></i>

              <div>
                <h2>Vento</h2>
                <p id="wind"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="alert"></div>
    </div>

    <div id="forecast"></div>
`;

document.querySelector("#search").addEventListener("submit", handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  const cityInput = document.querySelector("#city_name");
  const cityName = cityInput.value.trim();

  if (!cityName) {
    resetDisplay();
    showAlert(`
      <h2>Você precisa digitar uma cidade...</h2>
      <img src="/location.svg"/>
    `);
    return;
  }

  try {
    const weatherData = await getCurrentWeather(cityName);
    const forecastData = await getForecast(cityName);

    if (weatherData && forecastData) {
      showInfo(formatCurrentWeather(weatherData));
      showForecast(formatForecast(forecastData));
      cityInput.value = "";
    }
  } catch (error) {
    resetDisplay();
    showAlert(`
      <h2>Não foi possível localizar...</h2>
      <img src="/search.svg"/>
    `);
    console.error("Erro ao buscar dados:", error);
  }
}
