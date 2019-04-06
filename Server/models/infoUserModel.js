var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    // _id:{ type: Number, default: 1 },
    id : String,
    firstName : String,
    lastName: String,
    birthday: Date,
    gender : String
});
module.exports = mongoose.model('info_user', userSchema);