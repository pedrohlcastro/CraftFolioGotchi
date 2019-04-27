const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const validateEmail = (email) => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexEmail.test(email);
};

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: { type: String, required: true },
    background: { type: Object, required: false },
    ground: { type: Object, required: false },
});


userSchema.methods.hashPsw = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

userSchema.methods.comparePsw = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = mongoose.model('User', userSchema);
