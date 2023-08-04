const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    stripeCustomerID: {
        type: String
    }
})

module.exports = mongoose.model("dUsers", userSchema)
