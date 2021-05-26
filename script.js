// DOM Elements for Utilities
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const weather = document.getElementById('weather');

// DOM Elements for the Dynamic Data
const locationName = document.getElementById('location-name');
const weatherIcon = document.getElementById('icon');
const weatherDescription = document.getElementById('description');
const currentWeatherTemp = document.getElementById('temp');
const weatherHumidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

window.addEventListener('load', (event) => {
    loadWeather('melbourne')
})


searchBtn.addEventListener('click', (event)=>{
    // console.log('click')
    loadWeather(searchInput.value)
});

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?'
const apiKey = '82dfad48bc8331f1e36871d2c2382e27'

async function loadWeather(location) {
    const result = await fetch(`${baseUrl}q=${location}&units=metric&appid=${apiKey}`);
    // console.log(await result.json());
    const data = await result.json();
    // console.log(data)
    // searchInput.value.innerHTML ="";
    displayData(data)
}
loadWeather()

async function displayData(data) {
    // Below is short hand for const name = data.name
    const {name} = await data;
    const { icon, description } = await data.weather[0];
    const {temp, humidity } = await data.main;
    const { speed } = await data.wind;
    // console.log(name, icon, description, temp, humidity, speed);

    // Functions rounding the numbers
    var tempRounded = Math.round(temp * 10) / 10
    var speedRounded = Math.round(speed)


    locationName.innerHTML = name;
    // console.log(locationName)
    weatherIcon.setAttribute('src', "http://openweathermap.org/img/wn/" + icon + ".png");
    weatherDescription.innerHTML = description;
    currentWeatherTemp.innerHTML = tempRounded;
    weatherHumidity.innerHTML = humidity;
    windSpeed.innerHTML = speedRounded;

    weather.classList.remove("loading-hide");

    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"

}