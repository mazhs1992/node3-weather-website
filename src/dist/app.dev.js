"use strict";

var path = require('path');

var express = require('express');

var hbs = require('hbs');

var geocode = require('./utils/geocode');

var forecast = require('./utils/forecast');

var app = express();
var port = process.env.PORT || 3000; //for HEROKU
//define paths for Express config

var publicDirectoryPath = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials'); //Setup handlebarsand views location

app.set('view engine', 'hbs'); //HANDLE BAR -dynamic tamplets

app.set('views', viewsPath); //HANDLE BAR  search for views foldre by default--> now it search for templates

hbs.registerPartials(partialsPath); //setup static directory

app.use(express["static"](publicDirectoryPath)); //ROOT

app.get('', function (req, res) {
  //HANDLE BAR
  res.render('index', {
    title: 'Weather App',
    name: 'Vangelis Mazis'
  });
}); //ABOUT 

app.get('/about', function (req, res) {
  //HANDLE BAR
  res.render('about', {
    title: ' About Dynamic file',
    name: 'Vangelis Mazis'
  });
}); //HELP

app.get('/help', function (req, res) {
  //HANDLE BAR
  res.render('help', {
    title: ' Help Dynamic file',
    name: 'Vangelis Mazis',
    message: 'This is a test message for help'
  });
}); // app.get('',(req,res) =>{
//     res.send('<h1>Weather</h1>')
// })
// app.get('/help',(req,res) =>{
//     res.send({
//         name:'Vangelis',
//         age:29
//     })
// })
// app.get('/about',(req,res) =>{
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather', function (req, res) {
  if (!req.query.address) {
    return res.send({
      error: 'You myst provide a address term'
    });
  } //


  geocode(req.query.address, function (error) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        latitude = _ref.latitude,
        longtitude = _ref.longtitude,
        location = _ref.location;

    if (error) {
      return res.send({
        error: error
      });
    }

    forecast(longtitude, latitude, function (error, forecastData) {
      if (error) {
        return console.log(error);
      }

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  }); //
});
/*
if(!address){
    console.log("Please give an address")
}else{
    geocode(address,(error,{latitude,longtitude,location} = {})=>{
        if (error){
            return console.log (error)
        }
        
        forecast( longtitude,latitude, (error, forecastData) => {
            if (error){
                return console.log( error) 
            }       
            console.log(location)
            console.log(forecastData)
        })
    })
}

*/

app.get('/products', function (req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'You myst provide a search term'
    });
  }

  res.send({
    products: []
  });
});
app.get('/help/*', function (req, res) {
  res.render('404', {
    title: '404 Help',
    errorMessage: 'Article not found'
  });
}); //404 Error

app.get('*', function (req, res) {
  res.render('404', {
    title: '404',
    name: 'Vangelis Mazis',
    errorMessage: 'Page not found'
  });
}); //Start Server

app.listen(port, function () {
  console.log('Server is up on port ' + port);
});