const database = require('../database');

class LayoutController {
    constructor() {
        this.models = database.models;
    }

    // GET layout from User
    getLayout(userId) {
        return new Promise((resolve, reject) => {
            this.models.User.findById(userId).select({ background: 1, ground: 1, board: 1 })
                .exec((err, layout) => {
                    if (err) {
                        reject({ status: 500, msg: 'Cannot get Layoyt - Internal Error', err });
                    } else {
                        resolve(layout);
                    }
                });
        });
    }

    // UPDATE One layout based on userId
    editLayout(userId, newData) {
        const dataToUpdate = newData;
        dataToUpdate.name ? delete dataToUpdate.name : null;
        dataToUpdate.email ? delete dataToUpdate.email : null;
        dataToUpdate.password ? delete dataToUpdate.password : null;

        const options = { runValidators: true };
        return new Promise((resolve, reject) => {
            this.models.User.findOneAndUpdate({ _id: userId }, dataToUpdate, options)
                .exec((err, user) => {
                    if (err || !user) {
                        reject({ status: 500, msg: 'Cannot update Layout', err });
                    }
                    resolve({ backgroud: user.backgroud, ground: user.ground });
                });
        });
    }
}

module.exports = new LayoutController();
