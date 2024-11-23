'use strict'
const dateObject = new Date();
const searchInput = document.querySelector("#area");
// Day 1
const todayTemp = document.querySelector("#todayTemp");
const theLocation = document.querySelector("#location");
const descript = document.querySelector("#desToday");
const theIcon = document.querySelector("#icon");
const date = document.querySelector("#date");
const theDate = document.querySelector("#currentDay");
//Day 2
const theDate2 =document.querySelector("#nextDayDate");
const maxTempD2 = document.querySelector("#maxTempday2");
const minTempD2 = document.querySelector("#minTempday2");
const iconD2 = document.querySelector("#iconD2");
const descriptD2 = document.querySelector("#descriptDay2");
//Day 3
const theDate3 = document.querySelector("#day3Date");
const iconD3 = document.querySelector("#iconD3");
const maxTempD3 = document.querySelector("#maxTempday3");
const minTempD3 = document.querySelector("#minTempD3");
const descriptD3 = document.querySelector("#descriptDay3");
async function getApi(area){
    try{
    const myAPI = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5d08a052cb074e4c8f973203242609&q=${area}&days=3&aqi=yes&alerts=no`);
    if(!myAPI.ok){
        throw new Error('Failed to fetch API');
    }
    const myData = await myAPI.json();
    // console.log(myData);
    return myData;
    } catch (error){
        console.error(error);
        return null;
    }
};
async function displayWeather(){
    let area = searchInput.value;
    let thetemp = await getApi(area); // The Api Weather
    if(thetemp){
        todayTemp.innerHTML = `${thetemp.current.temp_c}°C`;
        theLocation.innerHTML = thetemp.location.name;
        descript.innerHTML = thetemp.current.condition.text;
        theIcon.src = thetemp.current.condition.icon;
        date.innerHTML = thetemp.location.localtime.split(" ")[0];
        theDate.innerHTML = dateObject.toLocaleString('default', {weekday: 'long'});
        console.log(thetemp.current);
        document.querySelector(".windKm").innerHTML = thetemp.current.wind_kph +"km/h";
        document.querySelector(".humidity").innerHTML = thetemp.current.humidity +"%"
        document.querySelector(".direction").innerHTML = thetemp.current.wind_dir
// Day 2
theDate2.innerHTML = getdayName(thetemp.forecast.forecastday[1].date);
maxTempD2.innerHTML = thetemp.forecast.forecastday[1].day.maxtemp_c;
minTempD2.innerHTML = thetemp.forecast.forecastday[1].day.mintemp_c;
iconD2.src = thetemp.forecast.forecastday[1].day.condition.icon;
descriptD2.innerHTML = thetemp.forecast.forecastday[1].day.condition.text;
// Day 3
theDate3.innerHTML = getdayName(thetemp.forecast.forecastday[2].date);
iconD3.src = thetemp.forecast.forecastday[2].day.condition.icon;
maxTempD3.innerHTML = thetemp.forecast.forecastday[2].day.maxtemp_c;
minTempD3.innerHTML = thetemp.forecast.forecastday[2].day.mintemp_c;
descriptD3.innerHTML= thetemp.forecast.forecastday[2].day.condition.text;
    }else{
        console.log("there is an error in displayWeather Function()");
        
    }
};
searchInput.addEventListener("input", () => {
    setTimeout(displayWeather, 1000)
});
function getdayName(str){
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dateObject = new Date(str);
    return dayNames[dateObject.getDay()];
};