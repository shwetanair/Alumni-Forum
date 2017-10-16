var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({storage: storage});

var User = require('../models/user');
var Post = require('../models/post');

router.post('/upload', upload.single('img_file'), function (req, res, next) {
    var myfile = req.file;
    User.updateImage(myfile.originalname, req.session.user.username, function (err, user) {
        req.session.user.filename = myfile.originalname;
        if (err) throw  err;
        else res.redirect('/profile');
    });
});

router.get('/allusers', function (req, res) {
    if (req.session && req.session.user) {
        User.getAllUsers(function (err, users) {
            if (err) throw err;
            res.render('profile-users', {
                layout: 'profile-layout',
                userlist: users,
                user: req.session.user,
                reg_user: req.session.user
            });
        });
    }
    else {
        res.redirect('/');
    }
});

router.get('/posts', function (req, res) {
    Post.getPostByNewest(function (err, posts) {
        if (err) throw err;
        res.render('profile-allposts', {
            layout: 'profile-layout',
            reg_user: req.session.user,
            allposts: posts
        });
    });
});

// Ajax call
router.get('/post/:postid', function (req, res) {
    Post.find({
        '_id': req.params.postid,
        'status': true
    }).populate({path: 'tags', select: 'text'}).exec(function (err, post) {
        if (err) throw err;
        res.send(post);
    });
});

router.get('/:username', function (req, res) {
    if (req.session && req.session.user) {
        User.findOne({username: req.params.username, 'status': true}).populate({
            path: 'posts favs',
            match: {status: true}
        }).exec(function (err, user) {
            res.render('profile-posts', {
                layout: 'profile-layout',
                user: user,
                reg_user: req.session.user
            });
        });
    }
    else {
        res.redirect('/');
    }
});

router.post('/delete', function (req, res) {

    User.deleteUser(req.body.user_id, function (err, user) {
        if (err) throw err;
        res.send(user);
    })
});

router.post('/delete-post', function (req, res) {
    Post.deletePost(req.body.post_id, function (err, post) {
        if (err) throw err;
        res.send(post);
    })
});

router.post('/make-admin', function (req, res) {

    User.makeAdmin(req.body.user_id, function (err, user) {
        if (err) throw err;
        res.send(user);
    })
});

router.post('/undo-admin', function (req, res) {

    User.undoAdmin(req.body.user_id, function (err, user) {
        if (err) throw err;
        res.send(user);
    })
});


router.get('/', function (req, res) {
    if (req.session && req.session.user) {

        User.findOne({
            _id: req.session.user._id,
            'status': true
        }).populate({
            path: 'posts favs',
            match: {status: true}
        }).sort({lastModified: 'descending'}).exec(function (err, user) {
            res.render('profile-posts', {
                layout: 'profile-layout',
                user: user,
                reg_user: req.session.user
            });
        });
    }
    else {
        res.redirect('/');
    }
});


module.exports = router;

