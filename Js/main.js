var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// var findBtn=document.getElementById('findBtn')
var search_input=document.getElementById('search')
// console.log(search);


search_input.addEventListener('input',function(input){
    search(input.target.value)
})



async function search(input) {
    var t= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=937f15a884d746f4b70175301241512&q=${input}&days=3`)
    var reponse= await t.json()
    displayToday(reponse)
    displayOther(reponse)
}

search()


function displayToday(reponse){
    var date=new Date(reponse.current.last_updated)
    console.log(days[date.getDay()]);
    

    var today=`     <div class="weather-today col-sm-12 col-lg-4">
                        <div class="weather-header">
                            <div class="day">${days[date.getDay()]}</div>
                            <div class="date">16December</div>
                        </div>
                        <div class="weather-body">
                            <div class="location">${reponse.location.name}</div>
                            <div class="degree text-white  d-sm-flex align-items-center d-lg-block">
                                <div class="num">
                                    ${reponse.current.temp_c}<sup>o</sup>C
                                </div>
                                <img src="${reponse.current.condition.icon}" width="90" height="90" alt="moon">
                            </div>
                            <div class="clear">${reponse.current.condition.text}</div>
                            <span><img src="images/icon-umberella.png" width="21" height="21" alt="umberlla">20%</span>
                            <span><img src="images/icon-wind.png" width="21" height="21" alt="umberlla">18km/h</span>
                            <span><img src="images/icon-compass.png" width="21" height="21" alt="umberlla">East</span>
                        </div>
                    </div>`

                    document.getElementById('table').innerHTML=today
}


function displayOther(reponse){
    var sec_Day=new Date(reponse.forecast.forecastday[1].date)
    var third_Day=new Date(reponse.forecast.forecastday[2].date)

    var other=''
    other+=`     <div class="weather-tomorrow text-center col-sm-12 col-lg-4">
                        <div class="weather-header">
                            <div class="day">${days[sec_Day.getDay()]}</div>
                        </div>
                        <div class="weather-body">
                            <div class="weather-icon mb-4">
                                <img src="${reponse.forecast.forecastday[1].day.condition.icon}" width="48" alt="sun">
                            </div>
                            <div class="degree">
                                ${reponse.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C
                            </div>
                            <span>${reponse.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></span>
                            <span>${reponse.forecast.forecastday[1].day.condition.text}</span>

                        </div>
                    </div>

                    <div class="weather-tomorrow after text-center col-sm-12 col-lg-4">
                        <div class="weather-header">
                            <div class="day">${days[third_Day.getDay()]}</div>
                        </div>
                        <div class="weather-body">
                            <div class="weather-icon mb-4">
                                <img src="${reponse.forecast.forecastday[2].day.condition.icon}" width="48" alt="sun">
                            </div>
                            <div class="degree">
                                ${reponse.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C
                            </div>
                            <span>${reponse.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></span>
                            <span>${reponse.forecast.forecastday[2].day.condition.text}</span>

                        </div>
                    </div>`
                    document.getElementById("table").innerHTML+=other
}

search('cairo')