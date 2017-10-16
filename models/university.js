var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UniversitySchema = mongoose.Schema({
    name: String,
    location: {
        address: String,
        state: String,
        country: String,
        zipcode: Number
    },
    intake: Number
});

var University = module.exports = mongoose.model('University', UniversitySchema, 'university');

module.exports.getUniversityName = function (callback) {
    University.find(callback);
};

module.exports.createUniversity = function (newUniversity, callback) {
    newUniversity.save(callback);
};

module.exports.getUniversityNamebyId = function (id, callback) {
    Company.findById(id, callback);
};

