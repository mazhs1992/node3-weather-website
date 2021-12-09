"use strict";

console.log("JavaScript file is loaded"); // fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
// function weather(city){
// fetch(`http://localhost:3000/weather?address=${city}`).then((response)=>{
//     response.json().then((data)=>{
//       if(data.error){
//         console.log(data.error)
//       }else{
//         console.log(data.location)
//         console.log(data.forecast)
//       }
//     })
// })
// }

var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var messageOne = document.querySelector('#message-1'); //find by id

var messageTwo = document.querySelector('#message-2'); //e stands for event

weatherForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var location = search.value;
  messageOne.textContent = 'Loading...';
  fetch('/weather?address=' + location).then(function (response) {
    response.json().then(function (data) {
      if (data.error) {
        messageOne.textContent = data.error;

        if (messageTwo.textContent !== null) {
          messageTwo.textContent = '';
        }
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast.desc + '. Temperature : ' + data.forecast.temp + '. Feels like : ' + data.forecast.feels;
        console.log(data.forecast);
      }
    });
  }); //weather(location)

  console.log(location);
});