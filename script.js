async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "8de4b818b620557806c21dfe65f206be"; // senin gerçek API key'in
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

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
      <p>Sıcaklık: ${data.main.temp} °C</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="hava simgesi" />
    `;
    document.getElementById("weatherResult").innerHTML = weatherHTML;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = "Bir hata oluştu.";
    console.error(error);
  }
}
function changeBackground(weatherMain) {
  let imageUrl = "";

  switch (weatherMain) {
    case "Clear":
      imageUrl= "https://wanhabercom.teimg.com/crop/1280x720/wanhaber-com/uploads/2025/05/basliksiz-2egsrdhtfyjgkulichgofm.jpg"; // güneşli
      break;
    case "Clouds":
      imageUrl = "https://weather-aware.com/images/1oc.png"; // bulutlu
      break;
    case "Rain":
    case "Drizzle":
      imageUrl = "https://arti392com.teimg.com/crop/1280x720/arti392-com/images/haberler/yagmurlu_hava_geliyor_h2453.jpg"; // yağmurlu
      break;
    case "Thunderstorm":
      imageUrl = "https://source.unsplash.com/1600x900/?thunderstorm"; // fırtına
      break;
    case "Snow":
      imageUrl = "https://source.unsplash.com/1600x900/?snow"; // karlı
      break;
    default:
      imageUrl = "https://source.unsplash.com/1600x900/?nature"; // varsayılan
  }

  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}