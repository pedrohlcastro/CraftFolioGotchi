const jwt = require('jsonwebtoken');
const { Strategy } = require('passport-http-bearer');

const User = require('../../database').models.User;

const jwtSecret = process.env.JWT_SECRET || 'super-craft';

const configBearerStrategy = (passport) => {
    // anyone can access
    passport.use('BasicBearer', new Strategy((token, done) => {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) { return done({ status: 401, msg: 'Unauthorized', err }); }
            return User.findById(decoded.id)
                .then((result) => {
                    const reqUser = {
                        id: result.id,
                    };
                    return done(null, reqUser);
                })
                .catch(er => done({ status: 401, msg: 'Unauthorized', er }));
        });
    }));
};

module.exports = configBearerStrategy;
