const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const mainRoutes = require('./app/routes/main-routes');
const error = require('./middleware/errorHandler');
const dbConfig = require('./config/db');
const passport = require('passport');
require('./middleware/passport')(passport);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Setting up port with express js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));


app.use(morgan('tiny'));

app.use('/api', mainRoutes);

app.use(error); //this is the error handler for all promise rejections in the server.

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database sucessfully connected')
},
    error => {
        console.log('Database could not connected: ' + error)
    }
);

// Create port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Connected to port ' + port);
});

