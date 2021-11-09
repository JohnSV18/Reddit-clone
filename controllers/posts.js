const Post = require('../models/post');

module.exports = (app) => {
    app.get('/', async (req, res) => {
        try {
          const posts = await Post.find({}).lean();
          return res.render('posts-index', { posts });
        } catch (err) {
          console.log(err.message);
        }
        });
    // CREATE
    app.post('/posts/new', (req, res) => {
        // Instantiate instanc of post model
        const post = new Post(req.body);

        // Save instance of post model to db and redirect to the root 
        post.save(() => res.redirect('/'));
    });
    // SHOW POST
    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id).lean()
          .then((post) => res.render('posts-show', { post }))
          .catch((err) => {
              console.log(err.message);
          })
    })
  };