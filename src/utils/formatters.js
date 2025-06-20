export function formatCurrentWeather(data) {
  return {
    city: data.name,
    country: data.sys.country,
    temp: data.main.temp,
    tempMax: data.main.temp_max,
    tempMin: data.main.temp_min,
    description: data.weather[0].description,
    tempIcon: data.weather[0].icon,
    windSpeed: data.wind.speed,
    humidity: data.main.humidity,
  };
}

export function formatForecast(data) {
  const forecastByDay = {};

  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!forecastByDay[date]) forecastByDay[date] = [];
    forecastByDay[date].push(item);
  });

  const days = Object.keys(forecastByDay);
  const nextThreeDays = days.slice(2, 6);

  return nextThreeDays.map((day) => {
    const entries = forecastByDay[day];
    const temps = entries.map((d) => d.main.temp);
    const tempMin = Math.min(...temps)
      .toFixed(1)
      .replace(".", ",");
    const tempMax = Math.max(...temps)
      .toFixed(1)
      .replace(".", ",");

    const middayEntry =
      entries.find((d) => d.dt_txt.includes("12:00:00")) || entries[0];
    const weather = middayEntry.weather[0];

    const formattedDate = new Date(day).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
    });

    return {
      date: formattedDate,
      icon: weather.icon,
      description: weather.description,
      tempMin,
      tempMax,
    };
  });
}
