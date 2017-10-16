var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

// User Schema
var UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    workStatus: String,
    password: String,
    company: String,
    university: String,
    filename: String,
    status: Boolean,
    isAdmin: Boolean,
    posts: [{type: Schema.ObjectId, ref: 'Post'}],
    comments: {type: [Schema.ObjectId], ref: 'Comment'},
    favs: [{type: Schema.ObjectId, ref: 'Post'}]
});

var User = module.exports = mongoose.model('User', UserSchema);


module.exports.updateFav = function (newUser, callback) {
    User.findOneAndUpdate({'_id': newUser._id}, {$set: {'favs': newUser.favs}}, callback);
};

module.exports.removeFav = function (newUser, postid, callback) {
    User.update({'_id': newUser._id}, {
        $pull: {'favs': {$in: [postid]}}
    }, {multi: true}, callback);
};

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUsername = function (username, callback) {
    var query = {username: username, status: true};
    User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};

module.exports.getAllUsers = function (callback) {
    User.find({'status': true}).exec(callback);
};
module.exports.updateImage = function (filename, username, callback) {
    var query = {'username': username};
    User.findOneAndUpdate(query, {$set: {filename: filename}}, callback)

};

module.exports.deleteUser = function (id, callback) {
    User.findOneAndUpdate({'_id': id}, {
        $set: {status: false}
    }, callback);
};

module.exports.makeAdmin = function (id, callback) {
    User.findOneAndUpdate({'_id': id}, {
        $set: {isAdmin: true}
    }, callback);
};

module.exports.undoAdmin = function (id, callback) {
    User.findOneAndUpdate({'_id': id}, {
        $set: {isAdmin: false}
    }, callback);
};

module.exports.updatePosts = function (newUser, callback) {
    User.findOneAndUpdate({'_id': newUser._id}, {
        $set: {'posts': newUser.posts}
    }, callback)
};

