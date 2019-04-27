const passport = require('passport');
const { Router } = require('express');

const controllers = require('../controllers');

const router = new Router();

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId)
    controllers.Layout.getLayout(userId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
});

router.put('/:userId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
    const userId = req.params.userId;
    const updateData = req.body;
    controllers.Layout.editLayout(userId, updateData)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
