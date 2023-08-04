const app = require('express').Router()
const User = require('../Model/user')
const checkAuth = require('../middleware/checkAuth')
const stripe = require('../utils/stripe')

app.get('/', checkAuth, async (req,res) => {
    const user = await User.findOne({ email: req.user });

    const subscription = await stripe.subscriptions.list(
        {
            customer: user.stripeCustomerID,
            status: "all",
            expand: ["data.default_payment_method"]
        },
        {
            apiKey: process.env.STRIPE_SEC_KEY
        }
    )
    if(!subscription.data.length) return res.json([])
    const plan = subscription.data[0].plan;

    if(plan == "Basic"){
        const courses = await Course.findOne({access: "Basic"})
        return res.json(courses)
    } else if (plan == "Standard") {
        const courses = await Course.findOne({access: ["Basic", "Standard"]})
        return res.json(courses)
    }else if (plan == "Pro") {
        const courses = await Course.findOne({access: ["Basic", "Standard", "Pro"]})
        return res.json(courses)
    }else if (plan == "Expert") {
        const courses = await Course.find({})
        return res.json(courses)
    }

})

module.exports = {
    courseRoute: app,
};
