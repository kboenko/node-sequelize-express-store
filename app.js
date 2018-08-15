const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/api');
const CONFIG = require('./config/config');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', routes);

app.use((req, res, next) => {
    var err = new Error(CONFIG.error404.message + req.url);
    err.status = 404;
    err.type = CONFIG.error404.type;
    next(err);
});

app.use((err, req, res, next) => {

    res.status(err.status || 500);
    console.log('status ' + err.status);
    res.send({ error: {
            type: err.type,
            message: err.message,
            params: err.params
        }
    });
});

let port = CONFIG.port;

app.listen(port, () => console.log(`Server listens to port ${port}`));

module.exports = app;