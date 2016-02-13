var User = require('../models/user');
var Polls = require('../models/poll');

function PollHandler(){

this.getProfilePolls = function(req, res){
        Polls
        .find({'creator': req.user.local.email}, {'id_': false})
        .exec(function(err, result){
            console.log(result);
            res.json(result);
        });
};

   this.postPoll = function (req, res){
        //if (err) { console.log("error no se xq ¬¬"); throw err; }
        console.log("holaa"); 
        var newPoll = new Polls({
            'creator': req.user.local.email,
            'pollname': req.body.pollname,
            'hola' : []
        });
        if(req.body.ins){
            req.body.ins.forEach(function(aux){
                var aux2 = {'name': aux, 'votes': 0};
                newPoll.hola.push(aux2);
            });
        }
        newPoll.save(function (err, doc) {
            if (err) { throw err; }
            //res.json(doc);
            res.redirect('/profile');
        });
    }; 

    this.getUser =  function(req, res){
        res.render('pollform.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    };

     this.getPoll = function(req, res){
        Polls
        .find({'pollname': req.params.id})
        .exec(function(err, result){
            console.log(req.params.id);
            if(!result) return [{}];
            res.json(result);
       });
    }; 

    this.postVote = function(req, res){
        Polls
        .findOneAndUpdate({'pollname': req.params.id, 'hola.name': req.params.id2}, {$inc: {'hola.$.votes': 1}})
        .exec(function(err, result) {
            res.redirect('/done');
        });
    };

    this.prepareEdit = function(req, res){
        Polls
        .find({'creator': req.user.local.email, 'pollname': req.params.id })
        .exec(function(err, result){
            res.render('polledit.ejs', {
                user : req.user, polls : result
            });
       });
    }; 

   this.deletePoll =  function(req, res){
        Polls
        .findOneAndRemove({ 
            'pollname' : req.params.id, 
            'creator' : req.user.local.email })
        //.exec(function(err, result) { console.log(res.json(result)); })
        //.remove()
        .exec(function(err) {
            console.log(req.params.id + '  ');
            console.log(req.user.local.email);
            res.redirect('/profile');
        });
    };


    this.viewPoll = function(req, res){
        Polls
        .find({'pollname': req.params.id})
        .exec(function (err, result) {
            res.redirect('/poll');
        });
    };

}
module.exports = PollHandler;
