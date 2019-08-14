const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const { mongodb : { DB_HOST, DB_NAME, DB_PASS, DB_USER}, session : { cookieKey } } = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// creating cookie-session
app.use(cookieSession({
    maxAge : 1000 * 60 * 60 * 24,
    keys : [cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connecting to mongoATLAS
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser : true })
    .then(()=> {
        console.log('connected to mongoDB')
    })
    .catch(err => console.log )

// setting up view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', {user : req.user });
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

const port = process.env.PORT || 3300;
app.listen(port, ()=> {
    console.info(`app is listening on : ${port}`);
});

