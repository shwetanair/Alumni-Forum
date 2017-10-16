var mongoose = require('mongoose');
var UserSchema = require('../models/user');
var Schema = mongoose.Schema;
// User Schema

var CommentSchema = mongoose.Schema({
    text: String,
    dateCreated: Date,
    lastModified: Date,
    versions: [String],
    upvotes: {type: [Schema.Types.ObjectId], ref: 'User'},
    downvotes: {type: [Schema.Types.ObjectId], ref: 'User'},
    comments: {type: [Schema.Types.ObjectId], ref: 'Comment'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    status: Boolean
});

var Comment = module.exports = mongoose.model('Comment', CommentSchema);

module.exports.createComment = function (comment, callback) {
    comment.save(callback);
};

module.exports.getCommentByID = function (id, callback) {
    var query = {status: true};
    Comment.findById(id, callback);
};

module.exports.deleteComment = function (id, callback) {
    Comment.findOneAndUpdate({'_id': id}, {
        $set: {status: false}
    }, callback);
};

