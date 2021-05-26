const router = require('express').Router();
const passport = require('passport');
const Request = require('request');


router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
})); 

router.get('/signin', (req, res, next) => {
  res.render('signin');
});




router.post('/signin', (req, res, next) => {
  Request.post({
    "headers": { "content-type": "application/json" },
    "url": "http://157.245.132.117:1337/auth/local",
    "body": JSON.stringify({
        "identifier": req.body.email,
        "password": req.body.password
    })
  }, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    let array = JSON.parse(body);
    if(array.includes(400)){
      console.log(array);
    }
    
  });
});


router.use((req, res, next) => {
    isAuthenticated(req,res,next);
    next();
  });

router.get('/profile', (req, res, next) => {
  res.render('profile');
});

router.get('/dashboard', (req, res, next) => {
    res.send('dashboard');
  });

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}

module.exports = router;