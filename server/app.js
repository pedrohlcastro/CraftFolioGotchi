const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compress = require('compression');
const mongoose = require('mongoose');
const passport = require('passport');

const database = require('./database');
const middlewares = require('./middlewares');

const ENV = process.env.NODE_ENV || 'dev';
const app = express();

app.use(compress());
app.use(morgan(ENV || 'dev'));
app.use(cors());

// passport
app.use(passport.initialize());
middlewares.auth.local(passport);
middlewares.auth.basic(passport);
app.use(passport.session({ session: false }));

// helmet config
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
app.use(helmet.xssFilter());
app.disable('x-powered-by');

// body-parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

database.init(mongoose);

app.use('/api/auth', require('./routes').auth);

// Error handler
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        if (err.err) {
            // eslint-disable-next-line no-console
            console.error('\x1b[31m', `[SERVER] ${err.err}`);
            res.status(err.status || 500).json({ result: err.message });
        } else {
            res.status(err.status || 500).json({ result: 'Unknown Internal Error' });
        }
    } else {
        res.status(err.status || 500).json({ result: 'Unknown Internal Error' });
    }
    next();
});

module.exports = app;
