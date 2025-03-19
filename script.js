target = "Lahore";

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
    searchField.value = "";
}

const temperatureField = document.querySelector('.temp');
const locationField = document.querySelector('.time_location p');
const dateandTimeField = document.querySelector('.time_location span');
const conditionField = document.querySelector('.condition p'); // Fixed typo
const searchField = document.querySelector('.search_field');
const form = document.querySelector('.form');
form.addEventListener('submit', searchForLocation);

const fetchResults = async (city) => {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=c538666046af4f02b73135217251903&q=${city}&aqi=no`);
    const data = await response.json();
    
    let location_name = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    updateDetails(temp, location_name, time, condition);
}

fetchResults(target);

function updateDetails(temp, location, time, condition) {
    let splitDate = time.includes(' ') ? time.split(' ')[0] : "Date not available";
    let splitTime = time.includes(' ') ? time.split(' ')[1] : "Time not available";
    let currentDay = getDayName(new Date().getDay());

    temperatureField.innerText = temp; // Fixed innerText
    locationField.innerText = location;
    dateandTimeField.innerText = `${splitTime} ${currentDay} ${splitDate}`;  
    conditionField.innerText = condition;
}

function getDayName(number) {
    switch (number) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        default: return "";
    }
}
