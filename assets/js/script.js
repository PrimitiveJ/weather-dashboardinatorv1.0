userInput = document.querySelector(".form-control")
tableBody = document.querySelector("#table_body")
tableBody2 = document.querySelector("#table_body2")
submitbtnEl = document.getElementById("btn")

let eventHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

let cityName = userInput.value
console.log(cityName)
if (cityName) {
    getcurrentWeather(cityName)
     // clear old content
     tablebody.textContent = "";
     tableBody2.textContent= "";
     userInput.value = "";
}else {
    alert("Please enter a valid city");
  }
};

var buttonClickHandler = function(event) {
    // get the language attribute from the clicked element
    var pastCity = event.target.textContent
  
    if (pastCity) {
      getcurrentWeather(language);
  
      // clear old content
      tableBody.textContent = "";
      tableBody2.textContent="";
    }
  };
//   https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
function getcurrentWeather(city){
    //format API URL
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&APPID=19eecb01033710945577be8f1d9f7976'
    
    fetch(apiUrl).then((data)=>{
     console.log(data)
    return data.json();
}).then((objectData)=>{
    console.log(objectData);
    let tableData="";
    let cityLat = objectData.coord.lat
    let cityLon = objectData.coord.lon
        tableData+=`<tr>
        <td>${objectData.name}
        <td>${objectData.clouds.all}</td>
        <td>${objectData.coord.lat}</td>
        <td>${objectData.coord.lon}</td>
        <td><img src="http://openweathermap.org/img/wn/50n@2x.png"/></td>
    </tr>`;
    
           document.getElementById("table_body").innerHTML = tableData;
}).catch((err)=>{
    console.log(err);
})
};


// add event listeners to form and button container
submitbtnEl.addEventListener("click", eventHandler);
// pastcityBtn.addEventListener("click", buttonClickHandler);
