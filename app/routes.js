var User = require('./models/user');

module.exports = function(app, passport) {


    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); //loginMessage gives errors, etc
    });

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('signup', {
        successRedirect : '/profile', // redirect to the profile
        failureRedirect : '/signup', // redirect back to the signup page
        failureFlash : true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('login', {
        successRedirect : '/profile', // redirect to the profile
        failureRedirect : '/login', // redirect to the signup page
        failureFlash : true // allow flash messages
    }));

    // protected so you have to be logged in
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/savings', isLoggedIn, function(req,res){
        res.render('savings.ejs',{
            user: req.user
        });
    })

    app.post('/savings',isLoggedIn,function(req,res){
        User.findOne({'username':req.user.username},function(err, user){
            if (err){
                throw err;
            }
            console.log(req)
            user.balance += user.savingsBalance;
            user.savingsBalance = 0;
            user.save(function(err){
                if (err){
                    console.log('error lowering balance in user ' + user.username);
                }
                res.json('/profile');
            })
        })
    })

    // after spend-now
    app.post('/profile',isLoggedIn,function(req,res){
        User.findOne({'username':req.user.username},function(err, user){
            if (err){
                throw err;
            }
            console.log(req)
            user.balance= req.body.balance;
            user.save(function(err){
                if (err){
                    console.log('error lowering balance in user ' + user.username);
                }
                res.json('/profile');
            })
        })
    })

    // get a goal
    app.get('/goals/:id', isLoggedIn, function(req,res){
        //TODO : if (id is valid id of goal)
        res.render('goalScreen.ejs',{
            id : req.params.id,
            user: req.user
        });
    })

    app.post('/goals/:id',isLoggedIn,function(req,res){
        User.findOne({'username':req.user.username},function(err, user){
            if (err){
                throw err;
            }
            console.log(req)
            user.balance= Number(req.body.balance);
            user.goals[req.params.id].saved+=Number(req.body.addedValue);

            user.save(function(err){
                if (err){
                    console.log('error lowering balance in user ' + user.username);
                }
                res.json('/profile');
            })
        })
    })

    app.delete('/goals/:id', isLoggedIn, function(req,res){
        User.findOne({'username':req.user.username},function(err,user){
            if (err){
                throw err;
            }
            user.goals.pop(req.params.id);
            user.save(function(err){
                if (err){
                    console.log("error in removing goal "+ id + " in user " + user.username);
                }
            })

        })
    })

    app.get('/goals/:id/edit', isLoggedIn, function(req,res){
        //TODO : if (id is valid id of goal)
        res.render('goalEdit.ejs',{
            id : req.params.id,
            user: req.user
        });
    })

    app.post('/goals/:id/edit', isLoggedIn, function(req,res){
        User.findOne({'username':req.user.username},function(err,user){
            if (err){
                throw err;
            }
            //TODO check id is valid in goal
            var goal = user.goals[req.params.id];
            goal.goalName = req.body.goalName;
            goal.price = req.body.price;
            user.save(function(err){
                if (err){
                    console.log("save error in user:",user.username);
                }
                res.render('goalScreen.ejs',{
                    id : req.params.id,
                    user: req.user
                });
            });
            
        })
    })


    app.post('/goals', isLoggedIn, function(req,res){
        User.findOne({'username':req.body.username},function(err, user){
            if (err){
                throw err;
            }
            var goals = user.goals;
            goals[goals.length] = {
                goalName : "",
                saved    : 0,
                price    : 0,
                imageURL : "",
            };
            user.goals = goals;
            user.save(function(err){
                if (err){
                    console.log("save error in user:",user.username);
                }
                res.json("/goals/" + (goals.length - 1)+"/edit");
            });
        });
    })

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
