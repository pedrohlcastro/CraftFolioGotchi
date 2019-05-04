const passport = require('passport');
const { Router } = require('express');

const controllers = require('../controllers');

const router = new Router();


router.get('/name/:userId', (req, res, next) => {
    const userId = req.params.userId;
    controllers.Auth.getName(userId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/search', (req, res, next) => {
    const param = req.query.param;
    controllers.Auth.searchUsers(param)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
});

// SignUp route
router.post('/signup', (req, res, next) => {
    const user = req.body;
    controllers.Auth.createUser(user)
        .then(() => {
            res.status(201).json({ result: 'Success' });
        })
        .catch((err) => {
            next(err);
        });
});

// SignIn route
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => controllers.Auth.signInUser(err, user, info)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((er) => {
            next(er);
        }))(req, res, next);
});

// Check JWT in HEADERS: Authorization
router.get('/checktoken', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
    passport.authenticate('BasicBearer', { session: false }, (err, user) => controllers.Auth.checkToken(user)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((er) => {
            next(er);
        }))(req, res, next);
});

module.exports = router;
