var Strategy   = require('passport-local').Strategy;
var User            = require('../app/models/user');


module.exports = function(passport) {
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // we are using named strategies since we have one for login and one for signup
    passport.use('signup', new Strategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'username' : username }, function(err, user) {
                if (err)
                    return done(err);

                if (user) { // if user with username exists
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    var newUser = new User();
                    newUser.name=req.body.name;
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);
                    newUser.balance = 100;
                    newUser.savingsBalance = 0;
                    newUser.goals = [];

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });    
        });
    }));


    passport.use('login', new Strategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {

        User.findOne({ 'username' :  username }, function(err, user) {
            if (err)
                return done(err);

            // if no users with that username
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });
    }));
};

