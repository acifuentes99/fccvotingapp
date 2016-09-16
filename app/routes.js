var path = process.cwd();
var pollHandler = require(process.cwd() + '/app/controllers/pollHandler.server.js'); 

module.exports = function(app, passport) {
    
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }

    var auxHandler = new pollHandler();

    app.route('/')
    .get(function(req, res) {
        res.render('index.ejs', {user: req.user}); // load the index.ejs file
    });

    app.route('/login')
    .get(function(req, res) {
        res.render('login.ejs', {user: req.user, message: req.flash('loginMessage') }); 
    })
    .post(passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.route('/newPoll')
    .get(isLoggedIn, function(req, res) {
        res.render('pollform.ejs', {
            user: req.user
        });
    });

    app.route('/logout')
    .get(function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.route('/signup')
        .get(function(req, res) {
            res.render('signup.ejs', {user: req.user, message: req.flash('signupMessage') });
        })
        .post(passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    app.route('/profile')
    .get(isLoggedIn, function(req, res){
        //res.sendfile(path + '/views/profile.ejs');
        res.render(path + '/views/profile.ejs' , {
            user : req.user
        });
    });

    app.route('/api/polls')
    .get(isLoggedIn, auxHandler.getProfilePolls)
    .post(isLoggedIn, auxHandler.postPoll)
    .delete(isLoggedIn, auxHandler.deletePoll);

    app.route('/api/polls/edit/:id')
    .post(isLoggedIn, auxHandler.editPoll);


    app.route('/api/pollDel/:id')
    .get(isLoggedIn, auxHandler.deletePoll);

    /*
    app.route('/editPoll/:id')
    .get(isLoggedIn, function(req,res) {
        res.render(path + '/views/polledit.ejs' , {
            user: req.user, pollname: req.params.id
        });
    });
    */

    app.route('/editPoll/:id')
    .get(isLoggedIn, auxHandler.openEdit);

    app.route('/poll/:id')
    .get(function(req,res) {
        res.render(path + '/views/poll.ejs',{
            user: req.user, pollname: req.params.id
        });
    });

    app.route('/api/polls2/:id')
   .get(function(req, res, next){
       console.log(req.params.id);
        var pollname = req.params.id;
        next();
   },auxHandler.getPoll);

    app.route('/api/polls3/:id/:id2')
    .post(auxHandler.postVote);

    app.route('/done')
    .get(function(req, res){
        res.render(path + '/views/voted.ejs', {user: req.user});
    });
};


