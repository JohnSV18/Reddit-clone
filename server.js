const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');
const app = express()
const port = 3000
require('dotenv').config();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuth);

// set db 
require('./data/reddit-db');
require('./controllers/posts')(app);
require('./controllers/comments')(app);
require('./controllers/auth')(app);
require('./controllers/replies.js')(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

module.exports = app;