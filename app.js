var express = require('express')
var app = express()
var things = require('./query.js')


app.use(things)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// pool.connect((req, res) => {
//     console.log(req)
//     console.log('coneected')
// });

app.listen(3000);
