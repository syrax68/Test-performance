var mongoose = require('mongoose');

var webcastSchema = mongoose.Schema({
    name: {type: String, required: true },
    url: {type: String, required: true },
    nb_visitteur: {type: Number, required: false},
    created_at: { type: Date, default: Date.now}
})

var Webcast = module.exports = mongoose.model('webcast', webcastSchema);

module.exports.get = function(callback, limit){
    Webcast.find(callback).limit(limit);
}