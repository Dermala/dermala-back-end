require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const logger = require('./lib/logger');
const gzip = require('compression');

const customerRoute = require('./routes/customer.route');
const productRoute = require('./routes/products.route');
const postRoute = require('./routes/post.route');

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dermala');


const app = express();

// Add Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

require('./config/passport')(passport);

//Add Routes
app.use('/api/customers', customerRoute);
app.use('/api/products', productRoute);
app.use('/api/photos', photoRoute);

app.use(function(err, req, res, next){
    if(err){
        logger.log('error', err);
        return res.status(500).send({ errors: ['Oops! Something went wrong on our end.']});
    }

    next();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
