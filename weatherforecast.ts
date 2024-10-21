async function fetchWeatherData() {
    const response = await fetch('https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast');
    
    const data = await response.json();
    const weatherData = data.items[0];
    
    // Get the last update timestamp
    const lastUpdate = new Date(weatherData.timestamp).toLocaleString();

    // Populate the table
    const tableBody = document.getElementById('weatherData');
    weatherData.forecasts.forEach(forecast => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${forecast.area}</td><td>${forecast.forecast}</td>`;
        tableBody.appendChild(row);
    });

    // Display the last update timestamp
    document.getElementById('timestamp').innerText = `Data last updated: ${lastUpdate}`;
}

fetchWeatherData();
