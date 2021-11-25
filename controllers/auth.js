const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = (app) => {
    app.get('/sign-up', (req, res) => {
        res.render('sign-up');
    })

    app.post('/sign-up', (req, res) => {
        const user = new User(req.body);
        user
          .save()
          .then((user) => {
              const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
              res.cookie('nToken', token, { maxAge: 900000, httpOnly:true });
              return res.redirect('/')
        })
          .catch((err) => {
              console.log(err.message);
              return res.status(400).send({ err });
          })
    });
    app.get('/login', (req, res) => res.render('login'));

    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        //find this username
        User.findOne({ username }, 'username password')
          .then((user) => {
              if (!user) {
                  //User not found
                  return res.status(401).send({ message: "Wrong Username or Password" });
              }
              //check the password
              user.comparePassword(password, (err, isMatch) => {
                  if (!isMatch) {
                      //passwrord does not match
                      return res.status(401).send({ message: 'Wrong Username or password' });
                  }
                  //create a token
              const token = jwt.sign({ _id: user._id , username: user.username }, process.env.SECRET, {
                  expiresIn: '60 days',
              });
              //Set a cookie and redirect to root
              res.cookie('nToken', token, { maxAge: 900000, httpOnly: true })
              return res.redirect('/')
              })
          })
            .catch((err) => {
                console.log(err);
        });
    });

    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        return res.redirect('/');
    });
}