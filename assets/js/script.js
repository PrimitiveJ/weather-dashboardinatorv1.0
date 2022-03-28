//get elements from HTML
let userInput = document.querySelector(".form-control")
let tableBody = document.querySelector("#table_body")
let tableBody2 = document.querySelector("#table_body2")
let submitbtnEl = document.getElementById("btn")
let pastsearcheslistEl = document.querySelector("#pastsearchescont")
let todaysdateEl = document.querySelector(".todaysdate")
let todaysdateEl2 = document.querySelector(".todaysdate2")
let date2El = document.querySelector(".date2")
let date3El = document.querySelector(".date3")
let date4El = document.querySelector(".date4")
let date5El = document.querySelector(".date5")
let d = new Date();

//Function that runs on window load, updating the date.
window.onload = function dateUpdate(){
todaysdateEl.innerHTML = "(Today)" + d.toUTCString();
todaysdateEl2.innerHTML= "(Today)" + d.toDateString();
date2El.textContent= d.toDateString(d.setDate(d.getDate()+1));
date3El.textContent= d.toDateString(d.setDate(d.getDate()+1));
date4El.textContent= d.toDateString(d.setDate(d.getDate()+1));
date5El.textContent= d.toDateString(d.setDate(d.getDate()+1));
}

//Event handler that calls functions that get weather and handles errors
let eventHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
let cityName = userInput.value
console.log(cityName)
if (cityName) {
    getcurrentWeather(cityName)
    

    
    
     // clear old content
     tableBody.textContent = "";
     tableBody2.textContent= "";
     userInput.value = "";

} 
else {
    alert("Please enter a valid city");
  }
    let pastCities = {City: cityName}
    
   
    
     let retrieveddata = localStorage.getItem('City')
    if (!retrieveddata) {
        retrieveddata = []
    } else {
     retrieveddata = JSON.parse(retrieveddata)
    }
    //console.log(retrieveddata)
    retrieveddata.push(pastCities)
    localStorage.setItem('City', JSON.stringify(retrieveddata))


    
    
     let pastcitieslistchildren = pastsearcheslistEl.children
     for (var i=pastcitieslistchildren.length-1; i>= 0; i--) {
         pastcitieslistchildren[i].remove()
     }
    let savedcitystring = localStorage.getItem('City')
    let savedcityvalue = JSON.parse(savedcitystring)
    //console.log(savedcityvalue)
    function createBtn (citydata) {
        let cityItem = document.createElement('button')
        cityItem.setAttribute("id", "buttonEl")
        cityItem.textContent = citydata.City
        //console.log(citydata.City)
       // console.log(cityItem)
        pastsearcheslistEl.appendChild(cityItem)
        
    }
    savedcityvalue.forEach(createBtn)
    buttonEl= document.querySelectorAll("#buttonEl")
        //console.log(buttonEl)
        document.querySelector("#buttonEl").forEach(addEventListener('click', buttonClickHandler))
    

};
//handler for when user clicks search button or on a past-searched city. Calls getweather functions on past cities. 
let buttonClickHandler = function(event) {
    // get the pastcity attribute from the clicked element
    
    let pastCity = event.target.textContent
  
    if (pastCity) {
      getcurrentWeather(pastCity);
  
      // clear old content
      tableBody.textContent = "";
      tableBody2.textContent="";
    }

    else if (pastCity.textcontent = "") {
        console.log("Please select a valid City")
    }
    
  };
