const Post = require('../models/post');

module.exports = (app) => {
    app.get('/', async (req, res) => {
        try {
          const currentUser = req.user;
          const posts = await Post.find({}).lean();
          return res.render('posts-index', { posts, currentUser });
        } catch (err) {
          console.log(err.message);
        }
        });

    app.get("/posts/new", function (req, res) {
        res.render("posts-new");
    });
    // CREATE
    app.post('/posts/new', (req, res) => {
      if (req.user) {
        // Instantiate instanc of post model
        const post = new Post(req.body);
        // Save instance of post model to db and redirect to the root 
        post.save(() => res.redirect('/'));
      } else {
        return res.status(401); // Unauthorized
      }
    });
    // SHOW POST
    app.get('/posts/:id', (req, res) => {
      const currentUser = req.user;

        Post
          .findById(req.params.id).lean().populate('comments')
          .then((post) => res.render('posts-show', { post, currentUser }))
          .catch((err) => {
              console.log(err.message);
          })
    })
   // SUBREDDIT
    app.get('/n/:subreddit', async (req, res) => {
      const currentUser = req.user;
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean()
      res.render('posts-index', { posts, currentUser });
      })
};