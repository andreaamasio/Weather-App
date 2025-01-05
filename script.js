const vcKey = "UXSQEUXXZFN5BQ2BHNYRJLVEU"

function convertToCelcius(temperatureFahrenheit) {
  return ((temperatureFahrenheit - 32) * 5) / 9
}

async function getWeather(city) {
  const weatherURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${vcKey}`

  try {
    const response = await fetch(weatherURL, { mode: "cors" })
    const weatherData = await response.json()

    const currentConditions = weatherData.currentConditions
    const conditions = currentConditions.conditions
    const humidity = `${currentConditions.humidity}%`
    const sunrise = currentConditions.sunrise
    const sunset = currentConditions.sunset
    let temperatureFahrenheit = currentConditions.temp

    // Get the weather container and clear previous content
    const weatherContainer = document.getElementById("weather")
    weatherContainer.innerHTML = "" // Clear previous content

    // Create and append DOM elements for each piece of data
    const conditionsElement = document.createElement("p")
    conditionsElement.innerHTML = `<strong>Conditions:</strong> ${conditions}`
    weatherContainer.appendChild(conditionsElement)

    const humidityElement = document.createElement("p")
    humidityElement.innerHTML = `<strong>Humidity:</strong> ${humidity}`
    weatherContainer.appendChild(humidityElement)

    const sunriseElement = document.createElement("p")
    sunriseElement.innerHTML = `<strong>Sunrise:</strong> ${sunrise}`
    weatherContainer.appendChild(sunriseElement)

    const sunsetElement = document.createElement("p")
    sunsetElement.innerHTML = `<strong>Sunset:</strong> ${sunset}`
    weatherContainer.appendChild(sunsetElement)

    const temperatureElement = document.createElement("p")
    const temperatureValue = document.createElement("span")
    temperatureValue.id = "temperature"
    temperatureValue.textContent = `${temperatureFahrenheit} °F`
    temperatureElement.innerHTML = `<strong>Temperature:</strong> `
    temperatureElement.appendChild(temperatureValue)
    weatherContainer.appendChild(temperatureElement)

    // Create and append the toggle button
    const toggleButton = document.createElement("button")
    toggleButton.id = "toggleTemp"
    toggleButton.textContent = "Toggle Temperature (°C/°F)"
    weatherContainer.appendChild(toggleButton)

    // Toggle button functionality
    let isFahrenheit = true
    toggleButton.addEventListener("click", () => {
      if (isFahrenheit) {
        const temperatureCelsius = convertToCelcius(
          temperatureFahrenheit
        ).toFixed(1)
        temperatureValue.textContent = `${temperatureCelsius} °C`
      } else {
        temperatureValue.textContent = `${temperatureFahrenheit} °F`
      }
      isFahrenheit = !isFahrenheit
    })
  } catch (error) {
    console.error("Error fetching weather data:", error)
    const weatherContainer = document.getElementById("weather")
    weatherContainer.innerHTML = `<p style="color: red;">Failed to fetch weather data. Please try again.</p>`
  }
}

// Add event listener to the "Search" button
document.getElementById("searchCity").addEventListener("click", () => {
  const cityInput = document.getElementById("city")
  const city = cityInput.value.trim()
  if (city) {
    getWeather(city)
  } else {
    alert("Please enter a city name!")
  }
})

// Initial call to load default weather
getWeather("London")
