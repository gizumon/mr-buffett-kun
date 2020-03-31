const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const webhooksRouter = require('./routes/webhook');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/v1/webhook', webhooksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json(err);
// });

module.exports = app;
app.listen(port, () => console.log(`Listening on port ${port}`));
