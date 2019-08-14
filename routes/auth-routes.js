const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res)=> {
    res.render('login', { user : req.user });
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope : ['profile']
}));

// auth logout
router.get('/logout', (req, res)=> {
    // handle with passport
    req.logOut();
    res.redirect('/');
});

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'),(req, res)=> {
    // handle with passport
    //res.send('You reached the callback URI');
    res.redirect('/profile/');
});


module.exports = router;