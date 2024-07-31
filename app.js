const express = require("express")
var hbs = require("hbs")
const path = require("path")
const request = require("request")
const forecast = require("./data/forcast")
const geocode = require("./data/geocode")

const app = express()
const port = process.env.PORT || 5000
const x = path.join(__dirname, "./public")
app.use(express.static(x))

app.set('view engine', 'hbs')
app.get('/', (req, res) => {
    res.render('index', {
        title: "home",
        desc: "this is home page"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            // shorthand property error:error
            return res.send({ error })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                longtiude: data.longitude,
                latitude: data.latitude,
                location: req.query.address,
                weather: forecastData.weather,
                city: forecastData.city,
                temp: forecastData.temperature
            })
        })
    })
})
app.get('*', (req, res) => {
    res.send('404 Page Not Founded')
})
app.listen(port, () => {
    console.log("App is listinning on port")
})