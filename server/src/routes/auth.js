const app = require('express').Router()
const { body,validationResult } = require('express-validator')
const User = require('../Model/user')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const checkAuth = require('../middleware/checkAuth')
const stripe = require('../utils/stripe')

// const feedbackmodel = require('../Model/feedback')

app.post('/signup', 
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

    const customer = await stripe.customers.create({
        email,
    },{
        apiKey: process.env.STRIPE_SEC_KEY
    })

    const newUser = await User.create({
        email,
        password: hashPass,
        stripeCustomerId: customer.id
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
                email: newUser.email,
                stripeCustomerId: customer.id
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

app.get('/me', checkAuth, async (req,res) => {
    
    const user = await User.findOne({email: req.user})

    return res.json({
        errors: [],
        data: {
            user: {
                id: user._id,
                email: user.email
            }
        }
    })
})

module.exports = {
    authRoute: app
};

