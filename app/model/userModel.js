const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    // phone: {
    //     type: number
    // }
},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('UserSchema', UserSchema)
