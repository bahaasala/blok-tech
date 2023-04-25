const express = require('express')
const app = express()
const port = 3000

// lisetning to port
app.listen(port, (err) => {
    if (err) console.log(err);
    console.log(`Example app listening on port ${port}`)
})

// serving static files in Express
app.use(express.static('public'))

// setting views to views folder
app.set('view engine', 'ejs')
    .set('views', 'views')

// routes
app
    .get('/', (req, res) => {
        res.render('index.ejs')
    })
    .get('/users/:user', (req, res) => {
        const user = req.params.user;
        res.render('profile.ejs', {
            user: user
        });
    })