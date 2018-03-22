/*
 *
 * Copyright 2017 Softplan
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var HTTPStatus = require('http-status');
var securityUrl = process.env.SECURITY_URL || 'http://intellead-security:8080/auth';
var NormalizeService = require('./src/NormalizeService');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
    next();
});

app.post('/normalize', function (req, res) {
    var token = req.header('token');
    request({ url: securityUrl + '/' + token}, function(error, response, customerString) {
        var customer = JSON.parse(customerString);
        if (response.statusCode != HTTPStatus.OK) {
            if (error) {
                console.log(error);
            }
            return res.sendStatus(response.statusCode);
        }
        var data = req.body;
        if (Object.keys(req.body).length === 0) return res.sendStatus(412);
        console.log('/normalize -> ' + data.email);
        new NormalizeService().normalize(data, customer.id, function(normalized_data) {
            console.log(normalized_data);
            return res.status(HTTPStatus.OK).send(normalized_data);
        });
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // router the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
