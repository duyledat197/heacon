var loginRoute = require('./loginRoute');
var signUpRoute = require('./signUpRoute');
var messageRoute = require('./messageRoute');
module.exports = function(app,io){
    app.use('/login', loginRoute);
    app.use('/signup', signUpRoute);
    app.use('/message',(req,res,next) =>{
            req.io = io;
            next();
        }, messageRoute);
    
}