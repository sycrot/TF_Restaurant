var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results => {
    res.render('index', {
      title: 'TF Restaurant',
      menus: results,
      isHome: true
    })
  });
  
});

router.get('/contacts', function(req, res, next) {

  res.render('contact', {
    title: 'Contato - TF Restaurant',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga um oioio',
    isHome: false
  });

});

router.get('/menus', function(req, res, next) {

  menus.getMenus().then(results => {
    
    res.render('menu', {
      title: 'Menu - TF Restaurant',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results,
      isHome: false
    });
    
  })


});

router.get('/reservations', function(req, res, next) {

  res.render('reservation', {
    title: 'Reservas - TF Restaurant',
    background: 'images/img_bg_2.jpg',
    h1: 'Reserve uma mesa!',
    isHome: false
  });

});

router.get('/services', function(req, res, next) {

  res.render('services', {
    title: 'Serviços - TF Restaurant',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir',
    isHome: false
  });

});

module.exports = router;
