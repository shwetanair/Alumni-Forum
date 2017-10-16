var mongoose = require('mongoose');
var TagsSchema = require('../models/tags');
var Schema = mongoose.Schema;
// User Schema

var TagsSchema = mongoose.Schema({
    text: String,
    posts: [{type: Schema.ObjectId, ref: 'Post'}],
    comments: {type: [Schema.ObjectId], ref: 'Comment'},
    preview: Number
});

var Tags = module.exports = mongoose.model('Tags', TagsSchema);

module.exports.createTags = function (tag, callback) {
    tag.save(callback);
};

module.exports.getTagByText = function (text, callback) {
    var query = {text: text};
    Tags.find(query).exec(callback);
};

module.exports.updateTags = function (newTags, callback) {
    Tags.findOneAndUpdate({'_id': newTags._id}, {$set: {'posts': newTags.posts, 'preview': newTags.preview}}, callback);
};

module.exports.getPostWithTags = function (text, callback) {
    var query = {text: new RegExp(text)};
    //Tags.find(query).populate('posts').exec(callback);
    Tags.find(query).populate({
        path: 'posts',
        match: {status: true},
        populate: {path: 'tags'}
    }).exec(callback);
};

module.exports.getTagbyId = function (id, callback) {
    Tags.findById(id, callback);
};

module.exports.getTop7Tags = function (callback) {
    Tags.find().sort({preview: 'descending'}).limit(7).exec(callback);
};

