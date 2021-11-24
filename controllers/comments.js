module.exports = (app) => {
    const Comment = require('../models/comment');
    const Post = require('../models/post')
    // CREATE COMMENT
    app.post("/posts/:postId/comments", (req, res) => {
        const comment = new Comment(req.body);

        comment
            .save()
            .then(() => Post.findById(req.params.postId))
            .then((post) => {
                post.comments.unshift(comment);
                return post.save();
            })
            .then(() => res.redirect('/'))
            .catch((err) => {
                console.log(err);
        })
    })

};