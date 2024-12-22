// weatherWidget.js
export class WeatherWidget {
  constructor(elementId, defaultCity = "Los Angeles") {
    this.elementId = elementId;
    this.defaultCity = defaultCity;
    this.init();
  }

  init() {
    this.renderForm();
    this.fetchWeather(this.defaultCity);
  }

  renderForm() {
    const formHtml = `
      <div class="weather-card">
        <form id="weather-form" class="search-form">
          <input type="text" id="city-input" class="search-input" placeholder="Enter city name">
          <button type="submit" class="search-button">Get Weather</button>
        </form>
        <div id="weather-display"></div>
      </div>
    `;
    document.getElementById(this.elementId).innerHTML = formHtml;
    document
      .getElementById("weather-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const city = document.getElementById("city-input").value;
        this.fetchWeather(city);
      });
  }

  async fetchWeather(city) {
    const button = document.querySelector(".search-button");
    button.disabled = true;
    button.textContent = "Loading...";

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_OPENWEATHERMAP_API_KEY
        }&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        throw new Error(data.message);
      }
      this.displayWeather(data);
    } catch (error) {
      this.displayError("Failed to fetch weather data. Please try again.");
    } finally {
      button.disabled = false;
      button.textContent = "Get Weather";
    }
  }

  getWeatherIcon(weatherCode) {
    // You can replace these with actual weather icons
    const icons = {
      clear: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="weather-icon" style="color: #facc15"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
      clouds: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="weather-icon" style="color: #94a3b8"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
      rain: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="weather-icon" style="color: #60a5fa"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><line x1="12" y1="19" x2="12" y2="23"/></svg>`,
    };

    const code = weatherCode.toLowerCase();
    if (code.includes("clear")) return icons.clear;
    if (code.includes("rain")) return icons.rain;
    return icons.clouds;
  }

  displayWeather(data) {
    const weatherHtml = `
      <div class="weather-header">
        <div class="location-info">
          <h2>${data.name}</h2>
          <p>${data.sys.country}</p>
        </div>
        ${this.getWeatherIcon(data.weather[0].description)}
      </div>

      <div class="weather-grid">
        <div class="weather-item">
          <div class="weather-item-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #ef4444"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
            <span class="weather-value">${Math.round(data.main.temp)}°C</span>
          </div>
          <p class="weather-label">Temperature</p>
        </div>

        <div class="weather-item">
          <div class="weather-item-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #3b82f6"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/></svg>
            <span class="weather-value">${data.main.humidity}%</span>
          </div>
          <p class="weather-label">Humidity</p>
        </div>

        <div class="weather-item">
          <div class="weather-item-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #64748b"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/></svg>
            <span class="weather-value">${Math.round(
              data.wind.speed
            )} m/s</span>
          </div>
          <p class="weather-label">Wind Speed</p>
        </div>

        <div class="weather-item">
          <div class="weather-item-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #64748b"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <span class="weather-value">${Math.round(
              data.visibility / 1000
            )} km</span>
          </div>
          <p class="weather-label">Visibility</p>
        </div>
      </div>

      <div class="weather-details">
        <div class="wind-direction">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(${
            data.wind.deg
          }deg)"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
          <span>Wind Direction: ${data.wind.deg}°</span>
        </div>
        <p class="weather-description">${data.weather[0].description}</p>
      </div>
    `;
    document.getElementById("weather-display").innerHTML = weatherHtml;
  }

  displayError(message) {
    document.getElementById("weather-display").innerHTML = `
      <div class="error-message">${message}</div>
    `;
  }
}
