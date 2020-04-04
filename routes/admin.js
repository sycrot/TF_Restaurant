var express = require('express');
var user = require('./../inc/admin/users');
var router = express.Router();

router.get("/", function(req, res, next){

    res.render('admin/index', {
        
    });

});

router.get("/contacts", function(req, res, next){

    res.render('admin/contacts', {
        
    });

});

// login
router.post('/login', function(req, res, next){

    if (!req.body.email) {
        user.render(req, res, 'Preencha o campo email');
    } else if(!req.body.password) {
        user.render(req, res, 'Preencha o campo senha');
    } else {

        user.login(req.body.email, req.body.password).then(user => {

            req.session.user = user;

            res.redirect('/admin');

        }).catch(err => {
            user.render(req, res, err.message || err);
        });

    }

});

router.get("/login", function(req, res, next){

    user.render(req, res, null);

});
// --|

router.get("/emails", function(req, res, next){

    res.render('admin/emails', {
        
    });

});

router.get("/menus", function(req, res, next){

    res.render('admin/menus', {
        
    });

});

router.get("/reservations", function(req, res, next){

    res.render('admin/reservations', {
        date:{}
    });

});

router.get("/users", function(req, res, next){

    res.render('admin/users', {
        
    });

});

module.exports = router;