const express = require('express')
const request = require('request')
var bodyParser = require('body-parser')
const app = express();

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/weather', (req,res) => {
    let city = req.query.city
    let unit = req.query.unit
    let apiKey = "da18dadca2d3b0106d9f9381b2c319fa"
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&APPID=${apiKey}`
    request(url, (error,response,body) =>{
        if(error){
            return res.statusCode(500).send('Internal server error')
        }
        else{
            if(response.statusCode === 200){
                let weatherDetails = JSON.parse(body)
                let weatherInfo = {
                    temperature : weatherDetails.main.temp,
                    pressure : weatherDetails.main.pressure,
                    humidity :  weatherDetails.main.humidity,
                    sunriseTime :  weatherDetails.sys.sunrise,
                    sunsetTime : weatherDetails.sys.sunset
                }
                res.json(weatherInfo)
            }
        }

    })

})

app.listen(7000, () => console.log(`server started on port 7000`))