async function fetchWeatherData() {
    try {
        const response = await fetch('https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Check the structure here
        console.log(timestamp);


        // Access the relevant data
        const weatherData = data.data.items[0]; // Adjust based on the correct path to the data
        const lastUpdate = new Date(weatherData.updated_timestamp).toLocaleString();

        const tableBody = document.getElementById('weatherData');
        weatherData.forecasts.forEach(forecast => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${forecast.area}</td><td>${forecast.forecast}</td>`;
            tableBody.appendChild(row);
        });

        document.getElementById('timestamp').innerText = `Data last updated: ${lastUpdate}`;
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('timestamp').innerText = 'Error fetching data';
    }
}

