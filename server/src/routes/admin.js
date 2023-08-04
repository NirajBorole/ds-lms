const app = require('express').Router()
const { body,validationResult } = require('express-validator')
const User = require('../Model/Admin')
const course = require('../Model/course')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const checkAuth = require('../middleware/checkAuth')

app.post('/register', 
    body("email").isEmail().withMessage("email is invalid"), 
    body("password").isLength({ min: 8 }).withMessage("password is invalid"), 
    async (req,res) => {

    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array().map((error) => {
            return {
                msg: error.msg
            };
        });

        return res.json({errors, data: null})
    }
    const { email,password } = req.body;

    const user = await User.findOne({email})

    if(user) {
        return res.json({
            errors: [
                {
                    msg: "Emil already exist"
                },
            ],
            data: null
        })
    }

    const hashPass = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        email,
        password: hashPass
    })

    const token = await JWT.sign(
        { email:newUser.email },
        process.env.JWT_SEC,
        { expiresIn: 36000 }
    )

    res.json({
        errors: [],
        data: {
            token,
            user: {
                id: newUser._id,
                email: newUser.email
            }
        }
    })
})

app.post('/login', async (req,res) => {
    const { email,password } = req.body;

    const user = await User.findOne({email})

    if(!user) {
        return res.json({
            errors: {
                msg: "Invalid cridentials"
            },
            data: null
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.json({
            errors: {
                msg: "Invalid cridentials"
            },
            data: null
        })
    }

    const token = await JWT.sign(
        { email:user.email },
        process.env.JWT_SEC,
        { expiresIn: 36000 }
    )

    return res.json({
        errors: [],
        data: {
            token,
            user: {
                id: user._id,
                email: user.email,
                stripeCustomerId: user.stripeCustomerId
            }
        }
    })
})

app.post('/createcourse', checkAuth, async (req, res) => {

    if(!req.body.title && !req.body.imgurl && !req.body.content && !req.body.videourl && !req.body.access) {
        res.status(400).send({message: "please fill all form fields!"})
    }
    
    const { title, imageurl, content, videourl, access } = req.body;
    const newCourse = await course.create({
        title,
        imageurl,
        content,
        videourl,
        access
    })
    
    res.json(newCourse)
})

app.get('/courses', checkAuth, async (req, res) => {
    try {
        const courses = await course.find({});
        res.status(200).json(courses)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

app.post('/updatecourse', checkAuth, async (req, res) => {
    res.send("update course")
})

module.exports = {
    adminRoute: app,
};
