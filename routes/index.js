var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var reservation = require('./../inc/reservation');
var contacts = require('./../inc/contact');
var subscribe = require('./../inc/admin/email');
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


// contacts
router.get('/contacts', function(req, res, next) {

  contacts.render(req, res);

});

router.post('/contacts', function(req, res, next) {

  if (!req.body.name) {
    contacts.render(req, res, "Digite o nome");
  } else if (!req.body.email) {
    contacts.render(req, res, "Digite o e-mail");
  }else if (!req.body.message) {
    contacts.render(req, res, "Digite a messagem");
  } else {
    
    contacts.save(req.body).then(results => {
      req.body = {};
      contacts.render(req, res, null, "Contato enviado!");
    }).catch(err => {
      contacts.render(req, res, err.message);
    });

  }

});
// --|

// menus
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

// --|

// reservations
router.get('/reservations', function(req, res, next) {

  reservation.render(req, res);

});

router.post('/reservations', function(req, res, next) {

  if (!req.body.name) {
    reservation.render(req, res, "Digite o nome");
  } else if (!req.body.email) {
    reservation.render(req, res, "Digite o e-mail");
  }else if (!req.body.people) {
    reservation.render(req, res, "Digite o número de pessoas");
  }else if (!req.body.date) {
    reservation.render(req, res, "Digite a data");
  }else if (!req.body.time) {
    reservation.render(req, res, "Digite o horario");
  } else {
    
    reservation.save(req.body).then(results => {
      req.body = {};
      reservation.render(req, res, null, "Reserva realizada com sucesso!");
    }).catch(err => {
      reservation.render(req, res, err.message);
    });

  }

});
// --|

// services
router.get('/services', function(req, res, next) {

  res.render('services', {
    title: 'Serviços - TF Restaurant',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir',
    isHome: false
  });

});
// --|

// subscribe
router.post("/subscribe", function(req,res,next){

  if(!req.fields.email) {
    res.send({
      error: "Preencha o e-mail"
    });
  } else {
    subscribe.save(req.fields).then(results=> {

      res.send(results);

    }).catch(err => {
        res.send(err);
    });
  }

});
// ||--

module.exports = router;
