const path = require('path')
const express = require('express')
const hbs = require('hbs')


const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000 //for HEROKU

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebarsand views location
app.set('view engine','hbs')//HANDLE BAR -dynamic tamplets
app.set('views',viewsPath)//HANDLE BAR  search for views foldre by default--> now it search for templates
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

//ROOT
app.get('',(req,res) =>{  //HANDLE BAR
    res.render('index',{
        title: 'Weather App',
        name : 'Vangelis Mazis'
    })
})

//ABOUT 
app.get('/about',(req,res) =>{  //HANDLE BAR
    res.render('about',{
        title: ' About Dynamic file',
        name : 'Vangelis Mazis'
    })
})

//HELP
app.get('/help',(req,res) =>{  //HANDLE BAR
    res.render('help',{
        title: ' Help Dynamic file',
        name : 'Vangelis Mazis',
        message: 'This is a test message for help'
    })
})

// app.get('',(req,res) =>{
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

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'You myst provide a address term'
        })
   }
   //
    geocode(req.query.address,(error,{latitude,longtitude,location} = {})=>{
            if (error){
                return res.send({error})
            }
            
            forecast( longtitude,latitude, (error, forecastData) => {
                if (error){
                    return console.log( error) 
                }  
                
                res.send({
                    forecast:forecastData,
                    location:location,
                    address:req.query.address
                })
               
            })
        })
   //

    
})

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



app.get('/products',(req,res) =>{
   if(!req.query.search){
        return res.send({
            error:'You myst provide a search term'
        })
   }
    res.send({
      products:[]
    })

})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Help',
        errorMessage:'Article not found'
    })
})

//404 Error
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name :'Vangelis Mazis',
        errorMessage:'Page not found'

    })
})

//Start Server
app.listen(port, ()=>{
    console.log('Server is up on port ' +port)
})