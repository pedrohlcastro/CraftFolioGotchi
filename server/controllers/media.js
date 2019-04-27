const database = require('../database');

class MediaController {
    constructor() {
        this.models = database.models;
    }

    createMedia(newMedia, userId) {
        return new Promise((resolve, reject) => {
            const mediaData = newMedia;
            mediaData.user = userId;
            const media = new this.models.Media(mediaData);

            media.save((err) => {
                if (err) {
                    reject({ status: 409, msg: 'Cannot create that media', err });
                } else {
                    resolve(mediaData);
                }
            });
        });
    }

    getAllByUser(userId) {
        return new Promise((resolve, reject) => {
            this.models.Media.find({ user: userId })
                .exec((err, medias) => {
                    if (err) {
                        reject({ status: 500, msg: 'Cannot get Medias - Internal Error', err });
                    } else {
                        resolve(medias);
                    }
                });
        });
    }

    editMedia(mediaId, newData) {
        const options = { runValidators: true };
        return new Promise((resolve, reject) => {
            this.models.Media.findOneAndUpdate({ _id: mediaId }, newData, options)
                .exec((err, media) => {
                    if (err || !media) {
                        reject({ status: 500, msg: 'Cannot update Media', err });
                    }
                    resolve(media);
                });
        });
    }

    deleteMedia(mediaId) {
        return new Promise((resolve, reject) => {
            this.models.Media.findByIdAndDelete(mediaId)
                .exec((err) => {
                    if (err) {
                        reject({ status: 500, msg: 'Cannot delete Media', err });
                    }
                    resolve();
                });
        });
    }
}

module.exports = new MediaController();
