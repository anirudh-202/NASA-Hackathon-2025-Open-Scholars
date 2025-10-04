// Map Open-Meteo weather codes to human-readable strings
const weatherDescriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Heavy drizzle',
    56: 'Freezing light drizzle',
    57: 'Freezing heavy drizzle',
    61: 'Light rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Freezing light rain',
    67: 'Freezing heavy rain',
    71: 'Light snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Light rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Light snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with light hail',
    99: 'Thunderstorm with heavy hail'
  };
  
  // Function to fetch current weather from Open-Meteo
  function fetchWeather(lat, lon, city) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const weatherCode = data.current_weather.weathercode;
        const temperature = data.current_weather.temperature;
        const description = weatherDescriptions[weatherCode] || 'Unknown';
        alert(`🌤️ ${city}\nTemperature: ${temperature}°C\nCondition: ${description}`);
      })
      .catch(err => {
        console.error(err);
        alert("⚠️ Could not fetch weather data.");
      });
  }
  
  // When a city is clicked
  deckInstance.setProps({
    onClick: info => {
      if (info.object) {
        const { latitude, longitude, city } = info.object;
  
        // Zoom in
        deckInstance.setProps({
          initialViewState: {
            latitude,
            longitude,
            zoom: 7,
            pitch: 30
          }
        });
  
        // Fetch and show weather
        fetchWeather(latitude, longitude, city);
  
        // Show back button
        document.getElementById('back-btn').style.display = 'block';
      }
    }
  });
  
  // Function to zoom out to the full map
  function zoomOut() {
    deckInstance.setProps({
      initialViewState: {
        latitude: 20,
        longitude: 0,
        zoom: 1.5,
        pitch: 0
      }
    });
    document.getElementById('back-btn').style.display = 'none';
  }
  