const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app
    .get('/', onHome)
    .get('/users/:userId/books/:bookId', onUser)


function onHome(req, res) {
    res.send('root')
}

function onUser(req, res) {
    res.send(req.params)
}