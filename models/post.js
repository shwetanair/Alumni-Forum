var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = mongoose.Schema({
    title: String,
    description: String,
    filename: String,
    tags: [{type: Schema.ObjectId, ref: 'Tags'}],
    dateCreated: Date,
    lastModified: Date,
    versions: [String],
    upvotes: [{type: Schema.ObjectId, ref: 'User'}],
    downvotes: [{type: Schema.ObjectId, ref: 'User'}],
    comments: [{type: Schema.ObjectId, ref: 'Comment'}],
    user: {type: Schema.ObjectId, ref: 'User'},
    status: Boolean,
    preview: Number
});

var Post = module.exports = mongoose.model('Post', PostSchema);


module.exports.createPost = function (newPost, callback) {
    newPost.save(callback);
};


module.exports.updatePost = function (newPost, callback) {
    Post.findOneAndUpdate({'_id': newPost._id}, {
        $set: {
            'upvotes': newPost.upvotes,
            'downvotes': newPost.downvotes,
            'preview': newPost.preview
        }
    }, callback);
};

module.exports.getPostbyId = function (id, callback) {
    Post.findById(id).populate(
        'tags user'
    ).populate({
        path : 'comments',
        match : {status : true},
        populate : {path : 'user'}
    }).exec(callback);
};

module.exports.getPostByNewest = function (callback) {
    var query = {status: true};
    Post.find(query).sort({lastModified: 'descending'}).exec(callback);
};

module.exports.getPostWithTags = function (queryString, callback) {
    Post.find(queryString).sort({lastModified: 'descending'}).populate('tags').exec(callback);
};

module.exports.getPostByNoComment = function (callback) {
    var query = {status: true, comments: null};
    Post.find(query).sort({lastModified: 'descending'}).exec(callback);
};

module.exports.getPostByTags = function (tag, callback) {
    var query = {status: true, tags: tag};
    Post.find(query).sort({lastModified: 'descending'}).exec(callback);
};

module.exports.getPostWithTagsWithMostComments = function (queryString, callback) {
    Post.find(queryString).sort({comments: 'descending'}).populate('tags').limit(10).exec(callback);
};

module.exports.deletePost = function (id, callback) {
    var query = {status: false};
    Post.findOneAndUpdate({'_id': id}, {
        $set: query
    }, callback);
};

module.exports.editPosts = function (postid, editPost, callback) {
    Post.findOneAndUpdate({'_id': postid}, {
        $set: {
            'description': editPost.description,
            'versions': editPost.versions,
            'lastModified': editPost.lastModified
        }
    }, callback)
};

module.exports.updateImage = function (filename, postid, callback) {
    var query = {'_id': postid};
    Post.findOneAndUpdate(query, {$set: {filename: filename}}, callback)

};
