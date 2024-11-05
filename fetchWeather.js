
async function fetchWeatherData() {
    try {
        const response = await fetch('https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); 
        
        const weatherData = data.data.items[0]; 
        const updatedTimestamp = weatherData.update_timestamp; 
        if (!updatedTimestamp) {
            console.error('Updated timestamp not found in the response');
            document.getElementById('timestamp').innerText = 'Updated timestamp not found';
            return; 
        }
       
        const date = new Date(updatedTimestamp);

        
        if (isNaN(date.getTime())) {
            console.error('Invalid date:', updatedTimestamp);
            document.getElementById('timestamp').innerText = 'Invalid date format';
        } else {
            const lastUpdate = date.toLocaleString(); 
            document.getElementById('timestamp').innerText = `Data last updated: ${lastUpdate}`;
        }

        
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


fetchWeatherData();
