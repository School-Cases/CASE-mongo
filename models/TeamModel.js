const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

// mall
const teamSchema = new Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 50,
        required: true
    },
    admin: {
        type: Types.ObjectId,
        ref: 'Users'
    },
    members: [{
        type: Types.ObjectId,
        ref: 'Users'
    }],
    news: [{
        title: String,
        text: String,
        important: Boolean
    }]
});

module.exports = mongoose.model('Team', teamSchema);
