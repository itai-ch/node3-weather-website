const mapbox = require('./utils/mapbox')
const weatherstack = require('./utils/weatherstack')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths foe Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
 
// Setup handlebars engine and views location 
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Itai' 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Itai'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text!',
        title: 'Help',
        name: 'Itai'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide an address!' })
    }

    mapbox(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        weatherstack(latitude, longitude, (error, weather_data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                location,
                weather: weather_data
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Itai', 
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Itai', 
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})