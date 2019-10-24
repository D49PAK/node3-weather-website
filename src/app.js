const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for express configue
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set handelbar engines and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jhone watsan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Remo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help me',
        title: 'Help',
        name: 'Jhony'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address!'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forcatData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forcatData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide serch term'
        })
    }
    console.log(req.query)
    res.send({
        Products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deepak',
        errorMessage: 'Help article not found !'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deepak',
        errorMessage: 'Page not found !'
    })
})
app.listen(3000, () => {
    console.log('server is up on posrt 3000.')
})