const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',function(req,res){

  res.sendFile(__dirname + '/index.html');

});

app.post('/',function(req,res){

  // res.send('Post Request Recive');
  // console.log(req.body.cityName);
  const apiKey = 'd0f4569612de127c7c4b8d3c3fd51547';
  const query = req.body.cityName;
  // console.log(query);
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+ apiKey +'&units=metric';
  try {

    https.get(url,function (response){

      // console.log(response.statusCode);
      // console.log(response.statusMessage);
      // console.log(response.headers);

      response.on("data",function(data){
        console.log(data);
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const weatherDescription = weatherData.weather[0].description;
        const temp = weatherData.main.temp;

        const icon = weatherData.weather[0].icon;
        // const icon = 'http://openweathermap.org/img/wn/';//http://openweathermap.org/img/wn/10d@2x.png
        const iconURL = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon+'@2x.png';
        const image = '<img src="'+ iconURL +' " alt="Weather Icon"/>'
        // console.log(iconURL);
        res.write("<p>The Weather is currently " + weatherDescription + '</p>');
        res.write('<h1>The Temperture in '+ query +' is ' + temp + ' degrees Celcius </h1>');
        res.write(image);
        res.send();

      });
    });
  }
  catch(e){
    //not usefull
    res.write('<p> we dont know this location . </p>');
    res.send();
  }



});




// res.send('Server is up and running');


app.listen(3000, function(){
  console.log('Server is running on port 3000');
});
