const request =require ('request');

//          request({ url:url,json:true},(error,response) => {
//             const help = response.body.current 
//             if(error){
//                 console.log("Unable to connect to weather service!")
//             }else if(response.body.error) {
//                 console.log("Unable to find Location")                
//             }else{
//                 console.log(help.weather_descriptions[0]+". It is currently "+help.temperature+" degress out. It feels like "+help.feelslike+" degress out")
//             }
//         // console.log(response.body.current )  
//         })


const forecast = (long,lat,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=932be7a8e405d40c4da074408a8202e1&query='+lat+','+long+'&units=m'
    
    request({ url,json:true},(error,{body}) => {
        if (error) {
            callback('Unable to connect to location service forecast '+url,undefined)
        } else if(body.error){
            callback("Unable to find Location forecast! "+url,undefined  )
           
        }else {
            callback(undefined,{
                desc:body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feels: body.current.feelslike,
                time: body.location.localtime
                 
            })
        }
    })
}

module.exports=forecast