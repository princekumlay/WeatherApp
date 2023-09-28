//******declaring variables  */
//storing the key for fecthing the data of weather from the api
const apikey = "ba2d39d695eefa17a5fff67253b546a2";
//storing the url in the variable so that it can accessed further
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
//accessing the search input, search button and image of the weather container
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const image = document.querySelector(".weather-icon");

//creating a function which get the data of the weather information from the api
async function checkweather(city) {
    //it fetch the data from the api
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    //checking for the not found status
    // if there is a error in the city name then it display the the messege specified in the container
    if (response.status == 404) {
        // it set the error container display "block"
        document.querySelector(".error").style.display = "block";
        // while there is a error then the weather container set to display "none"
        document.querySelector(".weather").style.display = "none";
    }
    // and if there is no error then it display the content of the weathere container
    else {
        // it set the error container to display "none" to hide while the weather information is going to render on the page
        document.querySelector(".error").style.display = "none";
        //it set the weather container to display block
        document.querySelector(".weather").style.display = "block";

        //here the data that is fetched from the api is stored in the variable "data" in the "json" format
        var data = await response.json();


        //now updating the data of our document using the data recieved from the api
        //here city name is updated
        document.querySelector(".city").innerHTML = data.name;
        //temperature updated
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&#176";
        //humidity updated
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        //wind updated
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        //updating the weather icon according to the condition of the city
        if (data.weather[0].main == "Clear") {
            image.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Clouds") {
            image.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            image.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            image.src = "images/mist.png";
        }
        else if (data.weather[0].main == "Rain") {
            image.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Snow") {
            image.src = "image/snow.png";
        }

    }
}

//adding a event listener for  click event
searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
})
searchbox.addEventListener("keypress",(e)=>{
    if(e.key==="Enter")
    checkweather(searchbox.value);
})