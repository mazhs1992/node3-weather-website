console.log("JavaScript file is loaded");

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
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

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') //find by id
const messageTwo = document.querySelector('#message-2')



//e stands for event
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent='Loading...'

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
          response.json().then((data)=>{
            if(data.error){
              messageOne.textContent=data.error   
              if (messageTwo.textContent !== null){
                messageTwo.textContent=''
              }           
            }else{
              messageOne.textContent= data.location
              messageTwo.textContent = data.forecast.desc             
              
            }
              
          })
      }) 

    //weather(location)
    console.log(location)
}) 