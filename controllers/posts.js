const Post = require('../models/post');
const User = require('../models/user')
const Comment = require('../models/comment')

module.exports = (app) => {
    app.get('/', async (req, res) => {
        try {
          const currentUser = req.user;
          console.log(req.cookies);
          const posts = await Post.find({}).lean().populate('author')
          return res.render('posts-index', { posts, currentUser });
        } catch (err) {
          console.log(err.message);
        }
        });

    app.get("/posts/new", function (req, res) {
      const currentUser = req.user;
      res.render("posts-new", { currentUser });
    });
    // CREATE
    app.post('/posts/new', (req, res) => {
      if (req.user) {
        // Instantiate instanc of post model
        const userId = req.user._id;
        const post = new Post(req.body);
        post.author = userId;
        // Save instance of post model to db and redirect to the root 
        post
          .save()
          .then(() => User.findById(userId))
          .then((user) => {
            user.posts.unshift(post);
            user.save();

            return res.redirect(`/posts/${post._id}`);
          })
            .catch((err) => {
              console.log(err.message);
            })
      } else {
        return res.status(401); // Unauthorized
      }
    });
    // SHOW POST
    app.get('/posts/:id', (req, res) => {
      const currentUser = req.user;
        Post
          .findById(req.params.id).lean().populate('comments').lean()
          .then((post) => res.render('posts-show', { post, currentUser }))
          .catch((err) => {
              console.log(err.message);
          });
    });
   // SUBREDDIT
    app.get('/n/:subreddit', async (req, res) => {
      try {
        const currentUser = req.user;
        const posts = await Post.find({ subreddit:req.params.subreddit }).lean()
        res.render('posts-index', { posts, currentUser });
      } catch (err) {
        console.log(err.message);
      }
      })
};