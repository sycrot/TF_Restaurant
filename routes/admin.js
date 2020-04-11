var express = require('express');
var user = require('./../inc/admin/users');
var admin = require('./../inc/admin/admin');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservation');
var moment = require("moment");
var router = express.Router();

moment.locale("pt-BR");

router.use(function(req, res, next) {

    if (['/login'].indexOf(req.url) === -1 && !req.session.user) {
        res.redirect("/admin/login");
    } else {
        next();
    } 

});

router.use(function(req, res, next){

    req.menus = admin.getMenus(req);

    next();

});

router.get('/logout', function(req, res, next){

    delete req.session.user;
    res.redirect('/admin/login');

});

router.get("/", function(req, res, next){

    admin.dashboard().then(data => {

        res.render("admin/index", admin.getParams(req, {
            data
        }));

    }).catch(err => {
        console.error(err);
    });


});

router.get("/contacts", function(req, res, next){

    res.render('admin/contacts', admin.getParams(req));

});

// login
router.post("/login", function(req, res, next){

    if (!req.body.email) {
        user.render(req, res, 'Preencha o campo email');
    } else if(!req.body.password) {
        user.render(req, res, 'Preencha o campo senha');
    } else {

        user.login(req.body.email, req.body.password).then(user => {

            req.session.user = user;

            res.redirect("/admin");

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

    res.render('admin/emails', admin.getParams(req));

});

// --menus
router.get("/menus", function(req, res, next){

    menus.getMenus().then(data => {

        res.render('admin/menus', admin.getParams(req, {
            data
        }));
    
    });

});

router.post("/menus", function(req, res, next) {

    menus.save(req.fields, req.files).then(results=> {
        res.send(results);
    }).catch(err=>{
        res.send(err);
    });

});

router.delete("/menus/:id", function(req, res, next) {

    menus.delete(req.params.id).then(results=>{

        res.send(results);

    }).catch(err=>{
        res.send(err);
    });

});
// --||

// reservas
router.get("/reservations", function(req, res, next){

    reservations.getReserv().then(data => {

        res.render('admin/reservations', admin.getParams(req, {
            date:{},
            data,
            moment
        }));

    });

});

router.post("/reservations", function(req, res, next) {

    reservations.save(req.fields, req.files).then(results=> {
        res.send(results);
    }).catch(err=>{
        res.send(err);
    });

});

router.delete("/reservations/:id", function(req, res, next) {

    reservations.delete(req.params.id).then(results=>{

        res.send(results);

    }).catch(err=>{
        res.send(err);
    });

});
// --||

// usuários
router.get("/users", function(req, res, next){

    user.getUsers().then(data => {
    
        res.render('admin/users', admin.getParams(req, {
            data
        }));

    });

});

router.post("/users", function(req, res, next){

    user.save(req.fields).then(results=> {

        res.send(results);

    }).catch(err => {
        res.send(err);
    });

});

router.delete("/users/:id", function(req, res, next){

    user.delete(req.params.id).then(results=> {

        res.send(results);

    }).catch(err => {
        res.send(err);
    });

});
// --||

module.exports = router;