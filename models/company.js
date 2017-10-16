var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = mongoose.Schema({
    name: String,
    location: {
        address: String,
        state: String,
        country: String,
        zipcode: Number
    },
    turnover: Number
});

var Company = module.exports = mongoose.model('Company', CompanySchema, 'company');

module.exports.getCompanyName = function (callback) {
    Company.find(callback);
};

module.exports.createCompany = function (newCompany, callback) {
    newCompany.save(callback);
};

module.exports.getCompanyNamebyId = function (id, callback) {

    Company.findById(id, callback);
};
