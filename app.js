var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src/routes/index.route');
var usersRouter = require('./src/routes/users.route');
var aboutRouter = require('./src/routes/about.route');
var filmsRouter = require('./src/routes/films.route');
const authRouter = require('./src/routes/auth.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src', 'public')));
const session = require('express-session')

app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 60 * 1000,
    },
  })
)
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.authenticated = !!req.session.authenticated
  next()
})

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/films', filmsRouter)

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
