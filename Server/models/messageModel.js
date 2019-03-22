var mongoose = require('mongoose');
var messageSchema = mongoose.Schema({
    // _id:{ type: Number, default: 1 },
    
});
module.exports = mongoose.model('message', messageSchema);