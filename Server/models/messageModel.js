var mongoose = require('mongoose');
var messageSchema = mongoose.Schema({

    id: String,
    text: String,
    date: Date

})
var friendSchema = mongoose.Schema({
    id: String,
    message: [ messageSchema ]

})
var messageSchema = mongoose.Schema({
    // _id:{ type: Number, default: 1 },
    id: String,
    friend: [friendSchema]
});
module.exports = mongoose.model('message', messageSchema);