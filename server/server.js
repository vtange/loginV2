#!/usr/bin/env node
/*---------------------------------*/	
/*	DEBUG							*/
var debug = require('debug')('passport-mongo'),
/*---------------------------------*/
/*---------------------------------*/	
/*	APP.JS							*/
    app = require('./app');
/*---------------------------------*/

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log("starting server...")
  debug('Express server listening on port ' + server.address().port);
});
