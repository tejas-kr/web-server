const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars views and location
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//setup static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather App', 
        'name': 'Tejas Jaiswal'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About',
        'name': 'Tejas Kr'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help',
        'name': 'Tejas Kr'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forcast: 'boom',
        location: 'xoxo land'
    });
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        });
    }

    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404_error/404', {
        'errorMessage': 'Help Page not found 404',
        'title': '404',
        'name': 'Tejas Kr'
    });
});

app.get('*', (req, res) => {
    res.render('404_error/404', {
        'errorMessage': 'Page not found 404',
        'title': '404',
        'name': 'Tejas Kr'
    });
});

app.listen(3000, () => {
    console.log('server started on port 3000');
});