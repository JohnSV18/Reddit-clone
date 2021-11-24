const User = require('../models/user')
const jwt = require('jsonwebtoken')
module.exports = (app) => {
    app.get('/sign-up', (req, res) => {
        res.render('sign-up');
    })

    app.post('/sign-up', (req, res) => {
        const user = new User(req.body);

        user
            .save()
            .then((user) => {
                const token = jwt.sign({ _id: user._id }, proccess.env.SECRET, { expiresIn: '60 days' });
                res.cookie('nToken', token, { maxAge: 900000, httpOnly:true });
                return res.redirect('/')
            })
            .catch((err) => {
                console.log(err.message);
                return res.status(400).send({ err });
            })
    })
}