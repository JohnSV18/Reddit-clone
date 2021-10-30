const Post = require('../models/post');

module.exports = (app) => {
    // CREATE
    app.post('/posts/new', (req, res) => {
        // Instantiate instanc of post model
        const post = new Post(req.body);

        // Save instance of post model to db and redirect to the root 
        post.save(() => res.redirect('/'));
    });
  };