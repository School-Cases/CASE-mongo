const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

// mall
const newsSchema = new Schema({
    title: {
        type: String,
        minlength: 1,
        maxlength: 50,
        required: true
    },
    text: {
        type: String
    },
    important: {
        type: Boolean,
        default: false
    },
    teamref: [{
        type: Types.ObjectId,
        ref: 'Team'
    }]
});

module.exports = mongoose.model('News', newsSchema);
