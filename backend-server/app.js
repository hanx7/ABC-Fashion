const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const {get} = require("axios");
const cors = require('cors');



const app = express();

// Enable CORS for all routes
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//Fetch  shipments
app.get('/shipments', async (req, res) => {
  try {
    const orderNumber = req.query.orderNumber;

    // Make a GET request to the external API with the orderNumber as a query parameter
    const response = await get('https://abc-fashion-v2-bzwn2mw5ya-km.a.run.app/shipments', {
      params: {
        orderNumber: orderNumber
      },
      auth: {
        username: 'pipelabs',
        password: 'h04Kp5NNm4qN'
      }
    });

    // Send the data received from the API as the response
    res.json(response.data);
  } catch (error) {
    // If there's an error, send an error response
    console.error('Error fetching shipments data:', error);
    res.status(500).json({error: 'An error occurred while fetching shipments data'});
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
