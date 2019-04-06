var mongoose = require('mongoose');
var friendSchema = mongoose.Schema({
    // _id:{ type: Number, default: 1 },
    id: String,
      friend: [{
            id: String,
            name: String,
            avatar: {
                imgSmall: String,
                imgBig: String
            },
            lastMessage: String,
            lastTime: Date
        }]        
    }
);
module.exports = mongoose.model('friend', friendSchema);