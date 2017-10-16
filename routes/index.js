var express = require('express');
var router = express.Router();

var Post = require('../models/post');
var Tags = require('../models/tags');

/* GET home page. */
router.get('/', function (req, res) {
    var query = {status: true};
    Post.getPostWithTags(query,function (err, posts) {
        if (err) throw err;
        Tags.getTop7Tags(function (err1,tags) {
            if(err1) throw err1;
            res.render("index", {posts: posts, reg_user: req.session.user, top_tags: tags});
        });
    });
});

module.exports = router;
