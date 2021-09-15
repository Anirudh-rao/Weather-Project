// Accessing node  Packages
const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');

//App var to acces the Express var
const app = express();
//Used to pass the data from  JS
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
});
app.post("/", function(req, res){
    
   
    const query = req.body.CityName;
    const Apikey="APIKEY";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+Apikey;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
           const WeatherData= JSON.parse(data);
           const Temperature = WeatherData.main.temp;
           const WeatherDescription = WeatherData.weather[0].description;
           const WeatherIcon = WeatherData.weather[0].icon;
           const ImageURL = "https://openweathermap.org/img/wn/"+WeatherIcon+"@2x.png";
           //We can only have one Res.send function in the Sever 
           res.write("<h1>The Temperature in "+query+" is " + Temperature + "in Degrees Celcius</h1>");
           res.write("<p>The Weather Description is "+ WeatherDescription +" in "+query+"</p>");
           res.write("<img src = "+ImageURL+">");
           res.send();
        })
    })
   
})

app.listen(3000, function(){
    console.log("Server running on Port 3000")
})


