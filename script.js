// DOM Elements for Utilities
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const weather = document.getElementById('weather');
const setLocation = document.getElementById('set-location');
const card = document.getElementById('card');
// Close button
const close = document.getElementById('close');

// DOM Elements for the Dynamic Data
const locationName = document.getElementById('location-name');
const weatherIcon = document.getElementById('icon');
const weatherDescription = document.getElementById('description');
const currentWeatherTemp = document.getElementById('temp');
const weatherHumidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// Event Listening Functions
// Load saved location or current lat/lon
let defaultSearch = localStorage.getItem("defaultSearch")
window.addEventListener('load', (event) => {
    
    if(defaultSearch === null) {
        localWeather()
    } else {
        loadWeather(defaultSearch)
        setLocation.innerHTML = "Default location: " + defaultSearch
        close.classList.remove('hidden')
    }
})

// Function that searches if the 'ENTER' Key is pushed
searchInput.addEventListener("keydown", (event) => {
    if (event.keyCode ===13) {
        event.preventDefault();
        searchBtn.click();
    }
})

// Saving a default location
setLocation.addEventListener('click', (event)=>{
    if(searchInput.value.length > 0) {
        setDefaultLocation()
    }
});

async function setDefaultLocation() {
        localStorage.setItem("defaultSearch", searchInput.value)
        let defaultSearch = await localStorage.getItem("defaultSearch")
        setLocation.innerHTML = "Default location: " + defaultSearch
        close.classList.remove('hidden')
}

    
// Removing default location
close.addEventListener('click', (event)=>{
    localStorage.clear();
    setLocation.innerHTML = "Set as default location"
    close.classList.add('hidden')
});

// Search Functionality of APP
searchBtn.addEventListener('click', (event)=>{
    // console.log('click')
    loadWeather(searchInput.value)
});

const baseUrl = 'https://api.openweathermap.org/data/2.5/'
const apiKey = '82dfad48bc8331f1e36871d2c2382e27'

async function loadWeather(location) {
    const result = await fetch(`${baseUrl}weather?q=${location}&units=metric&appid=${apiKey}`);
    // console.log(await result.json());
    const data = await result.json();
    // console.log(data)
    // searchInput.value.innerHTML ="";
    displayData(data)
}

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


    locationName.innerHTML = "Weather in " + name;
    // console.log(locationName)
    weatherIcon.setAttribute('src', "https://openweathermap.org/img/wn/" + icon + ".png");
    weatherDescription.innerHTML = description;
    currentWeatherTemp.innerHTML = tempRounded;
    weatherHumidity.innerHTML = humidity;
    windSpeed.innerHTML = speedRounded;

    weather.classList.remove("loading-hide");

    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"

}

// Load Weather using lat/lon
let lat, lon

async function localWeather(lat, lon) {

    if('geolocation' in navigator){
        console.log('geolocation available')
        navigator.geolocation.getCurrentPosition(async position => {
            console.log(position)
            lat = position.coords.latitude
            lon = position.coords.longitude

            const result = await fetch(`${baseUrl}onecall?lat=${lat}&lon=${lon}&units=metric&exclude=&appid=${apiKey}`);
            // console.log(await result.json());
            const data = await result.json();
            // console.log(data)
            // searchInput.value.innerHTML ="";
            displayLocalData(data)
        })
    }else {
        console.log('geolocation not available')
    }
}

async function displayLocalData(data) {
    // Below is short hand for const name = data.name
    const { timezone } = await data;
    const { icon, description } = await data.current.weather[0];
    const {temp, humidity, wind_speed } = await data.current; 
    // console.log(name, icon, description, temp, humidity, wind_speed);

    // Functions rounding the numbers
    var tempRounded = Math.round(temp * 10) / 10
    var speedRounded = Math.round(wind_speed)


    locationName.textContent = "Weather at your current location";
    // console.log(locationName)
    weatherIcon.setAttribute('src', "https://openweathermap.org/img/wn/" + icon + ".png");
    weatherDescription.innerHTML = description;
    currentWeatherTemp.innerHTML = tempRounded;
    weatherHumidity.innerHTML = humidity;
    windSpeed.innerHTML = speedRounded;

    weather.classList.remove("loading-hide");

    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + timezone + "')"

    

}

