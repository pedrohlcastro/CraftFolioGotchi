const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compress = require('compression');

const ENV = process.env.NODE_ENV;
const app = express();

app.use(compress());
app.use(morgan(ENV || 'dev'));
app.use(cors());

// helmet config
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
app.use(helmet.xssFilter());
app.disable('x-powered-by');

// body-parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// database.init(mongoose)
//     .then(() => {
// app.use('/api/client', routes.ClientRoute);

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
        res.status(err.status || 500).json({ result: err.message });
    }
    next();
});
// });

module.exports = app;
