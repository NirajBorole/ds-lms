const app = require('express').Router()
const checkAuth = require('../middleware/checkAuth')
const feedbackmodel = require('../Model/feedback')

app.post('/form', checkAuth, async (req, res) => {

    if(!req.body.quesone && !req.body.questwo && !req.body.questhre && !req.body.quesfour && !req.body.quesfive && !req.body.quessix) {
        res.status(400).json({message: "Please fill all the options!"});
    }

    const { quesone, questwo, questhre, quesfour, quesfive, quessix } = req.body;
    const newfeedback = await feedbackmodel.create({
        quesone, questwo, questhre, quesfour, quesfive, quessix
    })

    res.json(newfeedback)

// quesone, questwo, questhre, quesfour, quesfive, quessix

})

module.exports = {
    feedbackRoute: app,
};
