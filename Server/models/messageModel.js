var mongoose = require('mongoose');
var messageSchema = mongoose.Schema({
    // _id:{ type: Number, default: 1 },
    id : String,
    friend : [
        {
            id : String,
            message : [
                {
                    id : String,
                    text : String,
                    date : Date
                }
            ]
        }
    ] 
});
module.exports = mongoose.model('message', messageSchema);