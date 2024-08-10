window.onload = function() {
    // Function to request location
    function requestLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }

    // Success callback for location access
    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const Key = 'd1ffa95da32b4b4a1c011d9ce976efc3';

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Key}&units=metric`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("city").value = data.name; // Fill the city input with detected city
                displayWeather(data);
                document.getElementById("allow-location").style.display = 'none';
                document.getElementById("manual-input").style.display = 'block';
            })
            .catch(error => console.error('Error:', error));
    }

    // Error callback for location access
    function error() {
        console.error('Unable to retrieve your location');
        document.getElementById("allow-location").style.display = 'none';
        document.getElementById("manual-input").style.display = 'block';
    }

    // Event handler for "Allow Location" button
    document.getElementById("allow-location").onclick = function() {
        requestLocation();
    };

    // Event handler for "Enter Location Manually" button
    document.getElementById("deny-location").onclick = function() {
        document.getElementById("location-prompt").style.display = 'none';
        document.getElementById("manual-input").style.display = 'block';
    };

    // Event handler for "Get Weather" button
    document.getElementById("weather-icon").onclick = function() {
        let city = document.getElementById("city").value;
        const Key = 'd1ffa95da32b4b4a1c011d9ce976efc3';

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Key}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error:', error));
    };

    // Event handler for "Change Theme" button
    document.getElementById("theme-toggle").onclick = function() {
        let body = document.body;
        let themeToggleBtn = document.getElementById("theme-toggle");

        if (body.classList.contains("light-theme")) {
            body.classList.remove("light-theme");
            body.classList.add("dark-theme");
            themeToggleBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2c0 0 0 0 0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4c0 0 0 0 0 0c19.8 27.1 39.7 54.4 49.2 86.2l160 0zM192 512c44.2 0 80-35.8 80-80l0-16-160 0 0 16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"/>
                </svg>
            `;
        } else {
            body.classList.remove("dark-theme");
            body.classList.add("light-theme");
            themeToggleBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2c0 0 0 0 0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4c0 0 0 0 0 0c19.8 27.1 39.7 54.4 49.2 86.2l160 0zM192 512c44.2 0 80-35.8 80-80l0-16-160 0 0 16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"/>
                </svg>
            `;
        }
    };

    // Function to display weather data
    function displayWeather(data) {
        let city = data.name;
        let weather = data.weather[0].main;
        let temp = data.main.temp;
        let speed = data.wind.speed;

        // Set background image based on weather
        setBackgroundImage(weather);

        let imgPath = '';
        if (weather === "Clouds") {
            imgPath = 'images/clouds.png';
        } else if (weather === "Rain") {
            imgPath = 'images/rain.png';
        } else if (weather === "Mist") {
            imgPath = 'images/mist.png';
        } else if (weather === "Clear") {
            imgPath = 'images/clear.png';
        }

        let Div = document.getElementById("weather");
        Div.innerHTML = `<span class="weather-data">${city}</span><br>
                         <span class="weather-data">Weather: ${weather}<br></span>
                         <span class="weather-data">Temperature: ${temp} °C<br></span>
                         <span class="weather-data">Wind Speed: ${speed} m/s</span>`;

        if (imgPath) {
            let img = document.createElement("img");
            img.src = imgPath;
            img.alt = `Weather: ${weather}`;
            Div.appendChild(img);
        }

        // Show the weather info with a drop-down effect
        Div.classList.add('show');
    }

    // Function to set background image based on weather condition
    function setBackgroundImage(weather) {
        let body = document.body;
        if (weather === "Clouds") {
            body.style.backgroundImage = "url('images/cloudy.jpg')";
        } else if (weather === "Rain") {
            body.style.backgroundImage = "url('images/rainy.jpg')";
        } else if (weather === "Clear") {
            body.style.backgroundImage = "url('images/clear.jpg')";
        } else if (weather === "Mist") {
            body.style.backgroundImage = "url('images/mist.jpg')";
        }
    }
};
