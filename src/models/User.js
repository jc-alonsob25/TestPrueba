const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    keyUser: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    }
}, { timestamps: true });


userSchema.pre('save', function (next) {
    if (!this.userKey) {

        const formatName = this.name.toLowerCase().replace(/\s+/g, '');
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        this.keyUser = `${formatName}_${randomNumber}`;
    }
    next();
  });

module.exports = mongoose.model('User', userSchema);