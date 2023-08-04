const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    imageurl: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    videourl: {
        type: String,
        required: true
    },
    access: {
        type: String,
        enum: ["Basic", "Standard", "Pro", "Expert"],
        required: true
    }
})

module.exports = mongoose.model("course", courseSchema)
