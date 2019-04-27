const database = require('../database');

class TextController {
    constructor() {
        this.models = database.models;
    }

    createText(newText, userId) {
        return new Promise((resolve, reject) => {
            const textData = newText;
            textData.user = userId;
            const text = new this.models.Text(textData);

            text.save((err) => {
                if (err) {
                    reject({ status: 409, msg: 'Cannot create that text', err });
                } else {
                    resolve(textData);
                }
            });
        });
    }

    getAllByUser(userId) {
        return new Promise((resolve, reject) => {
            this.models.Text.find({ user: userId })
                .exec((err, texts) => {
                    if (err) {
                        reject({ status: 500, msg: 'Cannot get Layoyt - Internal Error', err });
                    } else {
                        resolve(texts);
                    }
                });
        });
    }

    editText(textId, newData) {
        const options = { runValidators: true };
        return new Promise((resolve, reject) => {
            this.models.Text.findOneAndUpdate({ _id: textId }, newData, options)
                .exec((err, text) => {
                    if (err || !text) {
                        reject({ status: 500, msg: 'Cannot update Text', err });
                    }
                    resolve(text);
                });
        });
    }

    deleteText(textId) {
        return new Promise((resolve, reject) => {
            this.models.Text.findByIdAndDelete(textId)
                .exec((err) => {
                    if (err) {
                        reject({ status: 500, msg: 'Cannot delete Text', err });
                    }
                    resolve();
                });
        });
    }
}

module.exports = new TextController();
