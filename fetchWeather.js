
async function fetchWeatherData() {
    try {
        const response = await fetch('https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Check the structure here

        // Access the relevant data
        const weatherData = data.data.items[0]; // Access the first item
        const updatedTimestamp = weatherData.updated_timestamp; // Get the updated timestamp
        if (!updatedTimestamp) {
            console.error('Updated timestamp not found in the response');
            document.getElementById('timestamp').innerText = 'Updated timestamp not found';
            return; // Exit the function
        }
        // Convert timestamp to Date object
        const date = new Date(updatedTimestamp);

        // Validate date
        if (isNaN(date.getTime())) {
            console.error('Invalid date:', updatedTimestamp);
            document.getElementById('timestamp').innerText = 'Invalid date format';
        } else {
            const lastUpdate = date.toLocaleString(); // Convert to local string format
            document.getElementById('timestamp').innerText = `Data last updated: ${lastUpdate}`;
        }

        // Populate the table with forecasts
        const tableBody = document.getElementById('weatherTable');

        weatherData.forecasts.forEach(forecast => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${forecast.area}</td><td>${forecast.forecast}</td>`;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('timestamp').innerText = 'Error fetching data';
    }
}

// Call the function to fetch the weather data
fetchWeatherData();
