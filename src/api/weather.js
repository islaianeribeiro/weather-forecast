const apiKey = import.meta.env.VITE_API_KEY;

export async function getCurrentWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric&lang=pt_br`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod !== 200) throw new Error("Cidade não encontrada");
  return data;
}

export async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric&lang=pt_br`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