//   https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//Function that calls the open weather API to get daily weather and longitude and latitude to pipe into the one call API. Appends data to HTML.
function getcurrentWeather(city){
    //format API URL
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&APPID=19eecb01033710945577be8f1d9f7976&units=imperial'
    
    fetch(apiUrl).then((data)=>{
    //  console.log(data)
    return data.json();
}).then((objectData)=>{
     //console.log(objectData);
    let tableData="";
    let cityLat = objectData.coord.lat
    let cityLon = objectData.coord.lon
    let weatherIcon = objectData.weather[0].icon
    let iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
    // console.log(weatherIcon)
        tableData+=`<tr>
        <td>${objectData.name}</td>
        <td>${objectData.main.temp}
        <td>${objectData.wind.speed}</td>
        <td>${objectData.main.humidity}</td>
        <td><img src=${iconUrl}></td>
    </tr>`;
    
           document.getElementById("table_body").innerHTML = tableData;
//Second API call, to happen once the first has completed and given us the latitude/longitude. Used for 5 day forecast. Appends to HTML. 
           let onecallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" +cityLat + "&lon=" + cityLon + "&APPID=19eecb01033710945577be8f1d9f7976&units=imperial"
fetch(onecallUrl).then((data2)=>{
    //  console.log(data2) 
    return data2.json();
}).then((objectData2)=>{
     //console.log(objectData2);
    let tableData="";
    let weatherIcon2 = objectData2.daily[0].weather[0].icon
    let weatherIcon3 = objectData2.daily[1].weather[0].icon
    let weatherIcon4 = objectData2.daily[2].weather[0].icon
    let weatherIcon5 = objectData2.daily[3].weather[0].icon
    let weatherIcon6 = objectData2.daily[4].weather[0].icon
    let iconUrl2 = "http://openweathermap.org/img/wn/" + weatherIcon2 + "@2x.png"
    let iconUrl3 = "http://openweathermap.org/img/wn/" + weatherIcon3 + "@2x.png"
    let iconUrl4 = "http://openweathermap.org/img/wn/" + weatherIcon4 + "@2x.png"
    let iconUrl5 = "http://openweathermap.org/img/wn/" + weatherIcon5 + "@2x.png"
    let iconUrl6 = "http://openweathermap.org/img/wn/" + weatherIcon6 + "@2x.png"
    
        tableData+=`<tr>
        <td class = "dayitem1" >Temperature:${objectData2.daily[0].temp.day} (Degrees Farenheit) <br/> <br/> Wind Speed:${objectData2.daily[0].wind_speed} (MPH)<br/> <br/> Humidity:${objectData2.daily[0].humidity} <br/> <br/> Image:<img src=${iconUrl2}> <br/> <br/> <button id= "uvIndex"> UV Index:${objectData2.daily[0].uvi}</button></td>
        <td class = "dayitem2">Temperature:${objectData2.daily[1].temp.day} (Degrees Farenheit) <br/> <br/> Wind Speed:${objectData2.daily[1].wind_speed} (MPH)<br/> <br/> Humidity:${objectData2.daily[1].humidity} <br/> <br/> Image:<img src=${iconUrl3}> <br/> <br/></td>
        <td class = "dayitem3">Temperature:${objectData2.daily[2].temp.day} (Degrees Farenheit) <br/> <br/> Wind Speed:${objectData2.daily[2].wind_speed} (MPH)<br/> <br/> Humidity:${objectData2.daily[2].humidity} <br/> <br/> Image:<img src=${iconUrl4}> <br/> <br/> </td>
        <td>Temperature:${objectData2.daily[3].temp.day} (Degrees Farenheit) <br/> <br/> Wind Speed:${objectData2.daily[3].wind_speed} (MPH)<br/> <br/> Humidity:${objectData2.daily[3].humidity} <br/> <br/> Image:<img src=${iconUrl5}> <br/> <br/> </td>
        <td>Temperature:${objectData2.daily[4].temp.day} (Degrees Farenheit) <br/> <br/> Wind Speed:${objectData2.daily[4].wind_speed} (MPH)<br/> <br/> Humidity:${objectData2.daily[4].humidity} <br/> <br/> Image:<img src=${iconUrl6}> <br/> <br/> </td>
        
        
        
    </tr>`;
    //Logic to adjust coloring of UV index.
           document.getElementById("table_body2").innerHTML = tableData;
           //console.log(objectData2.daily[0].uvi)
            if (objectData2.daily[0].uvi < 3 ) {
        let uvIndexEl = document.querySelector("#uvIndex")
        uvIndexEl.setAttribute("style", "background-color:green;");

         }

         else if (objectData2.daily[0].uvi > 3 && objectData2.daily[0].uvi <= 6.99) {
            let uvIndexEl = document.querySelector("#uvIndex")
            uvIndexEl.setAttribute("style", "background-color:yellow;");
    
             }

         else if (objectData2.daily[0].uvi > 7 && objectData2.daily[0].uvi <= 9) {
            let uvIndexEl = document.querySelector("#uvIndex")
            uvIndexEl.setAttribute("style", "background-color:orange;");
    
             }
            
             else if (objectData2.daily[0].uvi >= 10) {
                let uvIndexEl = document.querySelector("#uvIndex")
                uvIndexEl.setAttribute("style", "background-color:red;");
        
                 }
         
          
}).catch((err)=>{
    console.log(err);
})
}).catch((err)=>{
    console.log(err);
})
};


  

// add event listeners to form and button container
submitbtnEl.addEventListener("click", eventHandler);

