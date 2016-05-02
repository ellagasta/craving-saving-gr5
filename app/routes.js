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

    // add to savings
    app.post('/savings',isLoggedIn,function(req,res){
        User.findOne({'username':req.user.username},function(err, user){
            if (err){
                throw err;
            }
            user.balance -= Number(req.body.addedSavings)
            user.savingsBalance += Number(req.body.addedSavings);
            user.save(function(err){
                if (err){
                    console.log('error lowering balance in user ' + user.username);
                }
                res.json({ok:true});
            })
        })
    })

    // empty savings
    app.delete('/savings',isLoggedIn,function(req,res){
        User.findOne({'username':req.user.username},function(err, user){
            if (err){
                throw err;
            }
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
                res.json({ok:true});
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
            user.balance= Number(req.body.balance);
            user.goals[req.params.id].saved+=Number(req.body.addedValue);

            user.save(function(err){
                if (err){
                    console.log('error lowering balance in user ' + user.username);
                }
                res.json({ok:true});
            })
        })
    })

    app.delete('/goals/:id', isLoggedIn, function(req,res){
        User.findOne({'username':req.user.username},function(err,user){
            if (err){
                throw err;
            }
            user.balance += user.goals[req.params.id].saved;
            user.goals.splice(req.params.id,1);
            user.save(function(err){
                if (err){
                    console.log("error in removing goal "+ id + " in user " + user.username);
                }else{
                    res.json({ok:true});
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
            goal.created = req.body.created;
            goal.imageURL = req.body.imageURL;
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

// purchase goal
    app.post('/goals/:id/purchase', isLoggedIn, function(req,res){
        User.findOne({'username':req.user.username},function(err,user){
            if (err){
                throw err;
            }
            user.goals.pop(req.params.id);
            user.save(function(err){
                if (err){
                    console.log("error in purchasing goal "+ id + " in user " + user.username);
                }else{
                    res.json({ok:true});
                }
            })
        })
    })

// add new goal
    app.post('/goals', isLoggedIn, function(req,res){
        User.findOne({'username':req.body.username},function(err, user){
            if (err){
                throw err;
            }
            var goals = user.goals;
            goals[goals.length] = {
                goalName : "New Goal",
                saved    : 0,
                price    : 0,
                imageURL : "/images/placeholder-square.jpg",
                created  : false
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

// add new event to history
    app.post('/history', isLoggedIn, function(req,res){
        User.findOne({'username':req.user.username},function(err, user){
            if (err) {
                throw err;
            }
            var history = user.history;
            history[history.length] = {
                date                : req.body.date,
                imageURL            : req.body.imageURL,
                eventDescription    : req.body.eventDescription,
                availableFundsBalance   : req.body.availableFundsBalance
            };
            user.history = history;
            user.save(function(err) {
                if (err) {
                    console.log("save error in user:",user.username);
                }
            });
        });
    });
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

