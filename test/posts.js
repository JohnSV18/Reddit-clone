const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe, it, after } =  require('mocha');

// Import the Post model from our models folder so we can use it in our tests
const Post = require("../models/post");
const app = require("../server");

const should = chai.should();

chai.use(chaiHttp);

describe('Posts', function () {
    const newPost = {
        title: 'post title',
        url: 'https://www.google.com',
        summary: 'post summary'
    };
    it('should create with valid attributes at POST /posts/new', function (done) {
        // TODO: test code goes here!
        Post.estimatedDocumentCount()
        .then(function (initialDocCount) {
          chai.request(app)
            .post('/posts/new')
            // This line fakes a form post,
            // since we're not actually filling out a form
            .set('content-type', 'application/x-www-form-urlencoded')
            // Make a request to create another
            .send(newPost)
            .then(function (res) {
              Post.estimatedDocumentCount()
                .then(function (newDocCount) {
                  // Check that the database has status 200
                  res.should.have.status(200);
                  // Check that the database has one more post in it
                  newDocCount.should.equal(initialDocCount + 1)
                  done();
                })
                .catch(function (err) {
                  done(err);
                });
            })
            .catch(function (err) {
              done(err);
            });
        })
        .catch(function (err) {
            done(err);
    });
    after(function () {
        Post.findOneAndDelete(newPost);
    });
  })
})