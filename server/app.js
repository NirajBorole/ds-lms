const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const bodyParser = require("body-parser")
const cors = require('cors');

const { authRoute } = require('./src/routes/auth');
const { subRoute } = require('./src/routes/subs');
const { courseRoute } = require('./src/routes/course')
const { adminRoute } = require('./src/routes/admin')
const { feedbackRoute } = require('./src/routes/feedback')

dotenv.config()

mongoose.connect(process.env.MONGODB)
.then(() => {
    console.log('connected to mongodb')
    
    const app = express();
    app.use(express.json());
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/auth', authRoute)
    app.use('/subs', subRoute)
    app.use('/courses', courseRoute)
    app.use('/admin', adminRoute)
    app.use('/feedback', feedbackRoute)

    const port = process.env.PORT || 4400;

    app.listen(port, () => {
    console.log(`app running https://localhost:${port}`)
})
})
.catch((err) => {
    throw new Error(err)
})

