/* Global Variables */
const baseZipUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const APIKEY = '39867afc4d87fbf8b2f8a6b6b914281f';
let date = document.getElementById('date');
let city = document.getElementById('city');
let temperature = document.getElementById('temp');
let content = document.getElementById('content');

// Store custom key-value object in myObj
const myObj = {};

// Create a new date instance dynamically with JS
let d = new Date();
let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let newDate = month[d.getMonth()]+'-'+ d.getDate()+'-'+ d.getFullYear();


// Funciton to make GET request to server endpoint and update UI

const updateUI = async (url) => {
    const res = await fetch(url);
    try{
        const resData = await res.json();
        date.innerHTML = resData.date;
        city.innerHTML = resData.city;
        temperature.innerHTML = resData.temperature;
        content.innerHTML = resData.content;     
    } catch(error) {
        console.log("error my error", error.message);
    }

}

// Function to make POST to server endpoint
const postData = async (url, data) => {
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) // body data type must match "Content-Type" header        
  });
    try {
      const newData = await response.text();
      console.log(newData);
      return newData
    }catch(error) {
    console.log("error oh error", error.message);
    }
}

// Openweather API call function that takes the baseurl,zipcode, country code and API keys as arguments
const queryWeather = async (url,zipcode,api) => {
    let weatherResponse = await fetch(`${url}${zipcode}&appid=${api}&units=imperial`);
    try{  
        let res = await weatherResponse.json();
        myObj.date = newDate;
        myObj.city = res.name;
        myObj.temperature = res.main.temp+String.fromCodePoint(8451);
        // Add user feels to object
        // Get user feelings from DOM
        let userFeels = document.getElementById('feelings').value;
        if (userFeels !== ''){
            myObj.feelings = userFeels;
            return myObj;
        } else {
            myObj.feelings = "You're indifferent about the weather";
        }
    } catch(err) {
        console.log(`Something aint right: ${err.message}${err}`)
    }
}

// Add an event listener to the generate buttton
const generate = document.getElementById('generate');

generate.addEventListener('click',() => {
    // Retrieve user zipcode from DOM for openWeather API call
    const userZipcode = document.getElementById('zip').value;
    // Error check to determine if zip code was entered
    if (userZipcode !== ''){
        queryWeather(baseZipUrl,userZipcode,APIKEY)
        .then(data => {
            postData('/add',data)
            updateUI('/weatherDevil')
        });
    } else {
        alert('Please enter zip code')
    }
})
