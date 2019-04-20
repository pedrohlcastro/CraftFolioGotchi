const { Strategy } = require('passport-local');
const User = require('../../database').models.User;

const configPassportLocalStrategy = (passport) => {
    passport.use('local', new Strategy((username, password, done) => {
        User.findOne({ email: username }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, { message: 'User not found' });
            if (user.comparePsw(password, user.password)) return done(null, user);
            return done(null, false, { message: 'Password does not match' });
        });
    }));
};

module.exports = configPassportLocalStrategy;
