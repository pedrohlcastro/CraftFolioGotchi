const mongoose = require('mongoose');
require('mongoose-type-url');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    image: {
        type: mongoose.SchemaTypes.Url,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Image', imageSchema);
