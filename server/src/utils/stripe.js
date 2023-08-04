const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SEC_KEY, {
    apiVersion: '2020-08-27'
})

module.exports = stripe