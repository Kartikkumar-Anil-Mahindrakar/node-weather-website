const express = require('express');
const hbs = require('hbs'); 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// const html = require('./index.html')
const path = require('path')

const app = express()

const port = process.env.PORT || 3000;
// console.log(__dirname)
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views locations
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        'title':'Weather App',
        'name':"Andrew Mead"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        'title':'About ME',
        'name':"Kartik"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        'title':'Please help me',
        'name':"Kartikkumar "
    })
})

app.get("/help/*",(req,res)=>{
    res.render('404',{
        title:'404',
        name:'kartikkumar',
        errorMessage:'Page Not Found'
    });
})

// app.get('/help/unit')

app.get('/weather',(req,res)=>{
    const queryLocation = req.query.address;
    console.log(queryLocation)
    if(!queryLocation){
        return res.send({
            error:'Address must be provided'
        })
    }
    geocode(queryLocation,(error, {Latitude,Longitude,Location} = {})=>{

        if(error){
            return res.send({
                error:error
            })
        }
        // const  = geoData;
        // console.log('Error', error)
        // console.log('Data', data)
        forecast(Latitude,Longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            // console.log(Location);
            // console.log(forecastData)
            res.send({
                forecast:forecastData,
                Locations:Location,
                address:queryLocation
            })
          })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    }) 
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'kartikkumar',
        errorMessage:'Page Not Found'
    });
})




app.listen(port,()=>{
    console.log('Server is up on port '+port+' .');
});