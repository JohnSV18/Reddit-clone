const express = require('express');
const exphbs = require('express-handlebars');
const app = express()
const port = 3000

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set db 
require('./data/reddit-db');
require('./controllers/posts')(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

module.exports = app;