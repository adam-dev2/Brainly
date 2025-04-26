const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags:[{
        type: String,
    }],
    summary: {
        type: String,
    }
},{timestamps: true});

module.exports = mongoose.model('Card',cardSchema);