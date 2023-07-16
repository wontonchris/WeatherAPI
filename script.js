const apiKey = "68ab3cf80e2e8d6083d2d1e1d2bb8a9a";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast";

const form = document.querySelector("#form");
const cityInput = document.querySelector("#city");
const cityName = document.querySelector("#city-name");
const icon = document.querySelector("#icon");
const date = document.querySelector("#date");
const temperature = document.querySelector("#temperature");
const windSpeed = document.querySelector("#wind-speed");
const humidity = document.querySelector("#humidity");
const forecastDays = document.querySelector("#forecast-days");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    getApi(cityInput.value);
    cityInput.value = "";
});

function getApi(city) {
    const api = `${apiUrl}?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(api)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data, city);
                });
            } else {
                throw new Error("Unable to connect to OpenWeather");
            }
        })
        .catch(function (error) {
            console.log(error);
            alert("Unable to connect to OpenWeather");
        });
}

function displayWeather(data, city) {
    cityName.textContent = city;
    temperature.textContent = data.list[0].main.temp + " °F";
    icon.src = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
    humidity.textContent = data.list[0].main.humidity + "%";
    windSpeed.textContent = data.list[0].wind.speed + " MPH";
    date.textContent = moment().format("MM/DD/YYYY");
    forecastDays.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const forecastDate = data.list[i].dt_txt;
        const forecastTemp = data.list[i].main.temp;
        const forecastHumidity = data.list[i].main.humidity;

        const forecastCard = document.createElement("div");
        forecastCard.classList.add("card", "bg-primary", "text-white", "mb-3", "p-2");
        forecastCard.innerHTML = `
            <p>Date: ${forecastDate}</p>
            <p>Temperature: ${forecastTemp}</p>
            <p>Humidity: ${forecastHumidity}</p>
        `;
        forecastDays.appendChild(forecastCard);
    }
}
