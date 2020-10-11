const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/')); // styles.css


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
  const query=req.body.cityName;
  const apikey="8b2d8647b6d175ec3e0e72feab6c8fde";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" + apikey + "&units=" +unit;
  https.get(url, function(response){
    response.on("data",function(data){
      const weatherData=JSON.parse(data)
      const temp=weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The weather in " +query+ " is " +temp+" degrees Calcius.</h1>")
      res.write("<p>The weather is currently " +weatherDescription+ "</p>")
      res.write("<img src=" +imgURL+ ">")
      res.send()
    })
  })
})

// get weather in Sydney
// app.get("/", function(req, res) {
//   const url = "https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=8b2d8647b6d175ec3e0e72feab6c8fde&units=metric";
//   https.get(url, function(response) {
//     response.on("data", function(data) {
//       const weatherData = JSON.parse(data)
//       const temp = weatherData.main.temp
//       const weatherDescription = weatherData.weather[0].description
//       const icon = weatherData.weather[0].icon
//       const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
//       res.write("<h1>The temperature in Sydney is " + temp + ' degrees Celcius.</h1>')
//       res.write("<p>The weather is currently " + weatherDescription + "</p>")
//       res.write("<img src=" + imgURL + ">")
//       res.send()
//     })
//   });
// })
app.listen(3000, function() {
  console.log("port 3000 is now in listening");
})
