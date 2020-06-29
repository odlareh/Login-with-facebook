const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const FacebookStrategy = require('passport-facebook').Strategy;
const path = require('path');
const service = require('./service_provider');

const app = express();

// configuration
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cookieSession({ name: 'session', keys: ['key1', 'key2'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());

// routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: req.user});
})

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

passport.use(new FacebookStrategy({
    clientID: service.facebook.clientID,
    clientSecret: service.facebook.clientSecret,
    callbackURL: 'http://localhost:8000/auth/facebook/callback',
    profileFields : ['id', 'displayName', 'photos']
}, (accessToken, refreshToken, profile, done) => {
    var user = {
        accessToken,
        provider_id: profile.id,
        provider: profile.provider,
        name: profile.displayName,
        photo: profile.photos[0].value
    }

    done(null, user);
}))

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', {
        successRedirect: '/dashboard', 
        failureRedirect: '/'
    }),
);

app.listen(app.get('port'), function(){
    console.log('Web server running on port ' + app.get('port'));
});
