const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    quesone: {
        type: String,
        enum: ["1", "2", "3", "4", "5"],
        required: true
    },
    questwo: {
        type: String,
        enum: ["1", "2", "3", "4", "5"],
        required: true
    },
    questhre: {
        type: String,
        enum: ["1", "2", "3", "4", "5"],
        required: true
    },
    quesfour: {
        type: String,
        enum: ["1", "2", "3", "4", "5"],
        required: true
    },
    quesfive: {
        type: String,
        enum: ["1", "2", "3", "4", "5"],
        required: true
    },
    quessix: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("feedback", feedbackSchema)


// feedback questions:
// 
// Overall rating 
// enum 1 - 5
// course content
// enum 1 - 5
// course instructor
// enum 1 - 5
// user experiance 
// enum 1 - 5
// did you find content engaging
// enum 1 - 5
// form field
// test input