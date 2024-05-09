// API: https://openweathermap.org/current#name
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "a25b51d149e825b03b8225260247edeb";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            console.log(weatherData);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Please enter a valid city");
    } else {
        return await response.json();
    }
}

function displayWeatherInfo(data) {
    const {name: city, 
           main: {temp, humidity, feels_like}, 
           weather: [{description, id}],
           sys: {country, sunrise, sunset},
           timezone} = data;
    card.textContent = "";
    card.style.background = "linear-gradient(180deg, rgb(103, 214, 251), rgb(255, 224, 70))";
    card.style.boxShadow = "10px 10px 5px rgba(247, 198, 82, 0.753)";
    card.style.display = "flex";
    const time = (new Date().getTime() + timezone) / 1000;
    console.log(time);

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const feelsDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherImg = document.createElement("img");

    cityDisplay.textContent = `${city}, ${country}`;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;

    feelsDisplay.textContent = `Feels like: ${(feels_like - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherImg.src = getWeatherImg(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    feelsDisplay.classList.add("humidityDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay")
    weatherImg.classList.add("weatherImg");

    if ((time > sunset && time > sunrise) || (time < sunset && time < sunrise)) {
        console.log("true");
        nightmode(card, cityDisplay, tempDisplay, feelsDisplay, 
            humidityDisplay, descDisplay);
    }

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(feelsDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherImg);
}

function getWeatherImg(weatherId) {
    if (weatherId > 800) {
        if (weatherId == 801) {
            return "halfsunny.png";
        }
        return "cloudy.png";
    }

    if (weatherId == 800) {
        return "sunny.png";
    }

    if (weatherId >= 700) {
        if (weatherId == 701 || weatherId == 741 || weatherId == 761) {
            return "mist.png";
        } else if (weatherId == 721) {
            return "halfsunny.png";
        } else if (weatherId == 751) {
            return "sand.png";
        } else if (weatherId == 781) {
            return "tornado.png";
        } 
        return "cloudy.png";
    }

    if (weatherId >= 600) {
        if (weatherId == 600 || weatherId == 601 || 
            (weatherId >= 615 && weatherId <= 620)) {
                return "light_snow.png";
        } else if (weatherId >= 611 && weatherId <= 613) {
            return "sleet.png";
        }
        return "heavy_snow.png";
    }

    if (weatherId >= 300) {
        if (weatherId <= 321) {
            return "lightrain.png";
        } else if (weatherId == 511) {
            return "freezing_rain.png";
        }
        return "heavy rain.png";
    }

    if (weatherId >= 210 && weatherId <= 221) {
        return "thunderstorm.png";
    }
    return "rainstorm.png";
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.style.background = "linear-gradient(180deg, rgb(103, 214, 251), rgb(255, 224, 70))";
    card.style.boxShadow = "10px 10px 5px rgba(247, 198, 82, 0.753)";
    
    card.appendChild(errorDisplay);
}

function nightmode(card, cityDisplay, tempDisplay, feelsDisplay, humidityDisplay,
    descDisplay) {
        card.style.background = "linear-gradient(180deg, rgb(55, 105, 158), rgb(157, 121, 176))";
        card.style.boxShadow = "10px 10px 5px rgb(222, 193, 222)";
        cityDisplay.style.color = "white";
        tempDisplay.style.color = "white";
        feelsDisplay.style.color = "white";
        humidityDisplay.style.color = "white";
        descDisplay.style.color = "white";
}