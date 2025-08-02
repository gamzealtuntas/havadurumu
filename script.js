async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "8de4b818b620557806c21dfe65f206be";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

  if (!city) {
    document.getElementById("weatherResult").innerHTML = "Lütfen bir şehir adı girin.";
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      document.getElementById("weatherResult").innerHTML = "Şehir bulunamadı.";
      return;
    }

    const data = await response.json();
    changeBackground(data.weather[0].main);

    const weatherHTML = `
      <h2>${data.name}</h2>
      <p><strong>${data.weather[0].description}</strong></p>
      <p>Sıcaklık: ${data.main.temp.toFixed(1)} °C</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="hava simgesi" />
    `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;
  } catch (error) {
    console.error("Hata:", error);
    document.getElementById("weatherResult").innerHTML = "Bir hata oluştu.";
  }
}

async function getFiveDayForecast() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "8de4b818b620557806c21dfe65f206be";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

  if (!city) {
    document.getElementById("weatherResult").innerHTML = "Lütfen bir şehir adı girin.";
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      document.getElementById("weatherResult").innerHTML = "Şehir bulunamadı.";
      return;
    }

    const data = await response.json();
    changeBackground(data.list[0].weather[0].main);

    const dailyData = {};
    data.list.forEach(item => {
      const [date, time] = item.dt_txt.split(" ");
      if (!dailyData[date]) dailyData[date] = [];
      dailyData[date].push({
        time: time.slice(0, 5),
        temp: item.main.temp,
        desc: item.weather[0].description,
        icon: item.weather[0].icon
      });
    });

    const days = Object.keys(dailyData).slice(0, 5);
    let forecastHTML = '<div class="forecast-container">';
    days.forEach(date => {
      forecastHTML += `<div class="forecast-day"><h3>${date}</h3>`;
      dailyData[date].forEach(entry => {
        forecastHTML += `
          <div class="forecast-hour">
            <span>🕒 ${entry.time}</span>
            <img src="https://openweathermap.org/img/wn/${entry.icon}.png" alt="${entry.desc}" />
            <span>${entry.desc} - ${entry.temp.toFixed(1)}°C</span>
          </div>
        `;
      });
      forecastHTML += `</div>`;
    });

    forecastHTML += "</div>";
    document.getElementById("weatherResult").innerHTML = forecastHTML;

  } catch (error) {
    console.error(error);
    document.getElementById("weatherResult").innerHTML = "Bir hata oluştu.";
  }
}

function changeBackground(weatherMain) {
  let imageUrl = "";

  switch (weatherMain) {
    case "Clear":
      imageUrl = "https://wanhabercom.teimg.com/crop/1280x720/wanhaber-com/uploads/2025/05/basliksiz-2egsrdhtfyjgkulichgofm.jpg";
      break;
    case "Clouds":
      imageUrl = "https://weather-aware.com/images/1oc.png";
      break;
    case "Rain":
    case "Drizzle":
      imageUrl = "https://arti392com.teimg.com/crop/1280x720/arti392-com/images/haberler/yagmurlu_hava_geliyor_h2453.jpg";
      break;
    case "Thunderstorm":
      imageUrl = "https://source.unsplash.com/1600x900/?thunderstorm";
      break;
    case "Snow":
      imageUrl = "https://source.unsplash.com/1600x900/?snow";
      break;
    default:
      imageUrl = "https://source.unsplash.com/1600x900/?nature";
  }

  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
}