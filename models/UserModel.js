const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

// mall
const userSchema = new Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    team: [{
        type: Types.ObjectId,
        ref: 'Team'
    }],
    // admin: [{
    //     type: Types.ObjectId,
    //     ref: 'Team'
    // }]
});


// module.exports.Nyhet = Nyhet;
module.exports = mongoose.model('Users', userSchema);
