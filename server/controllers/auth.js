const jwt = require('jsonwebtoken');

const database = require('../database');

class AuthController {
    constructor() {
        this.models = database.models;
        this.jwtSecret = process.env.JWT_SECRET || 'super-craft';
    }


    createUser(user) {
        return new Promise((resolve, reject) => {
            // check if a password was provided
            if (user.password === undefined) {
                reject({ status: 409, msg: 'Cannot create that user', err: null });
            }
            // try find thats email in DB
            this.models.User.findOne({ email: user.email.toString() }, (err, data) => {
                if (data) {
                    reject({ status: 409, msg: 'Email already registered', err: null });
                } else {
                    const newUser = new this.models.User(user);
                    newUser.password = newUser.hashPsw(user.password);
                    // Save newUser in DB
                    newUser.save((er) => {
                        // erro in mongoose tests
                        if (er) {
                            reject({ status: 409, msg: 'Cannot create that user', err });
                        } else {
                            // No erros, Success
                            resolve();
                        }
                    });
                }
                // internal error on find query
                if (err) {
                    reject({ status: 500, msg: 'Cannot create that user', err });
                }
            });
        });
    }

    signInUser(err, user, info) {
        return new Promise((resolve, reject) => {
            if (err) {
                reject({ status: 500, msg: 'Internal Erro', err });
            }
            if (!user) {
                reject({ status: 401, msg: info.message, err: null });
            }
            const payload = {
                id: user.id,
            };
            const options = {
                expiresIn: '2 days',
            };
            let token = 'Bearer ';
            token += jwt.sign(payload, this.jwtSecret, options);
            resolve({ result: 'Success', token, userType: user.userType });
        });
    }

    checkToken(user) {
        return new Promise((resolve, reject) => {
            if (user) {
                const resJSON = {
                    result: 'Success',
                    userType: user.userType,
                };
                resolve(resJSON);
            }
            reject({ status: 401, msg: '', err: null });
        });
    }
}

module.exports = new AuthController();