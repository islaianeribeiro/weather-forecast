export function showInfo(data) {
  showAlert("");
  document.querySelector("#weather").classList.add("show");

  document.querySelector(
    "#title"
  ).textContent = `${data.city}, ${data.country}`;
  document.querySelector("#temp_value").innerHTML = `${data.temp
    .toFixed(1)
    .toString()
    .replace(".", ",")} <sup>°C</sup>`;
  document.querySelector("#temp_description").textContent = data.description;

  document
    .querySelector("#temp_img")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.tempIcon}@2x.png`
    );
  document.querySelector("#temp_max").innerHTML = `${data.tempMax
    .toFixed(1)
    .toString()
    .replace(".", ",")} <sup>°C</sup>`;
  document.querySelector("#temp_min").innerHTML = `${data.tempMin
    .toFixed(1)
    .toString()
    .replace(".", ",")} <sup>°C</sup>`;
  document.querySelector("#humidity").textContent = `${data.humidity}%`;
  document.querySelector("#wind").textContent = `${data.windSpeed.toFixed(
    1
  )}km/h`;
}

export function showForecast(forecastList) {
  document.querySelector("#forecast").classList.add("show");
  const forecastContainer = document.querySelector("#forecast");
  forecastContainer.innerHTML = "";

  forecastList.forEach((day) => {
    const card = document.createElement("div");
    card.classList.add("forecast-card");

    card.innerHTML = `
      <p class="forecast-date">${day.date}</p>
      <div class="forecast-flex">
        <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.description}" />
        <div id="other_infos">
          <div class="info">
            <i id="temp_max_icon" class="fa-solid fa-temperature-high"></i>
            <div>
              <h2>Temp. max</h2>
              <p id="temp_max">${day.tempMax} <sup>°C</sup></p>
            </div>
          </div>
          <div class="info">
            <i id="temp_min_icon" class="fa-solid fa-temperature-low"></i>
            <div>
              <h2>Temp. min</h2>
              <p id="temp_min">${day.tempMin} <sup>°C</sup></p>
            </div>
          </div>
        </div>
      </div>
      <p id="temp_description">${day.description}</p>
    `;

    forecastContainer.appendChild(card);
  });
}

export function showAlert(msg) {
  document.querySelector("#alert").innerHTML = msg;
}

export function resetDisplay() {
  document.querySelector("#weather").classList.remove("show");
  document.querySelector("#forecast").classList.remove("show");
}
