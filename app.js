const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routerController = require('./routes/routerController');
const { default: helmet } = require('helmet');
const { logger } = require('./service/logService');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

mongoose.connect(process.env.MONGODB_SECRET, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => logger.info('Connected to MongoDB'))
    .catch(err => logger.error('Could not connect to MongoDB', err));

app.use((req, res, next) => {
    const url = req.originalUrl;

    let body = '';
    if (req.method === 'GET') {
        body = JSON.stringify(req.query);
    } else {
        body = JSON.stringify(req.body);
    }

    logger.info(`Method: ${req.method},  Url: ${url},  Headers: ${JSON.stringify(req.headers)},  Params: ${body}`);

    next();
});

app.use('/api', routerController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, () => {
    logger.info(`Nodejs Server Environment: ${process.env.NODE_ENV}`)
    logger.info(`Server Port: ${PORT}`)
});
