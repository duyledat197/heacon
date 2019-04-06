var loginRoute = require('./loginRoute');
var signUpRoute = require('./signUpRoute');
var messageRoute = require('./messageRoute');
var infoUserRoute = require('./infoUserRoute')
var connectRoute = require('./connectRoute');
module.exports = function(app){
    app.use('/login', loginRoute);
    app.use('/signup', signUpRoute);
    app.use('/info',infoUserRoute);
    app.use('/message',messageRoute);
    app.use('/connect',connectRoute);
}