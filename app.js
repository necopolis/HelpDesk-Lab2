const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const favicon = require("serve-favicon");

const indexRouter = require('./routes/index');
const clienteRouter = require('./routes/cliente');
const empleadoRouter = require('./routes/empleado');
const adminRouter = require('./routes/admin');
const helpdeskRouter = require('./routes/helpdesk');
const calidadRouter = require('./routes/calidad');
const permiso = require('./controllers/middleware').permiso;
const cliente = require('./controllers/middleware').cliente;
const empleado = require('./controllers/middleware').empleado;
const admin = require('./controllers/middleware').admin;
const helpdesk=require('./controllers/middleware').helpdesk;
const calidad=require('./controllers/middleware').calidad;

const app = express();

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
app.use('/cliente', permiso, cliente, clienteRouter);
app.use('/empleado', permiso, empleado, empleadoRouter);
app.use('/admin', permiso, admin, adminRouter);
app.use('/helpdesk', permiso, helpdesk, helpdeskRouter);
app.use('/calidad', permiso, calidad , calidadRouter);

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
