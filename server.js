const express = require('express')
const app = express()
const port = 3000

// lisetning to port
app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Example app listening on port ${port}`)
})

// connect database
const connect = require('./connect');

// serving static files in Express
app.use(express.static('public'))

// setting views to views folder
app.set('view engine', 'ejs')
    .set('views', 'views')

// urlencoded for form data
app.use(express.urlencoded({ extended: true }))

// routes
app
    .get('/', (req, res) => {
        res.render('index.ejs')
    })
    .get('/trips', (req, res) => {
        res.render('trips.ejs')
    })
    .get('/trips/:trip', (req, res) => {
        res.render('trip_details.ejs')
    })
    .get('/trips/:trip/book', (req, res) => {
        res.render('book.ejs')
    })
    .get('/trips/:trip/book/:bookingNR/confirmed', (req, res) => {
        res.render('confirmed.ejs')
    })
    .get('/users/:user', (req, res) => {
        const user = req.params.user;
        res.render('profile.ejs', {
            user: user
        });
    })
    // 404 page
    // .use((req, res) => {
    //     res.status(404).render('not_found.ejs');
    // });