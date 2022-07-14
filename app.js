var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');
var favicon = require("serve-favicon");

var indexRouter = require('./routes/index');
var clienteRouter = require('./routes/cliente');
var empleadoRouter = require('./routes/empleado');
var adminRouter = require('./routes/admin');
var helpdeskRouter = require('./routes/helpdesk');
var calidadRouter = require('./routes/calidad');
var mdlwr = require('./controllers/middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// middlerwares
app.use(methodOverride('_method'));
app.use(session({
  secret: "mario",
  resave: true,
  saveUninitialized: true,}));
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, "public", "favicon.png")));

app.use('/', indexRouter);
app.use('/cliente', mdlwr.permiso, mdlwr.cliente, clienteRouter);
app.use('/empleado', mdlwr.permiso, mdlwr.empleado, empleadoRouter);
app.use('/admin', mdlwr.permiso, mdlwr.admin, adminRouter);
app.use('/helpdesk', mdlwr.permiso, mdlwr.helpdesk, helpdeskRouter);
app.use('/calidad', mdlwr.permiso, mdlwr.calidad , calidadRouter);

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
