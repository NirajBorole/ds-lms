const app = require('express').Router()
const User = require('../Model/user')
const Course = require('../Model/course')

const checkAuth = require('../middleware/checkAuth')
const stripe = require('../utils/stripe')

app.get('/prices', checkAuth, async (req, res) => {
    const price = await stripe.prices.list({
        apiKey: process.env.STRIPE_SEC_KEY
    })
    return res.json(price)
})

app.post('/session', checkAuth, async (req, res) => {
    const user = await User.findOne({email:req.user})

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price: req.body.priceId,
                quantity: 1
            }
        ],
        success_url: 'http://localhost:3000/course',
        cancel_url: 'http://localhost:3000/plan',
        customer: user.stripeCustomerID
    },
    {
        apiKey: process.env.STRIPE_SEC_KEY
    })

    return res.json(session)
})

module.exports = {
    subRoute: app,
};
