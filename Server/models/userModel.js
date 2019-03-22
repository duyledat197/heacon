var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    // _id:{ type: Number, default: 1 },
    idUser : String,
    userName : String,
	password: String,
});
module.exports = mongoose.model('user', userSchema);