const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        // if user is not logged in
        return res.redirect('/auth/login');
    }
    next();
}


router.get('/', authCheck, (req, res) => {
    //res.send('you\'re logged in, this is your Profile - '+ req.user.username );
    res.render('profile', {user : req.user });
});

module.exports  = router;