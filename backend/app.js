// porting in modules and other dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoCredentials = require('./config/mongoCredentials');
const mongoose = require('mongoose');
const passport = require('passport');


// Connect mongoose
mongoose.connect(`mongodb+srv://${mongoCredentials.mongoID}:${mongoCredentials.mongoPassword}@projects-ccy41.mongodb.net/pricecheck?retryWrites=true`, { useNewUrlParser: true });
let db = mongoose.connection;

// Check connection
db.once('open', () => {
    console.log('Successfully Connected to MongoDB');
});

// Check for DB errors
db.on('error', (err) => {
    console.log(err);
});



// Express setup stuff
const app = express();

// Set PUG view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// use bodyparser module for JSON encoding/decoding
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Passport Middleware stuff
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Home Route
app.get('/', (req, res) => { res.render('register'); });

// Route Files
let users = require('./routes/users');
app.use('/users', users);  

//start app
app.listen(3000, '127.0.0.1', () => {console.log('Server is up and running on PORT 3000!')});