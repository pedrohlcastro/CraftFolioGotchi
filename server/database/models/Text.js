const mongoose = require('mongoose');
require('mongoose-type-url');

const Schema = mongoose.Schema;

const textSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    border: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    fontFamily: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Text', textSchema);
