const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){

  const query = req.body.cityName;
  const apiKey = "281e75c09b92d05b8f4a2c6506f295ab";
  const unit ="metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const WeatherData= JSON.parse(data);
      const temp = WeatherData.main.temp;
      const des = WeatherData.weather[0].description
      console.log(temp);
      console.log(des);

      const icon = "https://openweathermap.org/img/wn/"+WeatherData.weather[0].icon +"@2x.png";

      res.write("<h1>The temperature in " + query + " is "+ temp +" degree celsius.</h1>" );
      res.write("<h3>The weather is currently "+des+"</h3>");
      res.write("<img src="+icon+">");
      res.send();
    });
  });
});



app.listen(3000,function(){
  console.log("server at 3000 started");
});
